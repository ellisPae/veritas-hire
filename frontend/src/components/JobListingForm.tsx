"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { JobDetails } from "@/types/job";

interface JobListingFormProps {
  onSubmit: (job: JobDetails) => Promise<void>;
  demoData?: JobDetails | null;
}

const JobListingForm = ({ onSubmit }: JobListingFormProps) => {
  const [form, setForm] = useState<JobDetails>({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleDemoEvent = (e: Event) => {
      const customEvent = e as CustomEvent<any>;
      if (customEvent.detail) setForm(customEvent.detail);
    };

    window.addEventListener(
      "useDemoJobListing",
      handleDemoEvent as EventListener
    );
    return () => {
      window.removeEventListener(
        "useDemoJobListing",
        handleDemoEvent as EventListener
      );
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.company || !form.description) return;

    try {
      setLoading(true);

      // ✅ Store job details locally for final analysis
      sessionStorage.setItem("jobListing", JSON.stringify(form));

      // ✅ Redirect to /results (final step — combined analysis)
      router.push("/results");
    } catch (err) {
      console.error("❌ Failed to process job listing:", err);
      alert("Something went wrong while saving job details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7 max-w-xl mx-auto">
      {/* Job Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Job Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title || ""}
          onChange={handleChange}
          placeholder="e.g. Frontend Software Engineer"
          className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 
                     bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white 
                     shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 
                     dark:focus:ring-blue-700 transition"
        />
      </div>

      {/* Company */}
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={form.company || ""}
          onChange={handleChange}
          placeholder="e.g. Veritas Hire"
          className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 
                     bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white 
                     shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 
                     dark:focus:ring-blue-700 transition"
        />
      </div>

      {/* Location (optional) */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Location <span className="text-xs text-gray-400">(optional)</span>
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={form.location || ""}
          onChange={handleChange}
          placeholder="e.g. Remote / San Francisco, CA"
          className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 
                     bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white 
                     shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 
                     dark:focus:ring-blue-700 transition"
        />
      </div>

      {/* Job Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Job Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          placeholder="Paste the full job description here..."
          rows={8}
          className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 
                     bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white 
                     shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 
                     dark:focus:ring-blue-700 transition resize-none"
        />
      </div>

      {/* Clear Button */}
      <button
        type="button"
        onClick={() => {
          setForm({ title: "", company: "", location: "", description: "" });
          try {
            sessionStorage.removeItem("jobListing");
            sessionStorage.removeItem("isDemoJob");
          } catch {}
        }}
        className="w-full py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition mb-3"
      >
        Clear
      </button>

      {/* Submit Button */}
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <span className="inline-flex space-x-2">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"
              style={{ animationDelay: "0s" }}
            ></span>
            <span
              className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></span>
            <span
              className="inline-block w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></span>
          </span>
        </div>
      ) : (
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 
               text-white font-semibold shadow hover:shadow-lg hover:scale-[1.02] 
               transform transition disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center"
        >
          Get Insights
        </button>
      )}
    </form>
  );
};

export default JobListingForm;
