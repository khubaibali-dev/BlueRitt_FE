import React, { useState, useEffect, useRef, useCallback } from "react";
import { Check } from "lucide-react";

/* ─── Wave ring math ─────────────────────────────────── */
const SIZE = 360;
const CX = SIZE / 2;
const CY = SIZE / 2;
const BASE_R = 120;   // further reduced radius for embedding

interface LoadingPageProps {
  isLoading?: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ isLoading = true }) => {
  const [percentage, setPercentage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startProgressTimer = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setPercentage((prev) => {
          if (prev >= 100) return 100; // Cap at 100%
          if (prev >= 90) return prev + 5;
          return prev + 10;
        });
      }, 2000); // every 5 seconds as requested
    }
  }, []);

  const stopProgressTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      startProgressTimer();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      // API call finished: complete to 100% immediately
      setPercentage(100);
      const timeout = setTimeout(() => {
        setIsComplete(true);
      }, 600);
      return () => clearTimeout(timeout);
    }

    return () => {
      stopProgressTimer(); // Cleanup on unmount
    };
  }, [isLoading, startProgressTimer, stopProgressTimer]);

  const progress = percentage / 100;
  const CIRCUMFERENCE = 2 * Math.PI * BASE_R;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  // End dot position follows the circle, not the wave
  const endAngleDeg = progress * 360 - 90;
  const endAngleRad = (endAngleDeg * Math.PI) / 180;
  const endDotX = CX + BASE_R * Math.cos(endAngleRad);
  const endDotY = CY + BASE_R * Math.sin(endAngleRad);

  const startDotX = CX;
  const startDotY = CY - BASE_R;

  return (
    <div
      className="flex flex-col items-center justify-center overflow-hidden w-full"
    >
      <style>{`
        :root {
          /* White Mode: Warm "Sunlight Glass" palette - ZERO BLUE */
          --loader-orb-main: #ffffff;
          --loader-orb-deep: #ffeadb;
          --loader-orb-edge: #fdf2f0;
          --loader-orb-highlight: rgba(255, 255, 255, 0.9);
          --loader-orb-accent: rgba(255, 150, 120, 0.15);
          --loader-text-primary: #334155;
          --loader-text-secondary: #64748b;
          --loader-glow: rgba(255, 180, 160, 0.15);
          --loader-glow-intense: rgba(255, 150, 120, 0.25);
          --loader-track: rgba(255, 150, 120, 0.1);
          --loader-ring-core: #ff9e7d; /* Warm Peach/Coral Core */
          --loader-dot: #ff9e7d;
          --loader-orb-shadow: radial-gradient(ellipse at 80% 70%, rgba(200, 150, 120, 0.12) 0%, transparent 75%);
          --loader-backdrop: blur(10px);
        }

        .dark :root, .dark {
          /* Dark Mode: Premium deep blue/nebula palette */
          --loader-orb-main: #0c15d4;
          --loader-orb-deep: #060b8c;
          --loader-orb-edge: #010217;
          --loader-orb-highlight: rgba(60, 100, 255, 0.4);
          --loader-orb-accent: rgba(120, 40, 255, 0.25);
          --loader-text-primary: #e2e8f0;
          --loader-text-secondary: rgba(160,190,255,0.6);
          --loader-glow: rgba(100,160,255,0.2);
          --loader-glow-intense: rgba(100,160,255,0.3);
          --loader-track: rgba(40,60,180,0.15);
          --loader-ring-core: #dcf2ff;
          --loader-dot: #fff;
          --loader-orb-shadow: radial-gradient(ellipse at 80% 70%, rgba(0,0,0,0.8) 0%, transparent 75%);
          --loader-backdrop: none;
        }

        @keyframes orb-morph {
          0%,100% { border-radius: 58% 42% 62% 38% / 52% 56% 44% 48%; }
          25%      { border-radius: 44% 56% 48% 52% / 60% 42% 58% 40%; }
          50%      { border-radius: 62% 38% 44% 56% / 44% 60% 40% 56%; }
          75%      { border-radius: 48% 52% 58% 42% / 56% 44% 56% 44%; }
        }
        @keyframes breathe {
          0%,100% { opacity: .65; }
          50%      { opacity: 1;   }
        }
        @keyframes check-pop {
          from { opacity: 0; transform: scale(.3); }
          to   { opacity: 1; transform: scale(1);  }
        }
        @keyframes spin-wave-slow {
           100% { transform: rotate(360deg); }
        }
         @keyframes spin-wave-fast {
           100% { transform: rotate(-360deg); }
        }

        .dot-glow {
            box-shadow: 0 0 10px 4px var(--loader-glow-intense);
        }
      `}</style>

      {/* Header Section */}
      <div className="text-center flex flex-col items-center w-full max-w-[600px] mb-8 animate-in fade-in duration-700">
        <h3 className="text-brand-textPrimary text-xl font-bold mb-2 tracking-tight">
          Analyzing Product, Discovering Verified Suppliers and Computing AI Match Score....
        </h3>
        <p className="dark:text-white italic text-sm">
          The process may take up to 30-45 seconds. Please wait while we generate the results
        </p>
      </div>

      <div style={{ position: "relative", width: SIZE, height: SIZE }}>

        {/* ── Ambient background glow (Very subtle) ── */}
        <div style={{
          position: "absolute",
          inset: -100,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--loader-glow) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        {/* ── 3-D Orb ── */}
        <div style={{
          position: "absolute",
          left: "50%", top: "50%",
          width: isComplete ? 80 : 220,
          height: isComplete ? 80 : 220,
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          transition: isComplete ? "width .8s ease, height .8s ease" : undefined,
          animation: isComplete ? undefined : "orb-morph 12s ease-in-out infinite",
          backdropFilter: "var(--loader-backdrop)",
          WebkitBackdropFilter: "var(--loader-backdrop)",
          background: `
            radial-gradient(ellipse at 35% 25%, var(--loader-orb-highlight) 0%, transparent 55%),
            radial-gradient(ellipse at 75% 80%, var(--loader-orb-accent) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, var(--loader-orb-main) 0%, var(--loader-orb-deep) 45%, var(--loader-orb-edge) 100%)
          `,
          boxShadow: `
            0 0 80px var(--loader-glow),
            0 0 150px var(--loader-glow),
            inset 0 0 40px rgba(255, 255, 255, 0.1)
          `,
        }}>
          {/* Intense dark shadow on one side to give deep 3D curve effect */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "inherit",
            background: "var(--loader-orb-shadow)",
          }} />
          <div style={{
            position: "absolute", inset: 0, borderRadius: "inherit",
            background: "radial-gradient(ellipse at 10% 90%, rgba(0,0,0,0.1) 0%, transparent 50%)",
          }} />
        </div>

        {/* ── SVG: Wave ring outline (Rotating) ── */}
        <div style={{ position: "absolute", inset: 0, overflow: "visible", animation: "spin-wave-slow 35s linear infinite" }}>
          <svg width={SIZE} height={SIZE} style={{ overflow: "visible" }}>
            <defs>
              <filter id="wave-outline-1" x="-30%" y="-30%" width="160%" height="160%">
                <feTurbulence type="turbulence" baseFrequency="0.02 0.03" numOctaves="4" seed="1" result="turb" />
                <feDisplacementMap in="SourceGraphic" in2="turb" scale="25" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              </filter>
            </defs>
            <circle
              cx={CX} cy={CY} r={BASE_R + 5}
              fill="none"
              stroke="var(--loader-glow-intense)"
              strokeWidth={1}
              filter="url(#wave-outline-1)"
            />
          </svg>
        </div>

        {/* ── SVG: Progress Ring ── */}
        <svg
          width={SIZE} height={SIZE}
          style={{ position: "absolute", inset: 0, overflow: "visible" }}
        >
          <defs>
            <filter id="glow-progress" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur1" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Track */}
          <circle
            cx={CX} cy={CY} r={BASE_R}
            fill="none"
            stroke="var(--loader-track)"
            strokeWidth={1}
          />

          {/* Progress Bloom */}
          <circle
            cx={CX} cy={CY} r={BASE_R}
            fill="none"
            stroke="var(--loader-glow-intense)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${CX} ${CY})`}
            filter="url(#glow-progress)"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
          {/* Core Line */}
          <circle
            cx={CX} cy={CY} r={BASE_R}
            fill="none"
            stroke="var(--loader-ring-core)"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${CX} ${CY})`}
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />

          {/* Dots */}
          {percentage > 0 && (
            <circle cx={startDotX} cy={startDotY} r={3} fill="var(--loader-dot)" className="dot-glow" />
          )}

          {percentage > 2 && percentage <= 100 && (
            <circle cx={endDotX} cy={endDotY} r={3} fill="var(--loader-dot)" className="dot-glow" style={{ transition: "cx 0.1s linear, cy 0.1s linear" }} />
          )}
        </svg>

        {/* ── Texts ── */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", zIndex: 10,
        }}>
          {!isComplete ? (
            <div>
              <p style={{
                color: "var(--loader-text-primary)", fontSize: 48, fontWeight: 300,
                letterSpacing: "-0.02em", lineHeight: 1,
                fontFamily: "Inter, sans-serif",
              }}>
                {percentage}%
              </p>
            </div>
          ) : (
            <div style={{ animation: "check-pop 0.5s ease-out 0.7s both" }}>
              <Check
                size={50} color="var(--loader-ring-core)" strokeWidth={2.5}
                style={{ filter: "drop-shadow(0 0 10px var(--loader-glow-intense))" }}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LoadingPage;
