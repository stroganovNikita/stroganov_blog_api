const db = require("../db/queries");
const supabase = require("../config/supabase");

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
    await db.createPostDB(title, text, image);
  } catch (err) {
    res.json({
      title: "Create post",
      errors: { msg: "Error during create post" },
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
    res.status(400).json({
      title: "Get post",
      errors: { msg: "Error during get post" },
    });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const nickname = req.auth.user.nickname;
    await db.createCommentDB(text, nickname, Number(postId), new Date());
    return res.json({
      title: "Create comment",
      data: "Success create comment",
    });
  } catch (err) {
    res.status(400).json({
      title: "Create comment",
      errors: [{ msg: "Error during create comment" }],
    });
  }
};
