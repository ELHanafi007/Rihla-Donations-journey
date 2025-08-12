// src/components/ProblemSection.jsx
import React from "react";
import { motion } from "framer-motion";

// Floating icon animation
const FloatingIcon = ({ children }) => (
  <motion.div
    animate={{ y: [0, -6, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className="flex justify-center mb-4"
  >
    {children}
  </motion.div>
);

// Clean SVG icons from Heroicons (24/outline)
const PriceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-red"
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 8.25v-1.5m0 1.5a48.424 48.424 0 00-4.024.166C6.845 8.51 6 9.473 6 10.608v2.784c0 1.135.845 2.098 1.976 2.192A48.424 48.424 0 009.75 15.75V13.5c0-1.135-.845-2.098-1.976-2.192A48.424 48.424 0 0012 8.25zm-2.25 8.25a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z" />
  </svg>
);

const QualityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-red"
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313M9.75 3.375L12 2.25l2.25 1.125M12 7.5V5.25m0 2.25l-2.25-1.125" />
  </svg>
);

const SafetyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-red"
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75m-3-7.5A11.96 11.96 0 013.6 6c-.39 1.18-.6 2.44-.6 3.75 0 5.6 3.82 10.3 9 11.62 5.18-1.32 9-6.02 9-11.62 0-1.31-.21-2.57-.6-3.75A11.96 11.96 0 0012 2.25z" />
  </svg>
);

// Card Component
const ProblemCard = ({ icon, title, children, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2, type: "spring" }
    }),
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      whileHover={{
        y: -6,
        boxShadow: "0 12px 30px rgba(255,0,0,0.2)",
        background:
          "linear-gradient(180deg, rgba(255,0,0,0.05) 0%, rgba(255,0,0,0) 100%)",
      }}
      className="bg-brand-dark/50 border border-white/10 rounded-2xl p-8 text-center transition-all duration-300"
    >
      <FloatingIcon>{icon}</FloatingIcon>
      <h3 className="font-display text-2xl font-semibold mb-3 text-text-primary">
        {title}
      </h3>
      <p className="text-text-secondary leading-relaxed">{children}</p>
    </motion.div>
  );
};

export default function ProblemSection() {
  return (
    <section className="bg-brand-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-black" />
      <div className="absolute -top-20 left-1/3 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-brand-red/5 rounded-full blur-2xl" />

      <div className="section-container relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.h2
            className="h2-display mb-4"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, type: "spring" } }
            }}
          >
            The Chaos of the Current System
          </motion.h2>

          <motion.p
            className="p-body mx-auto mb-16 max-w-2xl"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.7, delay: 0.2 } }
            }}
          >
            For passengers and drivers alike, the Moroccan ride-hailing market is a landscape of uncertainty, inefficiency, and unnecessary risk.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProblemCard icon={<PriceIcon />} title="Unpredictable Pricing" index={0}>
              The stress of haggling creates friction. Passengers never know the fair price, and drivers waste time on lowball offers.
            </ProblemCard>
            <ProblemCard icon={<QualityIcon />} title="Inconsistent Quality" index={1}>
              Every ride is a gamble. Vehicle quality, cleanliness, and driver professionalism are completely inconsistent.
            </ProblemCard>
            <ProblemCard icon={<SafetyIcon />} title="A Foundation of Mistrust" index={2}>
              Minimal vetting and a lack of accountability have eroded trust. Safety cannot be an afterthought; it must be the foundation.
            </ProblemCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
