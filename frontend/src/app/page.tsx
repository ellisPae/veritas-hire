"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Animation timing constants
const FADE_DURATION = 1.8;
const HOLD_DURATION = 1.6;
const EASE_CURVE = [0.4, 0, 0.6, 1];

// Reusable transition objects
const fadeTransition = {
  opacity: { duration: FADE_DURATION, ease: EASE_CURVE },
  y: { duration: FADE_DURATION, ease: EASE_CURVE },
};

const initialContentAnimation = {
  opacity: 0,
  y: 40,
  scale: 0.96,
};

const animateContentAnimation = {
  opacity: 1,
  y: 0,
  scale: 1,
};

const titleTransition = fadeTransition;

export default function Home() {
  // State setup
  const [step, setStep] = useState(0);
  const [showButton, setShowButton] = useState(false);

  // Step progression timers
  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setStep(1), 1500));
    timers.push(setTimeout(() => setStep(2), 2500));
    timers.push(setTimeout(() => setStep(3), 6000));
    timers.push(setTimeout(() => setStep(4), 8000));

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  // Show button delay after final step
  useEffect(() => {
    let buttonTimer: NodeJS.Timeout;
    if (step === 4) {
      buttonTimer = setTimeout(() => {
        setShowButton(true);
      }, 3000);
    } else {
      setShowButton(false);
    }
    return () => {
      if (buttonTimer) clearTimeout(buttonTimer);
    };
  }, [step]);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-6 py-12 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Background blobs with infinite animations */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0] }}
        transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, -40, 40, 0], y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 26, ease: "easeInOut" }}
      />

      {/* Main content container with initial animation */}
      <motion.div
        initial={initialContentAnimation}
        animate={animateContentAnimation}
        transition={{ duration: FADE_DURATION, ease: EASE_CURVE }}
        className="relative z-10 flex flex-col items-center text-center space-y-12 max-w-2xl"
      >
        <AnimatePresence mode="wait">
          {/* Step 0: First text */}
          {step === 0 && (
            <motion.p
              key="first"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={fadeTransition}
              className="text-2xl sm:text-2xl"
            >
              See your career with new clarity.
            </motion.p>
          )}

          {/* Step 2: Two lines of text with staggered animation */}
          {step === 2 && (
            <motion.div
              key="second"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={fadeTransition}
              className="max-w-xl text-center"
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: FADE_DURATION, ease: EASE_CURVE }}
                className="text-2xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-snug mb-0"
              >
                Understand the story your resume tells
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  delay: 0.8,
                  duration: FADE_DURATION,
                  ease: EASE_CURVE,
                }}
                className="text-2xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-snug mt-0"
              >
                and align it with the opportunities that matter most.
              </motion.p>
            </motion.div>
          )}

          {/* Steps 1 and 3: Blank placeholders to maintain timing */}
          {(step === 1 || step === 3) && (
            <motion.div
              key="blank"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className="h-24"
            />
          )}
        </AnimatePresence>

        {/* Step 4: Title and conditional button */}
        {step === 4 && (
          <>
            <motion.h1
              key="title"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.8,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
            >
              Veritas Hire
            </motion.h1>
            {showButton && (
              <div className="relative w-full flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 10 }}
                  transition={{ duration: HOLD_DURATION, ease: EASE_CURVE }}
                  className="absolute top-full mt-12"
                >
                  <Link
                    href="/resume-upload"
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg transition hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </main>
  );
}
