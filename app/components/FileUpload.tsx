"use client";
import React, { useState, useCallback } from "react";
import pdfToText from "react-pdftotext";

// Define the updated type for the API response data
interface ResumeMetrics {
  buzzwordBingo: number;
  fluffFactor: number;
  passivePatty: number;
  superlativeSlam: number;
  jargonJolt: number;
  numberCruncher: number;
  verbVibes: number;
  sentenceSauna: number;
  hyperboleHunter: number;
  punctuationParty: number;
}

interface RoastData {
  metrics: ResumeMetrics;
}

interface FileUploadProps {
  onRoastData: (data: RoastData) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onRoastData }) => {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      setIsLoading(true);
      setError("");
      extractTextFromPDF(selectedFile);
    }
  };

  const extractTextFromPDF = async (file: File) => {
    setIsLoading(true);
    setError("");
    pdfToText(file)
      .then((extractedText) => {
        setText(extractedText);
        sendToRoastAPI(extractedText);
      })
      .catch((err) => {
        console.error("Error extracting text from PDF:", err);
        setError("Failed to extract text from PDF. Please try again.");
        setIsLoading(false);
      });
  };

  const sendToRoastAPI = async (extractedText: string) => {
    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: extractedText }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch analysis");
      }

      const data: RoastData = await response.json();
      if (data.metrics) {
        onRoastData(data);
      } else {
        throw new Error("Invalid analysis data received");
      }
    } catch (err) {
      console.error("Error fetching analysis:", err);
      setError(
        (err as Error).message ||
          "Failed to generate analysis. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setIsLoading(true);
      setError("");
      extractTextFromPDF(droppedFile);
    } else {
      setError("Please upload a PDF file.");
    }
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="text-gray-600">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <p>Drag and drop your resume here, or click to select a file</p>
          )}
        </div>
      </label>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {text && !isLoading && !error && (
        <div className="mt-4 text-left bg-gray-50 p-3 rounded">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">
            Extracted Text Preview:
          </h3>
          <p className="text-xs text-gray-500 max-h-24 overflow-y-auto">
            {text}
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
