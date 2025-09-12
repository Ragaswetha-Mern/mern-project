const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["jobseeker", "employer"], required: true },
    profilePic: { type: String },
    resume: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    skills: [String],
    experience: { type: String },
    education: { type: String },
    contact: { type: String },
    resetToken: { type: String }, // <-- Add this
    resetTokenExpiry: { type: Date }, // <-- Add this
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
