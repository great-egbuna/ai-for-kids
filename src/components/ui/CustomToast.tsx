"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export const CyberpunkToast = ({
  message,
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => Math.max(prev - 100 / (duration / 50), 0));
    }, 50);

    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] border-2 border-cyan-400/50 p-4 rounded-lg shadow-2xl shadow-cyan-400/20">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-cyan-400 font-medium text-sm md:text-base">
                {message}
              </p>
              <div className="mt-2 h-1 bg-cyan-400/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-pink-500 transition-all duration-50"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-cyan-400/10 transition-colors group"
            >
              <FiX className="w-5 h-5 text-cyan-400 group-hover:text-pink-400 transition-colors" />
            </button>
          </div>
          <div className="absolute inset-0 rounded-lg border border-cyan-400/20 pointer-events-none" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
