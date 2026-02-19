import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { assets } from "./assets/assets";
import { useThemeStore } from "./stores/useThemeStore";
import App from "./App";

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const { isDark } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

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
          className="fixed inset-0 z-100 grid place-content-center bg-white dark:bg-neutral-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Subtle radial glow behind logo */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background: isDark
                ? "radial-gradient(ellipse 40% 30% at 50% 50%, rgba(22,163,74,0.08) 0%, transparent 70%)"
                : "radial-gradient(ellipse 40% 30% at 50% 50%, rgba(22,163,74,0.06) 0%, transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-center gap-y-5 animate-[loaderIn_0.5s_ease-out_both]">
            {/* Logo */}
            <div className="size-16 drop-shadow-sm">
              <img
                src={!isDark ? assets.logoLight : assets.logoDark}
                alt="JoJean Consults logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Brand name */}
            <p className="font-semibold tracking-wide text-lg text-neutral-800 dark:text-neutral-100">
              JoJean Consults
            </p>

            {/* Loading bar */}
            <div className="w-32 h-[2px] rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
              <div className="h-full bg-green-600 rounded-full animate-[loadBar_2.2s_ease-in-out_forwards]" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;