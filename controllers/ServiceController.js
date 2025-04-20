require("events").EventEmitter.defaultMaxListeners = 15;

const Service = require("../models/Service");
const cloudinary = require("cloudinary").v2;

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
    const service = new Service({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.file ? req.file.path : null,
      price: req.body.price,
    });

    await service.save();
    res.status(201).json(service);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(400).json({ error: "Failed to create service." });
  }
};

const updateService = async (req, res) => {
  try {
    const { title, description, price, imageUrl: oldImageUrl } = req.body;
    const imageUrl = req.file ? req.file.path : oldImageUrl;

    // If there's a new image and an old image exists, delete the old image from Cloudinary
    if (req.file && oldImageUrl) {
      const publicId = oldImageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, price, imageUrl },
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

const deleteService = async (req, res) => {
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

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService,
};
