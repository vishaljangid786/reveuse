const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require("../controller/serviceController");

const upload = multer({ dest: "uploads/" });

router.get("/", getServices);
router.post("/", upload.single("image"), createService);
router.put("/:id", upload.single("image"), updateService);
router.delete("/:id", deleteService);

module.exports = router;
