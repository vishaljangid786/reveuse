// serviceRoutes.js
const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const {
  getServices,
  createService,
  updateService,
  deleteService,
  getSingleService,
} = require("../controllers/ServiceController");

router.get("/", getServices);
router.post("/", upload.single("image"), createService);
router.put("/:id", upload.single("image"), updateService);
router.get("/:id", getSingleService);
router.delete("/:id", deleteService);

module.exports = router;
