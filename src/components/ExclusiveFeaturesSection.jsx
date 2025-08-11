import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// --- STEP 1: Import all the images directly ---
import rank1 from '/photos/rank1.jpeg';
import rank2 from '/photos/rank2.jpeg';
import rank3 from '/photos/rank3.jpeg';
import rank4 from '/photos/rank4.jpeg';
import rank5 from '/photos/rank5.jpeg';
import rank6 from '/photos/rank6.jpeg';


// --- STEP 2: Update the array to use the imported images ---
const features = [
  { rank: 6, title: "Rihla Comfort+ Tier", description: "An elite experience...", imageUrl: rank6 },
  { rank: 5, title: "Rihla for Her", description: "Female passengers can request a ride...", imageUrl: rank5 },
  { rank: 4, title: 'The "Triple-Check" Shield', description: "Every driver is vetted with ID verification...", imageUrl: rank4 },
  { rank: 3, title: "Rihla Guardian™ with Sentry", description: "Family or friends can monitor your trip live...", imageUrl: rank3 },
  { rank: 2, title: "Integrated Language Translation", description: "Our in-app chat auto-translates messages...", imageUrl: rank2 },
  { rank: 1, title: "The Digital Handshake™", description: "Scan the license plate before boarding...", imageUrl: rank1 },
];

const FeatureCard = ({ feature, index, total, scrollYProgress }) => {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [start, start + 0.1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [start, end], ["100px", "-100px"]);
  const isEven = index % 2 === 0;

  return (
    <motion.div style={{ opacity, scale }} className="min-h-screen flex items-center justify-center sticky top-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center w-full max-w-6xl px-6">
        <div className={`w-full h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl ${isEven ? 'md:order-2' : 'md:order-1'}`}>
          <img src={feature.imageUrl} alt={feature.title} className="w-full h-full object-cover"/>
        </div>
        <motion.div style={{ y }} className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
          <p className="text-8xl md:text-9xl font-bold text-white/10 mb-4">#{feature.rank}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{feature.title}</h3>
          <p className="text-lg text-white/80 leading-relaxed">{feature.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function ExclusiveFeaturesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} className="bg-brand-dark relative">
      <div className="section-container text-center py-16 lg:py-24">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Our Top 6 Features
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }} className="text-lg mt-4 max-w-3xl mx-auto text-white/80">
          You won’t find these combined anywhere else. This is the Rihla difference.
        </motion.p>
      </div>
      <div className="hidden md:block h-[600vh] relative">
        {features.map((feature, i) => (
          <FeatureCard key={feature.rank} feature={feature} index={i} total={features.length} scrollYProgress={scrollYProgress}/>
        ))}
      </div>
      <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-10">
        {features.map((feature) => (
          <motion.div key={feature.rank} whileTap={{ scale: 0.97 }} className="snap-center flex-shrink-0 w-80 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <img src={feature.imageUrl} alt={feature.title} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <span className="block text-brand-primary font-bold text-lg mb-2">#{feature.rank}</span>
              <h3 className="text-xl text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/80 text-sm">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}