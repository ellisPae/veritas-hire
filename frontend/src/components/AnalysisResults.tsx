"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { AnalysisResultsProps, InsightType } from "@/types/analysis";
import InsightModal from "./InsightModal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const EASE_CURVE: [number, number, number, number] = [0.4, 0, 0.6, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_CURVE },
  },
};

const AnalysisResults = ({
  overallScore,
  skillsMatch,
  experienceMatch,
  growthPotential,
  strengths = [],
  weaknesses = [],
  recommendations = [],
  summary,
  insights,
}: AnalysisResultsProps) => {
  const [activeCard, setActiveCard] = useState<InsightType | null>(null);

  // close modal with Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCard(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex flex-col items-center px-6 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center w-full space-y-12"
      >
        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-6xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-3xl shadow-lg p-12 text-center space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Your Fit Score
          </h2>
          <p className="text-7xl sm:text-8xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-1">
            {overallScore}%
          </p>
          <div className="w-20 h-1 mx-auto my-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
            This score shows how closely the profile matches the role, providing
            a clear view of strengths and growth opportunities
          </p>
        </motion.div>

        {/* Match Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-6xl"
        >
          <MatchCard
            label="Skills Match"
            score={skillsMatch}
            color="blue"
            onClick={() => setActiveCard("skills")}
          />
          <MatchCard
            label="Experience Match"
            score={experienceMatch}
            color="purple"
            onClick={() => setActiveCard("experience")}
          />
          <MatchCard
            label="Growth Potential"
            score={growthPotential}
            color="green"
            onClick={() => setActiveCard("growth")}
          />
        </motion.div>

        {/* Strengths & Weaknesses */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-6xl"
        >
          <DetailCard
            icon={<CheckCircle className="text-green-500" />}
            title="Strengths"
            items={strengths}
            bg="green"
          />
          <DetailCard
            icon={<XCircle className="text-red-500" />}
            title="Areas to Improve"
            items={weaknesses}
            bg="red"
          />
        </motion.div>

        {/* Recommendations */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-6xl bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-xl shadow-md p-8 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="text-yellow-500" />
            <h3 className="font-bold text-yellow-700 dark:text-yellow-400">
              Recommendations
            </h3>
          </div>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-base">
            {recommendations.map((rec, idx) => (
              <li key={idx}>• {rec}</li>
            ))}
          </ul>
        </motion.div>

        {/* Summary */}
        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-6xl bg-white/90 dark:bg-gray-900/90 
             backdrop-blur-md rounded-2xl shadow-md p-12 mt-8"
        >
          <h3 className="font-bold text-gray-900 dark:text-white text-2xl mb-6">
            Summary
          </h3>
          <div className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            {summary.split("\n\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Subtle fade at bottom */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-12 
               bg-gradient-to-t from-white dark:from-gray-900/95 to-transparent 
               pointer-events-none rounded-b-2xl"
          />
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {activeCard && (
          <InsightModal
            type={activeCard}
            score={
              activeCard === "skills"
                ? skillsMatch
                : activeCard === "experience"
                ? experienceMatch
                : growthPotential
            }
            insight={
              activeCard === "skills"
                ? insights.skills
                : activeCard === "experience"
                ? insights.experience
                : insights.growth
            }
            onClose={() => setActiveCard(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default AnalysisResults;

/* Sub-components */
const MatchCard: React.FC<{
  label: string;
  score: number;
  onClick: () => void;
}> = ({ label, score, onClick }) => {
  const getTextColor = (value: number) => {
    if (value >= 80) return "text-green-600";
    if (value >= 60) return "text-amber-400";
    return "text-red-600";
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="cursor-pointer bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm 
                 rounded-2xl shadow-md p-8 text-center transition-all"
    >
      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
        {label}
      </h3>
      <p className={`mt-3 text-3xl font-bold ${getTextColor(score)}`}>
        {score}%
      </p>
    </motion.div>
  );
};

const DetailCard = ({
  icon,
  title,
  items,
  bg,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  bg: string;
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className={`${
        title === "Strengths"
          ? "bg-green-100/70 dark:bg-green-900/30"
          : "bg-red-100/70 dark:bg-red-900/30"
      } rounded-2xl shadow-md p-6 backdrop-blur-sm border border-white/20`}
    >
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        {items.map((item, idx) => (
          <li key={idx}>• {item}</li>
        ))}
      </ul>
    </motion.div>
  );
};
