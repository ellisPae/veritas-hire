"use client";

import { motion, AnimatePresence } from "framer-motion";
import { InsightType } from "@/types/analysis";

interface InsightModalProps {
  type: InsightType;
  score: number;
  insight: string;
  onClose: () => void;
}

export default function InsightModal({
  type,
  score,
  insight,
  onClose,
}: InsightModalProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={onClose}
      >
        {/* Stop click bubbling inside */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
            delay: 0.1, // ✅ small delay so backdrop unblurs first
          }}
          className="relative z-50 w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {type === "skills"
              ? "Skills Match"
              : type === "experience"
              ? "Experience Match"
              : "Growth Potential"}
          </h3>
          <p className="text-4xl font-extrabold text-blue-600 mb-4">{score}%</p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {insight}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
