import React from "react";

interface RoastCardProps {
  /** Candidate's name or identifier */
  name: string;
  /** Calculated cringe score (0-100) */
  score: number;
  /** Most overused buzzword */
  topBuzzword: string;
  /** Assigned roast character title */
  roastCharacter: string;
  /** Optional share handler (e.g., opens share dialog) */
  onShare?: () => void;
}

/**
 * RoastCard Component
 * Displays a shareable roast card with avatar, metrics, and character title.
 */
const RoastCard: React.FC<RoastCardProps> = ({
  name,
  score,
  topBuzzword,
  roastCharacter,
}) => {
  // Use roastCharacter as seed for the avatar
  const avatarUrl = `https://api.dicebear.com/9.x/bottts/svg?seed=${roastCharacter}`;

  return (
    <div className="max-w-xs mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Avatar Header */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 flex justify-center">
        <img
          src={avatarUrl}
          alt={roastCharacter}
          className="w-24 h-24 rounded-full border-4 border-white"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h2 className="text-center text-2xl font-extrabold text-gray-800">
          {roastCharacter}
        </h2>
        <p className="text-center text-gray-500">for {name}</p>

        {/* Metrics */}
        <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
          <div className="text-center">
            <p className="text-xl font-semibold text-red-600">{score}%</p>
            <p className="text-sm text-gray-500">Cringe Score</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-yellow-600 capitalize">
              {topBuzzword}
            </p>
            <p className="text-sm text-gray-500">Top Buzzword</p>
          </div>
        </div>

        {/* Share Button */}
        {/* <button
          onClick={onShare}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg"
        >
          Share Your Roast
        </button> */}
      </div>
    </div>
  );
};

export default RoastCard;
