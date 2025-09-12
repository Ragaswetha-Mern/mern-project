const User = require("../models/User");
const Application = require("../models/Application");

// Job Recommendations for jobseeker
exports.getRecommendations = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "jobseeker") {
      return res
        .status(403)
        .json({ message: "Only jobseekers get recommendations." });
    }
    // Get user profile
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    // Get jobs already applied to
    const appliedJobs = await Application.find({
      applicant: req.user._id,
    }).distinct("job");
    // Find jobs matching user's skills, not already applied to
    const skillQuery =
      user.skills && user.skills.length > 0
        ? {
            requirements: { $regex: user.skills.join("|"), $options: "i" },
          }
        : {};

    console.log("Skill Query:", user);
    const jobs = await Job.find({
      ...skillQuery,
      _id: { $nin: appliedJobs },
    }).limit(10);
    res.json(jobs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch recommendations", error: err.message });
  }
};
const Job = require("../models/Job");

// Create a new job
exports.postJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can post jobs." });
    }
    const { title, description, requirements, location, salary, company } =
      req.body;
    const job = new Job({
      title,
      description,
      requirements,
      location,
      salary,
      postedBy: req.user._id,
      company: company || null,
    });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: "Failed to post job", error: err.message });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "name company")
      .populate("company", "name"); // <-- Add this line
    res.json(jobs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch jobs", error: err.message });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Only the employer who posted the job can update it
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this job." });
    }

    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update job", error: err.message });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Only the employer who posted the job can delete it
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this job." });
    }

    await job.deleteOne();
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete job", error: err.message });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("postedBy", "name company")
      .populate("company", "name");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch job", error: err.message });
  }
};
