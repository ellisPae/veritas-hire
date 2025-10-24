"use client";

import { motion, AnimatePresence } from "framer-motion";
import { InsightModalProps } from "@/types/analysis";
import { getScoreColor } from "@/utils/scoreColorHelpers";

const InsightModal = ({ type, score, insight, onClose }: InsightModalProps) => {
  const renderNarrative = (text: string) => (
    <div className="space-y-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
      {text.split("\n\n").map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
    </div>
  );

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
        {/* Modal */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
            delay: 0.1,
          }}
          className="relative z-50 w-full max-w-3xl bg-white dark:bg-gray-900 
             rounded-2xl shadow-xl p-10 overflow-y-auto max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {type === "skills"
              ? "Skills Match"
              : type === "experience"
              ? "Experience Match"
              : "Growth Potential"}
          </h3>
          <p className={`text-3xl font-extrabold ${getScoreColor(score)} mb-4`}>
            {score}%
          </p>

          {/* Handle both string and object */}
          {typeof insight === "string" ? (
            renderNarrative(insight)
          ) : (
            <>
              {renderNarrative(insight.narrative)}

              {/* Keywords Match */}
              <div className="mt-8">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">
                  Keywords Match
                </h4>

                <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
                  {/* Matched */}
                  <div className="pr-6">
                    <h5 className="font-semibold text-green-600 mb-3">
                      Matched
                    </h5>
                    <div className="space-y-2">
                      {insight.keywordsMatch?.matched.map((kw, idx) => (
                        <span
                          key={idx}
                          className="block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-md"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing */}
                  <div className="pl-6">
                    <h5 className="font-semibold text-red-600 mb-3">Missing</h5>
                    <div className="space-y-2">
                      {insight.keywordsMatch?.missing.map((kw, idx) => (
                        <span
                          key={idx}
                          className="block bg-red-100 text-red-800 text-sm px-3 py-1 rounded-md"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InsightModal;
