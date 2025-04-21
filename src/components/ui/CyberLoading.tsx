"use client";

import { useEffect, useState } from "react";

export default function CyberpunkLoader() {
  const [particles, setParticles] = useState<
    Array<{ left: number; top: number }>
  >([]);

  useEffect(() => {
    // Generate particles client-side after mount
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center min-h-screen p-4">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20 bg-repeat"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00ffff33 1px, transparent 1px),
            linear-gradient(to bottom, #00ffff33 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main loader */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Spinner */}
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 border-4 border-cyan-400 rounded-full animate-spin">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_20px_#00ffff]"></div>
          </div>
          <div className="absolute inset-0 border-4 border-pink-500 rounded-full animate-spin-reverse">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_20px_#ff00ff]"></div>
          </div>
          <div className="absolute inset-4 border-4 border-cyan-400 rounded-full animate-pulse"></div>
        </div>

        {/* Text */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 animate-pulse">
            INITIALIZING SYSTEM
          </h2>
          <div className="text-pink-500 font-mono text-base md:text-lg flex items-center justify-center space-x-2">
            <span className="animate-blink">_</span>
            <span className="text-cyan-300">LOADING...</span>
            <span className="animate-blink">_</span>
          </div>
        </div>

        {/* Progress bars */}
        <div className="w-48 md:w-64 h-2 md:h-3 bg-black/50 rounded-full border border-cyan-400 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-pink-500 transition-all duration-500"
            style={{
              width: `${75}%`,
              boxShadow: "0 0 15px #00ffff80",
            }}
          />
        </div>
      </div>

      {/* Floating particles - only render after hydration */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(({ left, top }, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${i * 0.2}s`,
              boxShadow: "0 0 10px #00ffff",
            }}
          />
        ))}
      </div>

      {/* Glitch effect */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmYwMGZmIi8+PC9zdmc+')] animate-glitch"></div>
      </div>
    </div>
  );
}
