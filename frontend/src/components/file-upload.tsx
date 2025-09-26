"use client";

import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Upload, X, CheckCircle, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { FileUploadState } from "@/types/analysis";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onFileError: (error: string) => void;
  fileState: FileUploadState;
  onRemoveFile: () => void;
}

export function FileUpload({
  onFileUpload,
  onFileError,
  fileState,
  onRemoveFile,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setIsDragOver(false);

      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        const error = rejection.errors[0];

        const errorMessages: Record<string, string> = {
          "file-too-large": "File is too large. Maximum size is 5MB.",
          "file-invalid-type":
            "Invalid file type. Please upload a PDF, DOC, or DOCX file.",
        };

        onFileError(
          errorMessages[error.code] ?? "File upload failed. Please try again."
        );
        return;
      }

      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload, onFileError]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    noClick: true,
    noKeyboard: true,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
  });

  return (
    <div className="glass-card p-6 animate-fade-in-up">
      <h2 className="text-xl font-bold mb-6 flex items-center text-foreground">
        <div
          className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
          style={{ background: "var(--grad-primary)" }}
        >
          <Upload className="text-white" size={18} aria-hidden="true" />
        </div>
        Upload Resume
      </h2>

      <div
        {...getRootProps()}
        className={cn(
          "relative rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ease-out border-2 border-dashed",
          "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm",
          "hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
          isDragActive || isDragOver
            ? "border-blue-400 bg-gradient-to-br from-blue-500/10 to-purple-600/10 scale-[1.02] shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            : "border-white/20 hover:border-blue-400/60"
        )}
        data-testid="upload-area"
      >
        <input {...getInputProps()} />
        <div className="space-y-6">
          <div
            className={cn(
              "w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-500 ease-out",
              isDragActive || isDragOver
                ? "scale-110 animate-pulse"
                : "scale-100"
            )}
            style={{
              background:
                isDragActive || isDragOver
                  ? "var(--grad-primary)"
                  : "var(--grad-secondary)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <Cloud
              className="text-white transition-all duration-300"
              size={isDragActive || isDragOver ? 40 : 36}
              aria-hidden="true"
            />
          </div>
          <div className="space-y-2">
            <p
              className={cn(
                "text-xl font-bold text-foreground transition-all duration-300",
                (isDragActive || isDragOver) && "text-blue-300 scale-105"
              )}
            >
              {isDragActive || isDragOver
                ? "Drop to upload!"
                : "Drop your resume here"}
            </p>
            <p className="text-muted-foreground/80 font-medium">
              or use the button below to browse files
            </p>
            <p className="text-sm text-muted-foreground/70 mt-3">
              Supports PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>
          <button
            type="button"
            onClick={open}
            className={cn(
              "btn-gradient px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300",
              "hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
              (isDragActive || isDragOver) &&
                "scale-105 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            )}
            data-testid="button-choose-file"
          >
            Choose File
          </button>
        </div>
      </div>

      {fileState.isUploaded && fileState.file && (
        <div
          className="mt-6 p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 animate-fade-in-up"
          style={{
            background:
              "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))",
            borderColor: "rgba(34, 197, 94, 0.3)",
            boxShadow: "0 4px 20px rgba(34, 197, 94, 0.1)",
          }}
          data-testid="file-status"
        >
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
              <CheckCircle className="text-green-400" size={16} />
            </div>
            <span className="text-green-300 font-semibold flex-1">
              {fileState.file.name} uploaded successfully
            </span>
            <button
              onClick={onRemoveFile}
              aria-label="Remove uploaded file"
              className="text-green-400 hover:text-green-300 p-2 rounded-lg hover:bg-green-500/10 transition-all duration-200 hover:scale-110"
              data-testid="button-remove-file"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {fileState.error && (
        <div
          className="mt-6 p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 animate-fade-in-up"
          style={{
            background:
              "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))",
            borderColor: "rgba(239, 68, 68, 0.3)",
            boxShadow: "0 4px 20px rgba(239, 68, 68, 0.1)",
          }}
          data-testid="file-error"
        >
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
              <X className="text-red-400" size={16} />
            </div>
            <span className="text-red-300 font-semibold">
              {fileState.error}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
