const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncerror");

const Address = require("../models/addressModel");

exports.getAllAddress = catchAsyncErrors(async (req, res, next) => {
  const response = await Address.find()
    .populate("createdBy", "_id name coinName")
    .sort("-createdAt");
   
  if (!response) {
    return next(new ErrorHander("Addresses are not available", 404));
  }

  res.status(200).json({
    success: true,
    successCode: 200,
    response,
  });
});

exports.createAddress = catchAsyncErrors(async (req, res, next) => {
  const { metaMaskAddress } = req.body;
  if (!metaMaskAddress) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }
  if (req.body.metaMaskAddress.slice(0, 2) == "0x") {
    coinName = "ETH";
  } else {
    coinName = "RCM";
  }

  const address = new Address({
    metaMaskAddress,
    coinName,
    createdBy: req.user,
  });
  const response = await address.save();

  res.status(200).json({
    success: true,
    successCode: 200,
    response,
  });
});
