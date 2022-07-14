const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {ObjectId} = mongoose.Schema.Types
const crypto = require("crypto");

const addressSchema = new mongoose.Schema({
  metaMaskAddress: {
    type: String,
    default: "",
  },
  coinName: {
    type: String,
    default: "",
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});


module.exports = mongoose.model("Address", addressSchema);
