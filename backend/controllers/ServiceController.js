require("events").EventEmitter.defaultMaxListeners = 15;

const Service = require("../models/Service");
const { cloudinary } = require("../config/cloudinary");
const fs = require("fs");

const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error("Error getting services:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const createService = async (req, res) => {
  
  try {
    let imageUrl = null;

    if (req.file) {
      // Convert buffer to base64
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "services",
        resource_type: "auto",
      });

      imageUrl = result.secure_url;
      const details = JSON.parse(req.body.details);

      // Create and save the service
      const service = new Service({
        title: req.body.title,
        description: req.body.description,
        details: details,
        imageUrl: imageUrl,
      });

      await service.save();
      return res.status(201).json(service);
    } else {
      return res.status(400).json({ error: "No image file uploaded" });
    }
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(400).json({ error: "Failed to create service." });
  }
  
};

const updateService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Update text fields
    service.title = title || service.title;
    service.description = description || service.description;

    if (req.file) {
      // Delete old image if it exists
      if (service.imageUrl && service.imageUrl.includes("res.cloudinary.com")) {
        const publicId = service.imageUrl.split("/").slice(-2).join("/").split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      if (req.file.size > 5* 1024 * 1024) {
        return res
          .status(400)
          .json({ message: "File too large. Maximum allowed size is 5MB." });
      }

      // Convert file buffer to base64
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "services",
        resource_type: "auto",
      });

      service.imageUrl = result.secure_url;
    }

    await service.save();
    res.json(service);
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getSingleService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    // If the service has an image, delete it from Cloudinary
    if (service.imageUrl) {
      try {
        const publicId = service.imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Error deleting image:", error);
        // Continue with the deletion even if image deletion fails
      }
    }

    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getServices,
  createService,
  getSingleService,
  updateService,
  deleteService,
};
