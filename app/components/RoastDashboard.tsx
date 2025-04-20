import React from "react";

// Define the interface based on the keys in the system prompt
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
}

// The API now returns an object like { metrics: ResumeMetrics }
interface RoastDashboardProps {
  metrics: ResumeMetrics;
}

// Helper to format percentage
const formatPercent = (value: number) => `${value.toFixed(1)}%`;

const RoastDashboard: React.FC<RoastDashboardProps> = ({ metrics }) => {
  // Map metrics to display info
  const displayMetrics = [
    { label: "Buzzword Bingo", value: metrics.buzzwordBingo, color: "yellow" },
    {
      label: "Fluff Factor",
      value: formatPercent(metrics.fluffFactor),
      color: "pink",
    },
    {
      label: "Passive Voice Sentences",
      value: metrics.passivePatty,
      color: "purple",
    },
    {
      label: "Superlative Slam",
      value: metrics.superlativeSlam,
      color: "blue",
    },
    {
      label: "Jargon Jolt (/100 words)",
      value: metrics.jargonJolt.toFixed(1),
      color: "indigo",
    },
    { label: "Number Mentions", value: metrics.numberCruncher, color: "green" },
    {
      label: "Action Verb Lines",
      value: formatPercent(metrics.verbVibes),
      color: "teal",
    },
    {
      label: "Long Sentences (>20 words)",
      value: formatPercent(metrics.sentenceSauna),
      color: "orange",
    },
    { label: "Absolute Terms", value: metrics.hyperboleHunter, color: "red" },
    {
      label: "Avg Punctuation / Line",
      value: metrics.punctuationParty.toFixed(1),
      color: "gray",
    },
  ];

  // Define color classes for Tailwind
  const colorClasses: {
    [key: string]: { bg: string; text: string; value: string };
  } = {
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      value: "text-yellow-600",
    },
    pink: { bg: "bg-pink-100", text: "text-pink-800", value: "text-pink-600" },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      value: "text-purple-600",
    },
    blue: { bg: "bg-blue-100", text: "text-blue-800", value: "text-blue-600" },
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-800",
      value: "text-indigo-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-800",
      value: "text-green-600",
    },
    teal: { bg: "bg-teal-100", text: "text-teal-800", value: "text-teal-600" },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-800",
      value: "text-orange-600",
    },
    red: { bg: "bg-red-100", text: "text-red-800", value: "text-red-600" },
    gray: { bg: "bg-gray-100", text: "text-gray-800", value: "text-gray-600" },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📊 Resume Analysis Dashboard 📊
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 text-center">
        {displayMetrics.map((metric) => {
          const colors = colorClasses[metric.color] || colorClasses.gray;
          return (
            <div
              key={metric.label}
              className={`${colors.bg} p-4 rounded-lg flex flex-col justify-between`}
            >
              <h3 className={`text-sm font-semibold ${colors.text} mb-2`}>
                {metric.label}
              </h3>
              <p className={`text-2xl font-bold ${colors.value}`}>
                {metric.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoastDashboard;
