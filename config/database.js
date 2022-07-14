// const mongoose = require('mongoose')

// const connectDatabase =()=>{
// mongoose.connect("mongodb://localhost:27017/webThree",{
// useUnifiedTopology: true 
// }).then((data)=>{
// console.log(`mongodb connected: ${data.connection.host}`);
    
// })
// }
// module.exports = connectDatabase


const mongoose = require('mongoose')
const DB = "mongodb+srv://rachit:12345@cluster0.neale.mongodb.net/?retryWrites=true&w=majority"
const connectDatabase =()=>{
mongoose.connect(DB,{
useUnifiedTopology: true,
useNewUrlParser:true
}).then((data,err)=>{
console.log(`mongodb connected: ${data.connection.host}`);
    
})
}
module.exports = connectDatabase 