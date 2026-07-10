const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("./models/userModel");

dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/school_management";
    console.log("Connecting to database at:", mongoUri);
    await mongoose.connect(mongoUri);
    console.log("Database connected successfully.");

    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin user already exists:", adminExists.username);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await User.create({
      username: "admin",
      email: "admin@school.com",
      password: hashedPassword,
      role: "admin",
      phone: 1234567890
    });

    console.log("Admin user seeded successfully:", adminUser);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin user:", error);
    process.exit(1);
  }
};

seedAdmin();
