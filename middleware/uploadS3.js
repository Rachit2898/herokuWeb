const aws = require("aws-sdk");
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
require("dotenv").config({ path: require("../config/config.env") });

const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: "AKIA5EWYI4H3P237K6FV",
  secretAccessKey: "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",
  region: "ap-south-1",
});

exports.uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: "profile-picture-web3",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, "files_from_node/" + Date.now().toString() + file.originalname);
    },
  }),
});
