import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.7a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.8, 0.4]);
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden px-4"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 -z-20 bg-brand-dark bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Animated gradient glow */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        animate={{
          rotate: [0, 5, 0],
          background: [
            "linear-gradient(to top right, rgba(0, 100, 255, 0.2), rgba(150, 0, 255, 0.2), rgba(255, 0, 150, 0.2))",
            "linear-gradient(to top right, rgba(255, 0, 150, 0.2), rgba(0, 100, 255, 0.2), rgba(150, 0, 255, 0.2))"
          ]
        }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, background: { duration: 10, repeat: Infinity, ease: "linear" } }}
        className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl"
      />

      {/* Content */}
      <motion.div
        className="z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          style={{ y: headingY }}
          className="h1-display gradient-text mb-6 drop-shadow-lg leading-tight"
        >
          Rihla: The Future of Moroccan Transport.
          <br />
          Built on Trust.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="p-body mx-auto mb-10 max-w-2xl"
        >
          A 100% Moroccan ride-hailing solution designed for the safety,
          dignity, and prosperity of our drivers and passengers.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(59,130,246,0.4)" }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-brand-blue px-8 py-4 text-lg font-bold text-white overflow-hidden"
        >
          <span className="relative z-10">Discover the Vision</span>
          <ArrowIcon />
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
