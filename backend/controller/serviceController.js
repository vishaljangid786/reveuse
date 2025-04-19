const Service = require("../models/Service");
const cloudinary = require("cloudinary").v2;

exports.getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

exports.createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const newService = new Service({ title, description, imageUrl });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(400).json({ error: "Failed to create service." });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { title, description, imageUrl: oldImageUrl } = req.body;
    const imageUrl = req.file ? req.file.path : oldImageUrl;

    // If there's a new image and an old image exists, delete the old image from Cloudinary
    if (req.file && oldImageUrl) {
      const publicId = oldImageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(updatedService);
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    // If the service has an image, delete it from Cloudinary
    if (service.imageUrl) {
      const publicId = service.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Server error" });
  }
};
