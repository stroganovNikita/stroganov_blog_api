const { Router } = require("express");
const controller = require("../controllers/postsController");
const router = Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { verifyPerson, middlewareAdmin } = require("../config/verifyToken");

router.get("/", controller.allPosts);
router.post("/", middlewareAdmin, upload.single("file"), controller.createPost);

router.get("/:postId", controller.getPost);
router.delete('/:postId',middlewareAdmin, controller.deletePost);
router.put('/:postId', middlewareAdmin, controller.updatePost);

router.post("/:postId/comments", verifyPerson, controller.createComment);
router.delete('/:postId/comments/:commentId', middlewareAdmin, controller.deleteComment);


module.exports = router;
