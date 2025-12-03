"use client";

import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 w-[41px] h-[41px]" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5 text-blue-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5 text-orange-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
