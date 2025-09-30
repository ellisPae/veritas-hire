"use client";

import { useState } from "react";
import type { JobDetails } from "@/types/job";

interface JobListingFormProps {
  onSubmit: (job: JobDetails) => void;
}

export default function JobListingForm({ onSubmit }: JobListingFormProps) {
  const [form, setForm] = useState<JobDetails>({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.company || !form.description) return; // required
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 
                   text-white font-semibold shadow hover:shadow-lg hover:scale-[1.02] 
                   transform transition"
      >
        Get Insights
      </button>
    </form>
  );
}
