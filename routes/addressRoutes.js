const express = require("express");
const { createAddress,getAllAddress, } = require("../controllers/addressController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/createAddress").post(isAuthenticatedUser,createAddress);
router.route("/getAllAddress").get(isAuthenticatedUser,getAllAddress);
module.exports = router;
