const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String },
    location: { type: String },
    salary: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
