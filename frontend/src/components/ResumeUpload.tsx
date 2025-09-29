"use client";

export default function ResumeUpload() {
  return (
    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-10 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 hover:border-blue-500 transition">
      <p className="mb-4 text-gray-500 dark:text-gray-400">
        Drag & drop your resume here
      </p>
      <label className="cursor-pointer inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:shadow-lg hover:scale-105 transform transition">
        Choose File
        <input type="file" className="hidden" />
      </label>
      <p className="mt-2 text-xs text-gray-400">
        Supports PDF, DOC, DOCX (max 5MB)
      </p>
    </div>
  );
}
