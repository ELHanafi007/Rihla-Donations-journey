import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { useThrottledCallback } from 'use-debounce';

// --- Custom Hooks for Clean Logic ---

// Manages body scroll lock when the mobile menu is open
const useLockedBody = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    }
    // On cleanup, reset the overflow style
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLocked]);
};

// --- Rebuilt & Accessible Mobile Link ---
const KineticLink = ({ to, name, onClick }) => {
  const containerVariants = {
    animate: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
  };

  const letterVariants = {
    initial: { y: '100%', opacity: 0 },
    // FIX: Using a valid cubic-bezier value.
    animate: { y: 0, opacity: 1, transition: { ease: [0.6, 0.01, 0.05, 0.95], duration: 1 } },
  };

  return (
    <ScrollLink
      to={to}
      smooth
      duration={800}
      offset={-80}
      onClick={onClick}
      className="cursor-pointer overflow-hidden"
      aria-label={name} // FIX: Ensures screen readers read the link correctly.
    >
      <motion.div
        className="relative text-4xl sm:text-5xl text-gray-300 hover:text-white transition-colors duration-300"
        initial="initial"
        animate="animate"
        variants={containerVariants}
        aria-hidden="true" // FIX: Hides decorative animated letters from screen readers.
      >
        {name.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            className="inline-block"
            variants={letterVariants}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    </ScrollLink>
  );
};

// --- Final Navbar Component ---
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');

  useLockedBody(isOpen);

  // FIX: Throttled scroll handler for better performance.
  const handleScroll = useThrottledCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const navLinks = [
    { name: 'About', to: 'about-me' },
    { name: 'Vision', to: 'solution' },
    { name: 'Features', to: 'features' },
    { name: 'Contact', to: 'contact' },
  ];

  // A single source of truth for the scroll offset.
  const SCROLL_OFFSET = -100;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-center">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          // FIX: Using a valid cubic-bezier value.
          transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
          className="w-full max-w-6xl px-4 sm:px-6"
        >
          <motion.div
            animate={{
              y: isScrolled ? 0 : 16,
              scale: isScrolled ? 1 : 0.98,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="h-16 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl flex items-center justify-between px-5"
          >
            <ScrollLink
              to="hero"
              smooth
              duration={800}
              onSetActive={() => setActiveLink('hero')}
              className="font-display text-2xl font-bold text-white cursor-pointer"
              aria-label="Go to top of page"
            >
              Rihla
            </ScrollLink>

            {/* UPGRADE: Modern "pill" style for active link indicator. */}
            <nav className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-full">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.to}
                  to={link.to}
                  spy
                  smooth
                  duration={800}
                  offset={SCROLL_OFFSET}
                  onSetActive={() => setActiveLink(link.to)}
                  className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer px-4 py-2 rounded-full"
                >
                  {link.name}
                  {activeLink === link.to && (
                    <motion.div
                      className="absolute inset-0 bg-white/10 rounded-full"
                      layoutId="active-pill"
                      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    />
                  )}
                </ScrollLink>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <ScrollLink
                to="donation"
                smooth
                duration={800}
                offset={SCROLL_OFFSET}
                className="hidden lg:block bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold py-2.5 px-6 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                Donate
              </ScrollLink>

              {/* UPGRADE: Cleaner, more robust hamburger animation */}
              <div className="md:hidden">
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative h-8 w-8 text-white z-50"
                  aria-label="Open menu"
                  aria-expanded={isOpen}
                >
                  <motion.span
                    className="absolute h-0.5 w-6 bg-current"
                    animate={{
                      y: isOpen ? '0em' : '-0.4em',
                      rotate: isOpen ? 45 : 0,
                    }}
                    style={{ y: '-0.4em', left: '50%', x: '-50%', top: '50%' }}
                  />
                  <motion.span
                    className="absolute h-0.5 w-6 bg-current"
                    animate={{
                      y: isOpen ? '0em' : '0.4em',
                      rotate: isOpen ? -45 : 0,
                    }}
                    style={{ y: '0.4em', left: '50%', x: '-50%', top: '50%' }}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* UPGRADE: Jaw-dropping "iris wipe" mobile menu transition. */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-black"
            initial={{ clipPath: 'circle(24px at calc(100% - 32px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 32px) 40px)' }}
            exit={{ clipPath: 'circle(24px at calc(100% - 32px) 40px)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center space-y-8">
              {[...navLinks, { name: 'Donate Now', to: 'donation' }].map((link) => (
                <KineticLink key={link.to} to={link.to} name={link.name} onClick={() => setIsOpen(false)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}