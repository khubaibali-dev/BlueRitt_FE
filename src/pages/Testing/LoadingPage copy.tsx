import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

/* ─── Wave ring math ─────────────────────────────────── */
const SIZE = 440;
const CX = SIZE / 2;
const CY = SIZE / 2;
const BASE_R = 170;   // circle radius

const LoadingPage: React.FC = () => {
  const [percentage, setPercentage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setPercentage((p) => {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(() => setIsComplete(true), 600);
          return 100;
        }
        return p + 1;
      });
    }, 40);
    return () => clearInterval(id);
  }, []);

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
      className="fixed inset-0 flex items-center justify-center z-[9999] overflow-hidden"
      style={{ background: "#020308" }}
    >
      <style>{`
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

        /* ── Tiny bright dots on the ring orbit ── */
        .dot-glow {
            box-shadow: 0 0 10px 4px rgba(100,150,255,0.7), 0 0 20px 8px rgba(50,80,255,0.4);
        }
        
      `}</style>

      <div style={{ position: "relative", width: SIZE, height: SIZE }}>

        {/* ── Ambient background glow (Very subtle, very dark blue) ── */}
        <div style={{
          position: "absolute",
          inset: -100,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(10,20,80,0.15) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        {/* ── 3-D Orb ── */}
        {/* The orb in the video is a very deep, vibrant blue to dark purple, with swirling lighter blue highlights */}
        <div style={{
          position: "absolute",
          left: "50%", top: "50%",
          width: isComplete ? 100 : 280,
          height: isComplete ? 100 : 280,
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          transition: isComplete ? "width .8s ease, height .8s ease" : undefined,
          animation: isComplete ? undefined : "orb-morph 12s ease-in-out infinite",
          background: `
            radial-gradient(ellipse at 35% 25%, rgba(60, 100, 255, 0.4) 0%, transparent 55%),
            radial-gradient(ellipse at 75% 80%, rgba(120, 40, 255, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, #0c15d4 0%, #060b8c 45%, #010217 100%)
          `,
          boxShadow: `
            0 0 80px rgba(15, 30, 200, 0.5),
            0 0 150px rgba(15, 30, 200, 0.2),
            inset 0 0 40px rgba(80, 120, 255, 0.2)
          `,
        }}>
          {/* Intense dark shadow on one side to give deep 3D curve effect */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "inherit",
            background: "radial-gradient(ellipse at 80% 70%, rgba(0,0,0,0.8) 0%, transparent 75%)",
          }} />
          <div style={{
            position: "absolute", inset: 0, borderRadius: "inherit",
            background: "radial-gradient(ellipse at 10% 90%, rgba(0,0,0,0.5) 0%, transparent 50%)",
          }} />
        </div>

        {/* ── SVG: Wave ring outline (full circle, rotating) ── */}
        {/* The video wave is very fine and stringy.  Two turbulent strokes rotating in opposite directions create the tangled wire look. */}
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
              stroke="rgba(80,140,255,0.4)"
              strokeWidth={1}
              filter="url(#wave-outline-1)"
            />
          </svg>
        </div>
        <div style={{ position: "absolute", inset: 0, overflow: "visible", animation: "spin-wave-fast 25s linear infinite" }}>
          <svg width={SIZE} height={SIZE} style={{ overflow: "visible" }}>
            <defs>
              <filter id="wave-outline-2" x="-30%" y="-30%" width="160%" height="160%">
                <feTurbulence type="turbulence" baseFrequency="0.015 0.025" numOctaves="3" seed="5" result="turb" />
                <feDisplacementMap in="SourceGraphic" in2="turb" scale="20" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              </filter>
            </defs>
            <circle
              cx={CX} cy={CY} r={BASE_R - 5}
              fill="none"
              stroke="rgba(100,160,255,0.2)"
              strokeWidth={2}
              filter="url(#wave-outline-2)"
            />
          </svg>
        </div>


        {/* ── SVG: Progress Arc + Solid Track (Non-rotating) ── */}
        <svg
          width={SIZE} height={SIZE}
          style={{ position: "absolute", inset: 0, overflow: "visible" }}
        >
          <defs>
            {/* Neon glow filter */}
            <filter id="glow-progress" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur1" />
              <feGaussianBlur stdDeviation="1.5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Full solid track ring (dim line to guide dots) */}
          <circle
            cx={CX} cy={CY} r={BASE_R}
            fill="none"
            stroke="rgba(40,60,180,0.15)"
            strokeWidth={1}
          />

          {/* 2. Progress arc — bright neon core line, perfectly circular */}
          {/* Outer diffuse glow */}
          <circle
            cx={CX} cy={CY} r={BASE_R}
            fill="none"
            stroke="rgba(80,120,255,0.7)"
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${CX} ${CY})`}
            filter="url(#glow-progress)"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
          {/* Inner sharp bright line */}
          <circle
            cx={CX} cy={CY} r={BASE_R}
            fill="none"
            stroke="rgba(220,240,255,1)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${CX} ${CY})`}
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />

          {/* 5. Start dot (top, 12-o'clock) */}
          {percentage > 0 && (
            <circle cx={startDotX} cy={startDotY} r={3.5} fill="#fff" className="dot-glow" />
          )}

          {/* 6. End dot (travels clockwise with progress) */}
          {percentage > 2 && percentage <= 100 && (
            <circle cx={endDotX} cy={endDotY} r={3.5} fill="#fff" className="dot-glow" style={{ transition: "cx 0.1s linear, cy 0.1s linear" }} />
          )}
        </svg>

        {/* ── Text or checkmark ── */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", zIndex: 10,
        }}>
          {!isComplete ? (
            <div style={{ animation: "breathe 3s ease-in-out infinite" }}>
              <p style={{
                color: "rgba(160,190,255,0.6)", fontSize: 13,
                fontWeight: 400, lineHeight: 1.55, marginBottom: 8,
                letterSpacing: "0.03em",
                fontFamily: "Inter, sans-serif"
              }}>
                Learning how<br />to make tax returns...
              </p>
              <p style={{
                color: "#e2e8f0", fontSize: 48, fontWeight: 300,
                letterSpacing: "-0.02em", lineHeight: 1,
                fontFamily: "Inter, sans-serif"
              }}>
                {percentage}%
              </p>
            </div>
          ) : (
            <div style={{ animation: "check-pop 0.5s ease-out 0.7s both" }}>
              <Check
                size={50} color="white" strokeWidth={2.5}
                style={{ filter: "drop-shadow(0 0 14px white) drop-shadow(0 0 28px rgba(100,150,255,.8))" }}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LoadingPage;
