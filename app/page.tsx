"use client";

import FileUpload from "./components/FileUpload";
import RoastCard from "./components/RoastCard";
import RoastDashboard from "./components/RoastDashboard";
import { useState } from "react";

// Define the updated type for the API response
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
  roastCharacter: string;
  roastScore: number;
  topBuzzword: string;
  name: string;
}

// The API response structure
interface RoastData {
  metrics: ResumeMetrics;
}

const onShare = () => {
  navigator.share({ title: "My Roast", url: window.location.href });
};

export default function Home() {
  // State now holds only the metrics object or null
  const [roastData, setRoastData] = useState<RoastData | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3 pb-2">
            Resume Roaster 🔥
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Upload your resume and get ready for a spicy critique!
          </p>
        </div>

        {/* File Upload Section */}
        <div className="bg-gray-50 rounded-xl shadow-inner p-6 mb-8 border border-gray-200">
          <FileUpload onRoastData={setRoastData} />
        </div>

        {/* Results Area */}
        {roastData ? (
          <div className="space-y-8">
            <RoastDashboard metrics={roastData.metrics} />
            <RoastCard
              name={roastData.metrics.name}
              score={roastData.metrics.roastScore}
              topBuzzword={roastData.metrics.topBuzzword}
              roastCharacter={roastData.metrics.roastCharacter}
              onShare={onShare}
            />
          </div>
        ) : (
          <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-sm p-8 border border-dashed border-purple-200 flex flex-col items-center justify-center space-y-4">
            <span className="text-4xl animate-bounce">📄</span>
            <h2 className="text-2xl font-semibold text-gray-700">
              Ready for the Roast?
            </h2>
            <p className="text-gray-500 max-w-sm">
              Upload your resume using the section above and let the roasting
              begin!
            </p>
          </div>
        )}
      </div>
      {/* Optional Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Resume Roaster. All rights reserved.
      </footer>
    </main>
  );
}
