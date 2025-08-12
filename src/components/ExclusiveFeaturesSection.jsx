import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Images (assuming these imports are correct in your project structure)
import rank1 from "/photos/rank1.jpeg";
import rank2 from "/photos/rank2.jpeg";
import rank3 from "/photos/rank3.jpeg";
import rank4 from "/photos/rank4.jpeg";
import rank5 from "/photos/rank5.jpeg";
import rank6 from "/photos/rank6.jpeg";

const features = [
  {
    rank: 6,
    title: "Rihla Comfort+ Tier",
    description:
      "Luxury on the go. Ride in premium cars with extra legroom, curated playlists, and complimentary bottled water — driven by top-rated, hospitality-trained professionals.",
    imageUrl: rank6,
  },
  {
    rank: 5,
    title: "Rihla for Her",
    description:
      "Your comfort, your choice. Female passengers can opt for female drivers, backed by extra safety checks, live trip support, and quick 24/7 availability.",
    imageUrl: rank5,
  },
  {
    rank: 4,
    title: 'The "Triple-Check" Shield',
    description:
      "Every driver is vetted with deep background checks, live monitoring, and vehicle inspections before each ride — so every journey starts with trust.",
    imageUrl: rank4,
  },
  {
    rank: 3,
    title: "Rihla Guardian™",
    description:
      "Share live ride tracking with friends or family — no app needed. Get alerts for unexpected stops and instant emergency contacts at the ready.",
    imageUrl: rank3,
  },
  {
    rank: 2,
    title: "Live Language Translation",
    description:
      "Chat freely with your driver — our in-app messenger instantly translates 50+ languages with industry-leading accuracy.",
    imageUrl: rank2,
  },
  {
    rank: 1,
    title: "The Digital Handshake™",
    description:
      "Scan your driver’s plate before boarding to confirm identity, car, and booking. Security that’s simple, fast, and mistake-proof.",
    imageUrl: rank1,
  },
];

const cardVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.96,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.96,
  }),
};

// MobileFeatureCard remains unchanged, its appearance is fixed by its container
const MobileFeatureCard = ({ feature, onDragRequest }) => {
  const handleDragEnd = (event, info) => {
    const { offset, velocity } = info;
    if (offset.x < -80 || velocity.x < -500) {
      onDragRequest("next");
    } else if (offset.x > 80 || velocity.x > 500) {
      onDragRequest("prev");
    }
  };

  return (
    <motion.div
      drag="x"
      dragElastic={0.25}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 0.995 }}
      dragConstraints={{ left: 0, right: 0 }}
      className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
    >
      {/* Background Image - fills the entire card */}
      <motion.img
        src={feature.imageUrl}
        alt={feature.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Text Content positioned at the bottom */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
        <span className="absolute top-6 left-6 text-white font-extrabold text-3xl opacity-50 select-none">
          #{feature.rank}
        </span>
        <h3 className="text-2xl lg:text-3xl font-bold mb-2 drop-shadow-md">{feature.title}</h3>
        <p className="text-base lg:text-lg text-white/90 leading-relaxed drop-shadow-sm">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};


export default function ExclusiveFeaturesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const subtleY = useTransform(scrollYProgress, [0, 1], ["0px", "20px"]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoplayDelayMs = 6000;
  const autoplayRef = useRef(null);
  const userInteractedRef = useRef(false);
  const itemCount = features.length;

  const wrapIndex = useCallback((i) => ((i % itemCount) + itemCount) % itemCount, [itemCount]);
  const paginate = (newIndex, dir = 1) => {
    setDirection(dir);
    setCurrentIndex(wrapIndex(newIndex));
  };
  const next = useCallback(() => paginate(currentIndex + 1, 1), [currentIndex, paginate]);
  const prev = useCallback(() => paginate(currentIndex - 1, -1), [currentIndex, paginate]);

  const handleDragRequest = (which) => {
    userInteractedRef.current = true;
    which === "next" ? next() : prev();
  };
  const handleArrowClick = (dir) => {
    userInteractedRef.current = true;
    dir === "next" ? next() : prev();
  };

  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!userInteractedRef.current) {
        paginate(currentIndex + 1, 1);
      } else {
        userInteractedRef.current = false;
      }
    }, autoplayDelayMs);
    return () => clearInterval(autoplayRef.current);
  }, [currentIndex, paginate]);

  return (
    <section ref={ref} className="bg-gradient-to-b from-brand-dark to-black relative overflow-hidden">
      <div className="section-container text-center py-16 lg:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-lg"
        >
          Our Top 6 Features
        </motion.h2>
        <motion.p
          style={{ y: subtleY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg mt-4 max-w-3xl mx-auto text-white/80"
        >
          Innovation, safety, and comfort — all in one ride.
        </motion.p>
      </div>

      {/* Desktop Sticky */}
      <div className="hidden md:block h-[600vh] relative">
        {features.map((feature, i) => {
          const start = i / features.length;
          const end = start + 1 / features.length;
          const opacity = useTransform(scrollYProgress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0]);
          const scale = useTransform(scrollYProgress, [start, start + 0.08], [0.95, 1]);
          const y = useTransform(scrollYProgress, [start, end], ["40px", "-40px"]);
          const isEven = i % 2 === 0;
          return (
            <motion.div key={feature.rank} style={{ opacity, scale }} className="min-h-screen flex items-center justify-center sticky top-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center w-full max-w-6xl px-6">
                <div className={`w-full h-[500px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                  <motion.img
                    src={feature.imageUrl}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <motion.div style={{ y }} className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
                  <p className="text-7xl md:text-8xl font-bold text-white/10 mb-4 select-none">#{feature.rank}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-lg text-white/80 leading-relaxed max-w-xl">{feature.description}</p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Carousel - UPDATED */}
      <div className="md:hidden h-[70vh] max-h-[800px] relative px-4">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={features[currentIndex].rank}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-4 z-10" // Added small inset for better visuals
          >
            <MobileFeatureCard feature={features[currentIndex]} onDragRequest={handleDragRequest} />
          </motion.div>
        </AnimatePresence>

        {/* Arrows - UPDATED */}
        <div className="absolute inset-y-0 inset-x-0 flex items-center justify-between px-2 z-20 pointer-events-none">
          {["prev", "next"].map((dir, idx) => (
            <motion.button
              key={dir}
              onClick={() => handleArrowClick(dir)}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.1, boxShadow: "0 0 12px rgba(255,255,255,0.6)" }}
              transition={{ type: "spring", stiffness: 400 }}
              className="pointer-events-auto bg-black/40 text-white rounded-full p-3 backdrop-blur-md"
            >
              {idx === 0 ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
            </motion.button>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-2 z-30">
          {features.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => {
                  userInteractedRef.current = true;
                  paginate(idx, idx > currentIndex ? 1 : -1);
                }}
                className="relative focus:outline-none"
              >
                <motion.div
                  initial={false}
                  animate={isActive ? { width: 40 } : { width: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className="h-2 rounded-full bg-white/20 overflow-hidden"
                >
                  <motion.div
                    key={isActive ? `active-${currentIndex}` : `idle-${idx}`}
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? "100%" : 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="h-full bg-white"
                  />
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}