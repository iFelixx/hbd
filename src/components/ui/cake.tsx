"use client";

import React, { useState, useEffect } from "react";
import { Star, Heart, Sparkles, Gift } from "lucide-react";

export default function Cake() {
  const [currentStep, setCurrentStep] = useState(1);
  const [floatPositions, setFloatPositions] = useState<
    { left: string; top: string; delay: string; duration: string; type: number }[]
  >([]);

  useEffect(() => {
    const positions = Array.from({ length: 12 }).map((_, i) => {
      const left = `${Math.round((Math.random() * 100 - 20) * 100) / 100}%`;
      const top = `${Math.round((Math.random() * 100 - 20) * 100) / 100}%`;
      const delay = `${(Math.random() * 2).toFixed(1)}s`;
      const duration = `${(Math.random() * 2 + 2).toFixed(1)}s`;
      return { left, top, delay, duration, type: i % 4 };
    });
    setFloatPositions(positions);
  }, []);

  return (
    <div className="flex items-center justify-center relative sm:h-screen">
      <div className="relative">
        <div
          className={`transform transition-all duration-1000 ${
            currentStep >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {/* Base Layer */}
          <div className="relative">
            {/* Bottom Tier */}
            <div
              className="w-36 h-16 rounded-lg relative shadow-2xl"
              style={{
                background: "linear-gradient(45deg, #fbbf24, #f59e0b, #d97706)",
                boxShadow:
                  "0 10px 30px rgba(217, 119, 6, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)",
              }}
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-pink-300 rounded-full opacity-70 animate-pulse"
                  style={{
                    left: `${15 + i * 10}%`,
                    top: "10%",
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
              {[...Array(6)].map((_, i) => (
                <Star
                  key={i}
                  className="absolute text-yellow-100 opacity-60"
                  size={8}
                  style={{
                    left: `${20 + i * 12}%`,
                    bottom: "15%",
                    animation: `twinkle ${2 + i * 0.3}s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </div>

            {/* Middle Tier */}
            <div
              className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 w-28 h-12 rounded-lg shadow-xl"
              style={{
                background: "linear-gradient(45deg, #fbcfe8, #f9a8d4, #ec4899)",
                boxShadow:
                  "0 8px 25px rgba(236, 72, 153, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)",
              }}
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-80 animate-bounce"
                  style={{
                    left: `${-20 + Math.cos((i * 30 * Math.PI) / 180) * 120 + 50}%`,
                    top: `${-20 + Math.sin((i * 30 * Math.PI) / 180) * 80 + 50}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
              {[...Array(4)].map((_, i) => (
                <Heart
                  key={i}
                  className="absolute text-red-300 opacity-70"
                  size={6}
                  style={{
                    left: `${25 + i * 15}%`,
                    bottom: "10%",
                    animation: `twinkle ${1.5 + i * 0.2}s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </div>

            {/* Top Tier */}
            <div
              className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-20 h-10 rounded-lg shadow-lg"
              style={{
                background: "linear-gradient(45deg, #e9d5ff, #c4b5fd, #8b5cf6)",
                boxShadow:
                  "0 6px 20px rgba(139, 92, 246, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)",
              }}
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-90 animate-pulse"
                  style={{
                    left: `${30 + i * 20}%`,
                    top: "25%",
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              ))}
              <Sparkles
                className="absolute text-yellow-300 opacity-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                size={12}
              />
            </div>
          </div>

          {/* Candles */}
          <div className="absolute -top-[52px] left-1/2 transform -translate-x-1/2 flex gap-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="relative"
                style={{
                  transform: `translateX(${(i - 2) * 14}px)`,
                  zIndex: 10,
                }}
              >
                <div
                  className="w-1 h-10 rounded-sm shadow-lg"
                  style={{
                    background: `linear-gradient(to bottom, 
                      ${["#ea580c", "#ca8a04", "#16a34a", "#2563eb", "#7c3aed"][i]}, 
                      ${["#c2410c", "#a16207", "#15803d", "#1d4ed8", "#5b21b6"][i]})`,
                  }}
                />
                <div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-3 h-5 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    background: "linear-gradient(to top, orange, yellow, white)",
                    boxShadow:
                      "0 0 15px rgba(255, 193, 7, 0.8), 0 0 25px rgba(255, 193, 7, 0.5), 0 0 35px rgba(255, 193, 7, 0.3)",
                    filter: "blur(0.5px)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Floating decorations */}
          {floatPositions.map((pos, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${-20 + Math.cos((i * 30 * Math.PI) / 180) * 120 + 50}%`,
                top: `${-20 + Math.sin((i * 30 * Math.PI) / 180) * 80 + 50}%`,
                animationDelay: pos.delay,
                animationDuration: pos.duration,
              }}
            >
              {pos.type === 0 && <Star className="text-yellow-300 opacity-60" size={12} />}
              {pos.type === 1 && <Heart className="text-pink-300 opacity-60" size={10} />}
              {pos.type === 2 && <Sparkles className="text-purple-300 opacity-60" size={8} />}
              {pos.type === 3 && <Gift className="text-blue-300 opacity-60" size={10} />}
            </div>
          ))}

          {/* Plate */}
          <div
            className="absolute top-16 left-1/2 transform -translate-x-1/2 w-44 h-3 rounded-full opacity-80 shadow-2xl"
            style={{
              background: "linear-gradient(45deg, #e2e8f0, #f8fafc, #e2e8f0)",
              boxShadow:
                "0 8px 30px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.8)",
            }}
          />
        </div>

        {/* Glows */}
        <div
          className="absolute inset-0 bg-yellow-400/15 rounded-full blur-3xl transition-all duration-1000"
          style={{ transform: "scale(4)", opacity: currentStep >= 1 ? 1 : 0 }}
        />
        <div
          className="absolute inset-0 bg-pink-400/10 rounded-full blur-2xl transition-all duration-1000"
          style={{ transform: "scale(3)", opacity: currentStep >= 1 ? 1 : 0 }}
        />
        <div
          className="absolute inset-0 bg-purple-400/10 rounded-full blur-xl transition-all duration-1000"
          style={{ transform: "scale(2)", opacity: currentStep >= 1 ? 1 : 0 }}
        />
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          100% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}