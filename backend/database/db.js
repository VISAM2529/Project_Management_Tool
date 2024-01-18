
const mongoose = require("mongoose")

const URI = "mongodb+srv://sameer:sameer@cluster0.pskrtqk.mongodb.net/?retryWrites=true&w=majority"


const connectDB = async()=>{
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Change this timeout value as needed
          })
        console.log("Successfully Connnect to Database")
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = connectDB;