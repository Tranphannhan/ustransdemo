const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const User_Schema = new mongoose.Schema({
    Name : String,
    Password : String,
    SDT : String,
    Avatar : String,
    CoverPhoto : String,
    Status : Boolean

}, { collection: "User" }); 
module.exports = mongoose.model("User", User_Schema);