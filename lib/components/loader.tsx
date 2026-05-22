"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            animation: "loaderFadeOut 0.4s ease forwards 2.6s",
          }}
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&display=swap');
            @keyframes loaderFadeOut { to { opacity: 0; pointer-events: none; } }
            @keyframes dotPop { 0%, 100% { transform: scale(0.4); opacity: 0.2; } 50% { transform: scale(1.2); opacity: 1; } }
            @keyframes orbitSpin { from { transform: rotate(0deg) translateX(38px) rotate(0deg); } to { transform: rotate(360deg) translateX(38px) rotate(-360deg); } }
            @keyframes labelReveal { from { opacity: 0; letter-spacing: 0.5em; filter: blur(6px); } to { opacity: 1; letter-spacing: 0.22em; filter: blur(0); } }
            @keyframes barSweep { from { width: 0%; } to { width: 100%; } }
            @keyframes childrenReveal { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
          `}</style>

          <div style={{ position: "relative", width: 90, height: 90, marginBottom: 36 }}>
            {[...Array(8)].map((_, i) => (
              <span key={i} style={{
                position: "absolute", top: "50%", left: "50%",
                width: 7, height: 7, marginTop: -3.5, marginLeft: -3.5,
                borderRadius: "50%",
                background: i % 2 === 0 ? "#ffffff" : "#555",
                animation: `orbitSpin ${1.2 + i * 0.08}s linear infinite`,
                animationDelay: `${i * 0.09}s`,
                transformOrigin: "center center",
                transform: `rotate(${i * 45}deg) translateX(38px) rotate(-${i * 45}deg)`,
              }} />
            ))}
            <span style={{
              position: "absolute", top: "50%", left: "50%",
              width: 12, height: 12, marginTop: -6, marginLeft: -6,
              borderRadius: "50%", background: "#fff",
              animation: "dotPop 1.4s ease-in-out infinite",
            }} />
          </div>

          <p style={{ fontSize: 12, color: "#ffffff",
            letterSpacing: "0.22em", textTransform: "uppercase",
            animation: "labelReveal 0.8s ease forwards", opacity: 0,
            animationDelay: "0.2s", marginBottom: 28,
          }}>WAKING UP</p>

          <div style={{ width: 120, height: 1.5, background: "#222", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              background: "linear-gradient(90deg, #555, #fff)",
              borderRadius: 99,
              animation: "barSweep 2.5s cubic-bezier(0.4,0,0.2,1) forwards",
              animationDelay: "0.1s",
              width: 0,
            }} />
          </div>
        </div>
      )}

      {/* children mount only after loader finishes */}
      {!loading && (
        <div style={{ animation: "childrenReveal 0.5s ease forwards" }}>
          {children}
        </div>
      )}
    </>
  );
}