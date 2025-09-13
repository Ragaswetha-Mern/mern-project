// Get all jobs applied by the current user (jobseeker)
exports.getAppliedJobsForUser = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "jobseeker") {
      return res
        .status(403)
        .json({ message: "Only jobseekers can view their applications." });
    }
    const applications = await Application.find({
      applicant: req.user._id,
    }).select("job status");
    // Return array of objects: { job, status }
    res.json(applications.map((app) => ({ job: app.job, status: app.status })));
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch applied jobs", error: err.message });
  }
};
const Application = require("../models/Application");
const Job = require("../models/Job");

exports.applyJob = async (req, res) => {
  try {
    const jobId = req.body.jobId;
    const resumeFile = req.file;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required." });
    }

    if (!resumeFile) {
      return res.status(400).json({ message: "Resume file is required." });
    }

    if (!req.user || req.user.role !== "jobseeker") {
      return res
        .status(403)
        .json({ message: "Only jobseekers can apply for jobs." });
    }

    // Prevent duplicate application
    const existing = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: "You already applied for this job." });
    }

    // Overwrite resume in File collection (same as uploadUserFile)
    const File = require("../models/File");
    await File.findOneAndUpdate(
      { user: req.user._id, type: "resume" },
      {
        user: req.user._id,
        type: "resume",
        filename: resumeFile.originalname,
        contentType: resumeFile.mimetype,
        data: resumeFile.buffer,
        uploadedAt: new Date(),
      },
      { upsert: true, new: true, strict: false }
    );

    // Save application logic here (store resumeFile.filename)
    const application = new Application({
      job: jobId,
      applicant: req.user._id,
      resume: resumeFile.originalname,
    });

    await application.save();
    res.json({ message: "Application submitted successfully." });
  } catch (err) {
    console.error("Apply job error:", err);
    res.status(500).json({
      message: "Failed to apply for job",
      error: err.message,
    });
  }
};

// Get all applications for jobs posted by current employer
exports.getApplicationsForEmployer = async (req, res) => {
  try {
    // Find jobs posted by current employer
    const jobs = await Job.find({ postedBy: req.user._id }).select("_id");
    const jobIds = jobs.map((job) => job._id);

    // Find applications for those jobs
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("applicant", "name email")
      .populate("job", "title");

    res.json(applications);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch applications", error: err.message });
  }
};

// Update application status (accept/reject)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log("Requested status:", status);
    const validStatuses = [
      "accepted",
      "rejected",
      "scheduleInterview",
      "interviewed",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Only allow status change if not already accepted or rejected
    if (["accepted", "rejected"].includes(application.status)) {
      return res
        .status(400)
        .json({ message: "Cannot change status after accepted or rejected." });
    }

    application.status = status;
    await application.save();

    res.json({ message: "Application status updated", application });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update application status",
      error: err.message,
    });
  }
};
