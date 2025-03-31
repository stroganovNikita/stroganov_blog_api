const db = require("../db/queries");
const supabase = require("../config/supabase");
require("dotenv").config();
const { validationResult } = require("express-validator");
const { commentValidator } = require("./postsValidator");

exports.allPosts = async (req, res) => {
  try {
    const posts = await db.getAllPostsDB();
    return res.json({
      title: "posts",
      posts: posts,
    });
  } catch (err) {
    res.json({
      title: "Get posts",
      errors: { msg: "Error during get posts" },
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    req.file.originalname = Buffer.from(
      req.file.originalname,
      "latin1"
    ).toString("utf8");
    const image = await supabase.supabaseReturnImgUrl(req.file);
    const { title, text } = req.body;
    await db.createPostDB(title, text, image.publicUrl);
    return res.json({
      title: "Create post",
      data: "Success create post",
    });
  } catch (err) {
    return res.status(404).json({
      title: "Create post",
      errors: [{ msg: "Error during create post" }],
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { image, title, text, published } = req.body;
    const { postId } = req.params;
    console.log(postId, image, title, text, published);
    await db.updatePostDB(
      Number(postId),
      image,
      title,
      text,
      Boolean(published)
    );
    return res.json({
      title: "Update post",
      data: "Success update post",
    });
  } catch (err) {
    return res.status(404).json({
      title: "Update post",
      errors: [{ msg: "Error during update post" }],
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await db.getPostDB(id);
    return res.json({
      title: "Get post",
      data: post,
    });
  } catch (err) {
    return res.status(400).json({
      title: "Get post",
      errors: [{ msg: "Error during get post" }],
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await db.deletePostDB(Number(postId));
    return res.json({
      title: "Delete post",
      data: "Success delete post",
    });
  } catch (err) {
    return res.status(400).json({
      title: "Delete post",
      errors: [{ msg: "Error during delete post" }],
    });
  }
};

exports.createComment = [
  commentValidator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          title: "Create comment",
          errors: errors.array(),
        });
      }
      const { comment } = req.body;
      const { postId } = req.params;
      const nickname = req.auth.user.nickname;
      await db.createCommentDB(comment, nickname, Number(postId), new Date());

      return res.json({
        title: "Create comment",
        data: "Success create comment",
      });
    } catch (err) {
      return res.status(400).json({
        title: "Create comment",
        errors: [{ msg: "Error during create comment" }],
      });
    }
  },
];

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await db.deleteCommentDB(Number(commentId));
    return res.json({
      title: 'Delete comment',
      data: 'Success delete comment'
    })
  } catch (err) {
    return res.status(400).json({
      title: "Delete comment",
      errors: [{ msg: "Error during delete post" }],
    });
  }
};
