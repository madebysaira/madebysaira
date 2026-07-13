import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowDown } from 'lucide-react';
import Aurora from './ui/Aurora';

export default function Hero({ setView }) {
  const containerRef = useRef(null);
  const words = ['AI Video & Image', 'Visual Design', 'AI Automation'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative min-h-[90svh] flex flex-col justify-center items-start px-6 md:px-16 lg:pl-32 xl:pl-40 pt-16 sm:pt-24 pb-24 sm:pb-20 lg:pb-24 overflow-hidden bg-cosmic-void"
    >
      {/* Animated Aurora Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <Aurora 
          colorStops={['#0b0f24', '#1e3a8a', '#3b82f6']} 
          blend={0.5} 
          amplitude={1.0} 
          speed={0.5} 
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cosmic-void z-0 pointer-events-none" />

      <div className="max-w-5xl z-10">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-none bg-white animate-pulse" />
            <span className="text-xs md:text-sm font-mono tracking-widest text-slate-400 uppercase">
              Tripura, India // Operating Globally
            </span>
          </div>
          <span className="hidden sm:inline text-slate-600">//</span>
          <a href="mailto:madebysaira@proton.me" className="text-xs md:text-sm font-mono tracking-widest text-slate-400 uppercase hover:text-white transition-colors flex items-center gap-2">
            <Mail size={14} /> madebysaira@proton.me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-16 lg:mt-24 max-w-4xl"
        >
          <h1 className="text-[1.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-200 leading-[1.15] tracking-tight flex flex-col gap-2">
            <span className="text-xl md:text-3xl lg:text-4xl font-serif italic text-slate-400 font-normal">I am Sagarika Sultana,</span>
            <span>
              <span className="text-white">and I build the </span>
              <span className="font-serif italic font-normal text-slate-400 lowercase">future</span>
              <span className="text-white"> with </span>
            </span>
            <div className="relative inline-grid grid-cols-1 grid-rows-1 h-[38px] sm:h-[60px] md:h-[76px] lg:h-[90px] overflow-hidden align-bottom mt-2 sm:mt-0">
              {/* Invisible dynamic spacer to reserve maximum width and prevent layout collapse/crops */}
              <span className="col-start-1 row-start-1 invisible opacity-0 pointer-events-none select-none text-[1.75rem] sm:text-5xl md:text-6xl lg:text-7xl whitespace-nowrap">
                {words.reduce((a, b) => a.length > b.length ? a : b, '')}
              </span>
              <AnimatePresence>
                <motion.span
                  key={currentWordIndex}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="col-start-1 row-start-1 text-white whitespace-nowrap text-[1.75rem] sm:text-5xl md:text-6xl lg:text-7xl"
                >
                  {words[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>
        </motion.div>

        {/* Short description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-base md:text-lg text-slate-400 max-w-xl font-normal leading-relaxed"
        >
          Think of me as a full production studio in one person. I take a project from the first spark of an idea all the way to the final export, and I look after every step in between. Most days that means building high fashion commercial campaigns that actually look real, or setting up AI content systems that help teams create faster without losing their taste. It is proper art direction, with automation doing the heavy lifting behind it.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-wrap gap-4"
        >
          <button 
            onClick={() => scrollToSection('booking')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') scrollToSection('booking');
            }}
            className="px-6 py-3.5 sharp-button font-mono text-sm tracking-wider uppercase flex items-center justify-center cursor-pointer bg-cosmic-navy text-white border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 focus:outline-none"
          >
            LET'S BUILD TOGETHER
          </button>
          
          <button 
            onClick={() => setView && setView('resume')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setView && setView('resume');
            }}
            className="px-6 py-3.5 sharp-button font-mono text-sm tracking-wider uppercase flex items-center justify-center cursor-pointer border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 focus:outline-none"
          >
            DOWNLOAD RESUME
          </button>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={() => scrollToSection('portfolio')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') scrollToSection('portfolio');
        }}
        role="button"
        tabIndex={0}
        className="absolute bottom-10 left-6 md:left-16 lg:left-32 xl:left-40 hidden sm:flex items-center gap-3 cursor-pointer text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.div>

      {/* Large Decorative Text (Topological Deviation) */}
      <div className="absolute right-0 bottom-0 lg:bottom-1/4 translate-y-12 select-none pointer-events-none opacity-[0.02] text-[12vw] font-serif italic text-white leading-none whitespace-nowrap">
        Cinematic AI
      </div>
    </section>
  );
}
