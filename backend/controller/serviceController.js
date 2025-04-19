const Service = require('../models/Service');

exports.getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

exports.createService = async (req, res) => {
  const { title, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const newService = new Service({ title, description, imageUrl });
  await newService.save();
  res.status(201).json(newService);
};

exports.updateService = async (req, res) => {
  const { title, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

  const updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    { title, description, imageUrl },
    { new: true }
  );
  res.json(updatedService);
};

exports.deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: 'Service deleted' });
};