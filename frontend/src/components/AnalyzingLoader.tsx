"use client";

import { motion } from "framer-motion";

export default function AnalyzingLoader() {
  const colors = ["#8B5CF6", "#6366F1", "#3B82F6", "#60A5FA", "#A5B4FC"];

  // Base style shared by all dots
  const dotStyle: React.CSSProperties = {
    borderRadius: "50%",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f9fafb",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {colors.map((color, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
            style={{
              ...dotStyle,
              backgroundColor: color,
              width: "clamp(16px, 2vw, 28px)",
              height: "clamp(16px, 2vw, 28px)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
