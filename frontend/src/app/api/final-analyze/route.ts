import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const router = useRouter();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setLoading(true);
    setUploadComplete(false);
    setFile(selectedFile);

    try {
      const text = await selectedFile.text();
      sessionStorage.setItem("parsedResume", text);
      setUploadComplete(true);
    } catch (error) {
      console.error("Error reading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRemoveFile = () => {
    setFile(null);
    setUploadComplete(false);
    sessionStorage.removeItem("parsedResume");
  };

  const onNext = () => {
    router.push("/job-listing");
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileChange}
      />
      {loading && <p>Loading...</p>}
      {uploadComplete && (
        <div className="flex flex-col items-center space-y-4 w-full">
          <button
            onClick={onNext}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:scale-[1.02] transition transform"
          >
            Get Insights
          </button>
          <button onClick={onRemoveFile} className="w-full">
            Remove Resume
          </button>
        </div>
      )}
    </div>
  );
}
