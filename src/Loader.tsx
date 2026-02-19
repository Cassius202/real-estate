import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "motion/react";
import App from "./App";
import logo from './assets/images/logo_amber.png';

/* ─── LOADER COMPONENT ──────────────────────────────── */
const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(loadTimer);
  }, []);

  if (!loading) return <App />;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] grid place-content-center bg-[#080808]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,169,110,0.07) 0%, transparent 70%)",
            }}
          />

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Sans:wght@400;600&display=swap');
            @keyframes loaderIn {
              from { opacity: 0; transform: translateY(12px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes loadBar {
              from { width: 0%; }
              to   { width: 100%; }
            }
          `}</style>

          <div className="relative flex flex-col items-center gap-y-6"
            style={{ animation: "loaderIn 0.6s ease-out both" }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-32 h-32 md:w-35 md:h-35 drop-shadow-[0_0_24px_rgba(201,169,110,0.2)]"
            >
              <img
                src={logo}
                alt="Askariot Homes logo"
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Brand name */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="font-semibold tracking-[0.12em] text-xl text-white"
            >
              Askariot Homes{" "}
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}
                className="text-amber-400/80 font-normal text-base tracking-widest">
                LTD
              </span>
            </motion.p>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="w-36 h-[1.5px] rounded-full bg-white/10 overflow-hidden"
            >
              <div
                className="h-full rounded-full bg-amber-400"
                style={{ animation: "loadBar 2.2s ease-in-out forwards" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─── UPDATED NOW SELLING BAR (MOBILE FIXED) ────────── */
const TOP_BAR_HEIGHT = 45;

export function NowSellingBar() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, TOP_BAR_HEIGHT], [0, -TOP_BAR_HEIGHT]);
  const opacity = useTransform(scrollY, [0, TOP_BAR_HEIGHT], [1, 0]);

  return (
    <motion.div
      style={{ y, opacity, height: "auto", minHeight: TOP_BAR_HEIGHT }}
      className="fixed top-0 left-0 right-0 z-[60] bg-amber-600 text-white flex flex-row items-center justify-between px-4 md:px-12 lg:px-20 py-2 md:py-0 overflow-hidden"
    >
      <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
        {/* Pulsing Dot */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        
        <div className="text-[0.6rem] md:text-[0.75rem] font-bold tracking-wider uppercase flex items-center gap-1.5 md:gap-2 truncate">
          <span className="bg-slate-900/20 p-1 px-2 md:px-3 rounded-full text-[0.55rem] md:text-[0.7rem] shrink-0">
            Now Selling
          </span> 
          <span className="font-medium normal-case opacity-90 truncate">
            Close Range Estate, Wuse II, Abuja
          </span>
        </div>
      </div>

      <a 
        href="#project" 
        className="text-[0.55rem] md:text-[0.7rem] font-bold uppercase tracking-tighter border-b border-white/40 hover:border-white transition-colors no-underline ml-4 shrink-0 whitespace-nowrap"
      >
        Learn More
      </a>
    </motion.div>
  );
}

export default Loader;