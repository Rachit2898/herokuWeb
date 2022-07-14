const express = require("express");
const User = require("../models/userModel");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  getUserDetails,


  uploadImage,
} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/updatePassword").post(updatePassword);
router.route("/updateProfile").post(isAuthenticatedUser, updateProfile);
router.route("/getAddress").get(getUserDetails);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);
router.post("/upload", isAuthenticatedUser,uploadImage.array("file", 1), async (req, res) => {
  if (!req.files) res.status(400).json({ error: "No files were uploaded." });
  

  return res.status(201).json({
    message: "Successfully uploaded " + req.files.length + " files!",

    path: req.files[0].location,
    successCode:200
   
  });
  
  
});

// const uploadProgress = async(req, res) => {
//   let user = await User.findOne({ userId: req.user._id });

//   if (!user) {
//     throw error;
//   }
//   let updateObj = {
//     ...user._doc,
//     modifiedOn: new Date().getTime(),
//   };
//   updateObj["profilePic"] = req.profilePic;
//   return User.findOneAndUpdate(
//     {
//       userId: req.user._id,
//     },
//     {
//       $set: { ...updateObj },
//     },
//     { new: true }
//   );
// }

module.exports = router;
