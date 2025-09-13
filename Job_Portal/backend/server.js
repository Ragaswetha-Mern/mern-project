const chalk = require("chalk");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const jobsRoutes = require("./routes/jobs");
app.use("/api/jobs", jobsRoutes);

const applicationRoutes = require("./routes/application");
app.use("/api/applications", applicationRoutes);

const resumeRoutes = require("./routes/resume");
app.use("/api/resume", resumeRoutes);

const profileRoutes = require("./routes/profile");
app.use("/api/profile", profileRoutes);

const companyRoutes = require("./routes/company");
app.use("/api/company-profile", companyRoutes);

const userFileRoutes = require("./routes/userFile");
app.use("/api/user-file", userFileRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(chalk.green.bold("MongoDB connected")))
  .catch((err) =>
    console.log(chalk.red.bold("MongoDB connection error:"), err)
  );

app.get("/", (req, res) => {
  res.send("Job Portal API is running");
});

const os = require("os");
app.listen(PORT, () => {
  const ifaces = os.networkInterfaces();
  let addresses = [];
  for (const iface of Object.values(ifaces)) {
    for (const info of iface) {
      if (info.family === "IPv4" && !info.internal) {
        addresses.push(info.address);
      }
    }
  }
  if (addresses.length === 0) addresses.push("localhost");
  addresses.forEach((addr) => {
    console.log(chalk.yellow.bold(`Base URL: http://${addr}:${PORT}`));
  });
  console.log(chalk.blue.bold(`Server running on port ${PORT}`));
});
