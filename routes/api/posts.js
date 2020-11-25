const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   GET api/posts/:post_id
// @desc    Get post by ID
// @access  Private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }
    res.json(post);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found." });
    } else {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      // Build post object
      const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      });

      const post = await newPost.save();
      return res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route   PUT api/posts/like/:post_id
// @desc    Like post by ID
// @access  Private
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }

    // Check if post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked." });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found." });
    } else {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
});

// @route   PUT api/posts/unlike/:post_id
// @desc    Unlike post by ID
// @access  Private
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }

    // Check if post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked." });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString() === req.user.id)
      .indexOf(req.params.edu_id);

    // Remove item from array of likes by remove index
    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found." });
    } else {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
});

// @route   POST api/posts/comment/:post_id
// @desc    Add comment
// @access  Private
router.post(
  "/comment/:post_id",
  [auth, [check("text", "Text is required.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.post_id);

      // Build comment object
      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route   POST api/posts/comment/:post_id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Make sure post exists
    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found." });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized." });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   DELETE api/posts/:post_id
// @desc    Delete post by ID
// @access  Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }

    // Check on user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized." });
    }

    await post.remove();
    res.json({ msg: "Post deleted." });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found." });
    } else {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
});

module.exports = router;
