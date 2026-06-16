const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/complaintDB");

const createAdmin = async () => {
  try {
    const email = "admin@gmail.com";

    const existing = await User.findOne({ email });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Super Admin",
      email,
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();

    console.log("Admin created successfully");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

createAdmin();