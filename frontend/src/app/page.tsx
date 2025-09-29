"use client";

import FileUpload from "@/components/FileUpload";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-6 py-12">
      {/* Hero Section */}
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Resume <span className="text-blue-600">Insights</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
          Upload your resume to get AI-powered feedback on strengths,
          weaknesses, and how well you match your target roles.
        </p>
      </section>

      {/* Upload Component */}
      <section className="w-full max-w-xl">
        <FileUpload />
      </section>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-500 dark:text-gray-400"></footer>
    </main>
  );
}
