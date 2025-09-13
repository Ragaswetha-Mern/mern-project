const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["profilePic", "resume"], required: true },
    filename: { type: String },
    contentType: { type: String },
    data: { type: Buffer, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
