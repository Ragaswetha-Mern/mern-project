const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    logo: { type: String },
    location: { type: String },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    email: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
