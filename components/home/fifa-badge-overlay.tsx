"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FifaBadgeOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entry animation after mount
    setIsVisible(true);
  }, []);

  const handleClick = () => {
    const fifaSection = document.getElementById("fifa-cities-section");
    if (fifaSection) {
      fifaSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={
        isVisible
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: -30 }
      }
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3,
      }}
      className="relative mx-auto z-50 cursor-pointer
                 md:absolute md:top-[90px] md:left-1/2 md:-translate-x-1/2
                 md:scale-[1.1]
                 lg:top-[160px]
                 lg:scale-[1.4]
                 scale-[0.9]"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="View FIFA World Cup 2026 Host Cities"
    >
      <motion.div
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          y: -2,
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.5)",
        }}
        className="relative overflow-hidden rounded-xl border-2 p-[15px] px-5
                   sm:p-[15px] sm:px-[25px]
                   md:p-5 md:px-[30px]
                   bg-gradient-to-br from-[#1a2332] to-[#2d3e50]
                   shadow-[0_8px_24px_rgba(0,0,0,0.4)]
                   transition-all duration-300"
        style={{
          borderColor: "#d4af37",
        }}
      >
        {/* Subtle shine effect */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.2) 50%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Line 1: Trophy and Title */}
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl leading-none">🏆</span>
            <h3 className="text-sm font-bold text-white md:text-base leading-tight whitespace-nowrap">
              FIFA WORLD CUP 2026
            </h3>
          </div>

          {/* Line 2: Subtitle */}
          <p className="mt-1 text-xs text-white/90 md:text-sm">
            Find Your Stay in Host Cities
          </p>
        </div>

        {/* Decorative corner accent */}
        <div
          className="absolute -right-1 -top-1 h-3 w-3 rotate-45"
          style={{
            background: "#d4af37",
            opacity: 0.3,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
