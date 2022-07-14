const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors")

const errorMiddleware = require("./middleware/error");
const auth = require("./middleware/auth")
// Config

  require("dotenv").config({ path: "/config/config.env" });


app.use( cors(),express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports

const user = require("./routes/userRoute");
const post = require("./routes/postroutes")
const address = require("./routes/addressRoutes")

 app.use("/api/v1", user);
 app.use("/api/v2", post);
 app.use("/api/v3", address);




// Middleware for Errors
app.use(errorMiddleware);



module.exports = app;
