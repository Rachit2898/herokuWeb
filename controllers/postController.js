const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncerror");

const Post = require("../models/postModel");
const { isAuthenticatedUser } = require("../middleware/auth");
const { OwnershipControlsRule } = require("@aws-sdk/client-s3");

exports.getAllPost = catchAsyncErrors(async (req, res, next) => {
  const response = await Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt");
  if (!response) {
    return next(new ErrorHander("Posts are not available", 404));
  }

  res.status(200).json({
    success: true,
    successCode: 200,
    response,
  });
});

exports.getPost = catchAsyncErrors(async (req, res, next) => {
  const response = await Post.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt");
  if (!response.response) {
    return next(new ErrorHander("Posts are not available", 404));
  }

  res.status(200).json({
    success: true,
    successCode: 200,
    response,
  });
});

exports.createPost = catchAsyncErrors(async (req, res, next) => {
  const { body } = req.body;
  if (!body) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }

  const post = new Post({
    body,
    postedBy: req.user,
  });
  const response = await post.save();

  res.status(200).json({
    success: true,
    successCode: 200,
    response,
  });
});

exports.myPost = catchAsyncErrors(async (req, res, next) => {
  const response = await Post.find({ postedBy: req.user._id }).populate(
    "postedBy",
    "_id name"
  );
  if (!response.response) {
    return next(new ErrorHander("Posts are not available", 404));
  }

  res.status(200).json({
    success: true,
    successCode: 200,
    response,
  });
});

exports.like = catchAsyncErrors(async (req, res, next) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.status(200).json({
        success: true,
        successCode: 200,
        result,
      });
    }
  });
});

exports.unLike = catchAsyncErrors(async (req, res, next) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.status(200).json({
        success: true,
        successCode: 200,
        result,
      });
    }
  });
});

exports.comment = catchAsyncErrors(async (req, res, next) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.status(200).json({
          success: true,
          successCode: 200,
          result,
        });
      }
    });
});

exports.deletePost = catchAsyncErrors(async (req, res, next) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});
