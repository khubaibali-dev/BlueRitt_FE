import { useEffect, useRef } from "react";

const LAYERS = [
  { a: 24, lf: 4, hf: 13, spd: 0.55, col: [30, 70, 215] as const, op: 0.72, lw: 1.5 },
  { a: 20, lf: 5, hf: 11, spd: -0.42, col: [55, 105, 240] as const, op: 0.58, lw: 1.2 },
  { a: 30, lf: 3, hf: 14, spd: 0.32, col: [25, 55, 200] as const, op: 0.65, lw: 1.8 },
  { a: 15, lf: 6, hf: 16, spd: -0.65, col: [80, 140, 255] as const, op: 0.42, lw: 0.9 },
  { a: 22, lf: 4, hf: 10, spd: 0.72, col: [60, 115, 245] as const, op: 0.48, lw: 1.1 },
  { a: 12, lf: 7, hf: 12, spd: -0.38, col: [100, 165, 255] as const, op: 0.32, lw: 0.7 },
  { a: 26, lf: 3, hf: 15, spd: -0.28, col: [20, 50, 190] as const, op: 0.60, lw: 2.0 },
  { a: 18, lf: 5, hf: 9, spd: 0.85, col: [70, 130, 250] as const, op: 0.38, lw: 0.8 },
];

interface PlasmaLoaderProps {
  line1?: string;
  line2?: string;
  size?: number;
}

