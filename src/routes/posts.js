const { Router } = require("express");
const controller = require("../controllers/postsController");
const router = Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { verifyPerson } = require("../config/verifyToken");

router.get("/", controller.allPosts);
router.post("/", upload.single("image"), controller.createPost);

router.get("/:postId", controller.getPost);

router.post("/:postId/comments", verifyPerson, controller.createComment);

module.exports = router;
