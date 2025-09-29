"use client";

import { useState } from "react";

interface JobListingProps {
  onSubmit: (jobText: string) => void;
}

export default function JobListing({ onSubmit }: JobListingProps) {
  const [jobText, setJobText] = useState("");

  const handleSubmit = () => {
    if (!jobText.trim()) return;
    onSubmit(jobText);
  };

  return (
    <section className="w-full max-w-2xl bg-white dark:bg-gray-900 shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Paste Job Listing
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Copy and paste the job description below. We’ll analyze how well your
        resume matches.
      </p>

      <textarea
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
        rows={10}
        placeholder="Paste job description here..."
        className="w-full rounded-md border border-gray-300 dark:border-gray-700 
                   bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white 
                   focus:ring-2 focus:ring-blue-500 p-4 resize-none"
      />

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 
                   text-white font-semibold py-3 rounded-md transition"
      >
        Continue
      </button>
    </section>
  );
}
