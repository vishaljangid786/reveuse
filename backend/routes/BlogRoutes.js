const express = require("express");
const router = express.Router();
const multer = require("multer");
const blogController = require("../controllers/BlogController");

// Use memory storage instead of disk storage
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getBlog);
router.post("/", upload.single("image"), blogController.createBlog);
router.put("/:id", upload.single("image"), blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);
router.put("/:id/like", blogController.likeBlog);
router.put("/:id/unlike", blogController.unlikeBlog);
router.put("/:id/view", blogController.addviews);
router.post("/:id/comments", upload.single("image"), blogController.addComment);

module.exports = router;