export default function PlasmaLoader({
  line1 = "Learning how",
  line2 = "to make tax returns...",
  size = 480,
}: PlasmaLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const cx = size / 2, cy = size / 2;
    const SR = size * 0.308;
    const RR = size * 0.385;
    const brightRad = (200 / 180) * Math.PI;
    let t = 0, prog = 0, rafId: number;

    function drawSphere() {
      for (let i = 0; i < 5; i++) {
        const r = SR + 30 - i * 4;
        const g = ctx.createRadialGradient(cx, cy, SR - 10, cx, cy, r);
        g.addColorStop(0, "rgba(20,40,180,0)");
        g.addColorStop(1, `rgba(30,60,220,${0.06 - i * 0.01})`);
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      }
      const sg = ctx.createRadialGradient(cx - 20, cy - 20, 0, cx, cy, SR);
      sg.addColorStop(0, "#07073c"); sg.addColorStop(0.40, "#09094e");
      sg.addColorStop(0.68, "#0c0c80"); sg.addColorStop(0.82, "#1010b8");
      sg.addColorStop(0.91, "#1520d8"); sg.addColorStop(0.97, "#1a2aea");
      sg.addColorStop(1, "#0d1cc0");
      ctx.beginPath(); ctx.arc(cx, cy, SR, 0, Math.PI * 2);
      ctx.fillStyle = sg; ctx.fill();

      const pa = -Math.PI / 2 + (prog / 100) * Math.PI * 2;
      ctx.save(); ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, SR, pa, Math.PI * 1.5); ctx.closePath();
      ctx.fillStyle = "rgba(0,0,20,0.38)"; ctx.fill(); ctx.restore();

      ctx.beginPath(); ctx.arc(cx, cy, SR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(40,80,255,0.75)"; ctx.lineWidth = 3;
      ctx.shadowBlur = 22; ctx.shadowColor = "rgba(50,90,255,0.9)";
      ctx.stroke(); ctx.shadowBlur = 0;
    }

    function drawRing() {
      const startIdx = Math.floor((prog / 100) * 720);
      LAYERS.forEach((w) => {
        ctx.beginPath();
        for (let i = startIdx; i <= 720; i++) {
          const a = (i / 720) * Math.PI * 2 - Math.PI / 2;
          const bf = 0.5 + 0.5 * Math.cos(a - brightRad + Math.PI);
          const df = 0.25 + 0.75 * bf;
          const noise =
            w.a * df * Math.sin(w.lf * a + t * w.spd) +
            w.a * 0.3 * df * Math.sin(w.hf * a - t * w.spd * 1.7 + 1.2);
          const r = RR + noise;
          const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
          i === startIdx ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const [r, g, b] = w.col;
        ctx.strokeStyle = `rgba(${r},${g},${b},${w.op})`;
        ctx.lineWidth = w.lw;
        ctx.shadowBlur = 6; ctx.shadowColor = `rgba(${r},${g},${b},0.7)`;
        ctx.stroke(); ctx.shadowBlur = 0;
      });
    }

    /** Glowing arc that grows clockwise from top as progress increases */
    function drawProgressArc() {
      if (prog <= 0) return;
      const startAngle = -Math.PI / 2;
      const endAngle = startAngle + (prog / 100) * Math.PI * 2;

      // Outer glow
      ctx.beginPath(); ctx.arc(cx, cy, RR, startAngle, endAngle);
      ctx.strokeStyle = "rgba(100,160,255,0.18)";
      ctx.lineWidth = 14; ctx.lineCap = "round"; ctx.stroke();

      // Mid glow
      ctx.beginPath(); ctx.arc(cx, cy, RR, startAngle, endAngle);
      ctx.strokeStyle = "rgba(140,195,255,0.32)";
      ctx.lineWidth = 7; ctx.lineCap = "round"; ctx.stroke();

      // Core bright arc
      ctx.beginPath(); ctx.arc(cx, cy, RR, startAngle, endAngle);
      ctx.strokeStyle = "rgba(220,238,255,0.92)";
      ctx.lineWidth = 2; ctx.lineCap = "round";
      ctx.shadowBlur = 16; ctx.shadowColor = "rgba(160,210,255,1)";
      ctx.stroke(); ctx.shadowBlur = 0;

      // Moving tip glow
      const tipX = cx + RR * Math.cos(endAngle);
      const tipY = cy + RR * Math.sin(endAngle);
      const tipG = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 14);
      tipG.addColorStop(0, "rgba(255,255,255,1)");
      tipG.addColorStop(0.3, "rgba(180,220,255,0.75)");
      tipG.addColorStop(1, "rgba(80,140,255,0)");
      ctx.beginPath(); ctx.arc(tipX, tipY, 14, 0, Math.PI * 2);
      ctx.fillStyle = tipG; ctx.fill();
      ctx.beginPath(); ctx.arc(tipX, tipY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#fff"; ctx.fill();
    }

    function drawDots() {
      [-Math.PI / 2, Math.PI / 2].forEach((angle) => {
        const dx = cx + RR * Math.cos(angle), dy = cy + RR * Math.sin(angle);
        ctx.shadowBlur = 18; ctx.shadowColor = "rgba(200,220,255,0.9)";
        const g = ctx.createRadialGradient(dx, dy, 0, dx, dy, 9);
        g.addColorStop(0, "rgba(255,255,255,0.9)");
        g.addColorStop(0.45, "rgba(180,210,255,0.55)");
        g.addColorStop(1, "rgba(80,130,255,0)");
        ctx.beginPath(); ctx.arc(dx, dy, 9, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(dx, dy, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = "#fff"; ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

    function drawText() {
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.font = `13.5px "Segoe UI", Arial, sans-serif`;
      ctx.fillStyle = "rgba(185,212,255,0.82)";
      ctx.shadowBlur = 4; ctx.shadowColor = "rgba(100,150,255,0.4)";
      ctx.fillText(line1, cx, cy - 14);
      ctx.fillText(line2, cx, cy + 4);
      ctx.shadowBlur = 0;
      ctx.font = `bold 44px "Segoe UI", Arial, sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 20; ctx.shadowColor = "rgba(130,170,255,0.85)";
      ctx.fillText(`${Math.round(prog)}%`, cx, cy + 46);
      ctx.shadowBlur = 0;
    }

    function frame() {
      ctx.clearRect(0, 0, size, size);
      drawSphere();
      drawRing();
      drawProgressArc(); // ON TOP of wavy ring
      drawDots();
      drawText();
      t += 0.016;
      if (prog < 100) prog += 0.18;
      rafId = requestAnimationFrame(frame);
    }

    frame();
    return () => cancelAnimationFrame(rafId);
  }, [size, line1, line2]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#050518", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <canvas ref={canvasRef} width={size} height={size} />
    </div>
  );
}