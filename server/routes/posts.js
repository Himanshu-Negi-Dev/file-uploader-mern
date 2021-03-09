const express = require("express");
const router = express.Router();
const Post = require("../models/posts");

//get post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server error" });
  }
});

//add post

router.post("/", async (req, res) => {
  console.log("Request Object******************************8: ", req.files);
  const file = req.files.image;
  console.log("Dirname ****************", __dirname);
  file.mv(`${__dirname}/../../client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
  try {
    const newPost = new Post({
      name: req.body.name,
      image: req.body.imageName,
    });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server error" });
  }
});

//update post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server error" });
  }
});

//delete post

router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndRemove({ _id: req.params.id });

    res.status(200).json({ msg: "post removed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
