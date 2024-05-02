const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.getdata = async (req, res) => {
  try {
    const posts = await Post.find();
    // console.log(posts);

    res.status(200).json({
      message: "Fetched post",
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation field entered data is incorrect.");
      error.statusCode = 422;
      // throw error;
      console.log(error);
    }
    const pk = await req.body;
    console.log(pk);

    const title = req.body.title;
    const image = req.body.image;
    const slug = req.body.slug;
    const summary = req.body.summary;
    const instructions = req.body.instructions;
    const creator = req.body.creator;
    const creator_email = req.body.creator_email;

    const post = new Post({
      title,
      slug,
      image,
      summary,
      instructions,
      creator,
      creator_email,
    });

    await post.save();

    res.status(201).json({
      message: "Post Created",
      post: post,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getPost = async (req, res) => {
  console.log("h");
  try {
    const postId = req.params.postId;
    console.log(postId);
    // const doc = await Post.findById(postId);
    const doc = await Post.find({ slug: postId });
    console.log(doc);
    // if (!doc) {
    //   const error = new Error("Could not find post");
    //   error.statusCode = 404;
    //   throw error;
    // }
    res.status(200).json({ message: "Post fetched", meal: doc });
  } catch (error) {
    console.log(error);
    // if (!error.statusCode) {
    //   error.statusCode = 500;
    // }
    // next(error);
  }
};
