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
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Resume Roaster
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Upload your resume and let&apos;s see what we can roast!
        </p>
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <FileUpload onRoastData={setRoastData} />
        </div>
        {roastData && <RoastDashboard metrics={roastData.metrics} />}
        {roastData && (
          <RoastCard
            name={roastData.metrics.name}
            score={roastData.metrics.roastScore}
            topBuzzword={roastData.metrics.topBuzzword}
            roastCharacter={roastData.metrics.roastCharacter}
            onShare={onShare}
          />
        )}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Roast</h2>
          <p className="text-gray-600">Upload a resume to get started!</p>
        </div>
      </div>
    </main>
  );
}
