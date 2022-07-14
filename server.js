const app = require('./app')
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const PORT = process.env.PORT||3001


dotenv.config({path:"config/config.env"})

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

  // Connecting to database
connectDatabase();

if(process.env.NODE_ENV=="production"){
  app.use(express.static('web3-assignnment/build'))
  const path = require('path')
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'web3-assignnment','build','index.html'))
  })
}


app.listen(PORT,()=>{
    console.log(`listening on port:${PORT}`);
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });


