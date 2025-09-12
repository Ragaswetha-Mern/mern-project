import { useEffect, useState } from "react";
import { apiFetch } from "../utils/http";

// Returns [{ job: jobId, status }, ...]
export default function useAppliedJobs(userId) {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    if (!userId) return;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "jobseeker") {
      setAppliedJobs([]);
      return;
    }
    apiFetch("/api/applications/user", { method: "GET" })
      .then((apps) => {
        // Expect array of application objects with job and status
        setAppliedJobs(Array.isArray(apps) ? apps : []);
      })
      .catch(() => setAppliedJobs([]));
  }, [userId]);

  return appliedJobs;
}
