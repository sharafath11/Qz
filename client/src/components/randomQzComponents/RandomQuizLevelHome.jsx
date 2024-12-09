"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Brain, Zap, CheckCircle } from "lucide-react";

export default function RandomQuizLevelHome() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl max-w-md w-full"
      >
        <h1 className="text-4xl font-bold text-center text-white mb-6">
          Quiz Master
        </h1>

        <div className="relative w-64 h-64 mx-auto mb-8">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-purple-300 opacity-20"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="44"
              cx="50"
              cy="50"
            />
            <motion.circle
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isLoaded ? 0.5 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="text-indigo-500"
              strokeWidth="8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="44"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="text-6xl font-bold text-white mb-1"
            >
              50
            </motion.div>
            <div className="text-indigo-200 text-xl font-semibold">Level</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatsCard icon={<CheckCircle className="w-6 h-6" />} value="75" label="Completed" />
          <StatsCard icon={<Brain className="w-6 h-6" />} value="68" label="Correct" />
          <StatsCard icon={<Zap className="w-6 h-6" />} value="7" label="Day Streak" />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-200 ease-in-out"
        >
          Start Next Quiz
        </motion.button>
      </motion.div>
    </div>
  );
}

function StatsCard({ icon, value, label }) {
  return (
    <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
      <div className="text-indigo-300 mb-2">{icon}</div>
      <div className="text-2xl font-bold text-white mb-1">
        {label === "Completed" || label === "Correct" ? `${value}/100` : value}
      </div>
      <div className="text-indigo-200 text-sm">{label}</div>
    </div>
  );
}
