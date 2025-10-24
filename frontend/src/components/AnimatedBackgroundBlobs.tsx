"use client";

import { motion } from "framer-motion";

const AnimatedBackgroundBlobs = () => {
  const animationProps = {
    animate: {
      scale: [1, 1.05, 1],
      x: [0, 40, -40, 0],
      y: [0, -30, 30, 0],
    },
    transition: { repeat: Infinity, duration: 26, ease: "easeInOut" },
  };

  return (
    <>
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400 dark:bg-indigo-400 
                   rounded-full filter blur-3xl opacity-60 
                   mix-blend-multiply dark:mix-blend-plus-lighter"
        {...animationProps}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-400 dark:bg-fuchsia-400 
                   rounded-full filter blur-3xl opacity-60 
                   mix-blend-multiply dark:mix-blend-plus-lighter"
        {...animationProps}
      />
    </>
  );
};

export default AnimatedBackgroundBlobs;
