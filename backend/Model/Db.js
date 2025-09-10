
const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log("✅ Kết nối Server MXH Thành Công!");
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error.message);
  }
}

module.exports = connectDB;


// User Name 
// huanndps38821_db_user
// Password
// 6ZKkfze47VrK6AZC
