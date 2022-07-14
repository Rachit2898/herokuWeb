const express = require("express");
const { createPost,getAllPost,myPost,like,unLike,comment,deletePost } = require("../controllers/postController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/createPost").post(isAuthenticatedUser,createPost);
router.route("/getAllPost").get(isAuthenticatedUser,getAllPost);
router.route("/myPost").get(isAuthenticatedUser,myPost);
router.route("/like").put(isAuthenticatedUser,like);
router.route("/unLike").put(isAuthenticatedUser,unLike);
router.route("/comment").put(isAuthenticatedUser,comment);
router.route("/deletePost/:postId").delete(isAuthenticatedUser,deletePost);
module.exports = router;
