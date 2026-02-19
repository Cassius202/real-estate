import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import App from "./App";
import logo from './assets/images/logo_amber.png';

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
              className="size-35 drop-shadow-[0_0_24px_rgba(201,169,110,0.2)]"
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

export default Loader;