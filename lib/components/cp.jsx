const info={
    platforms: [
      {
        name: "leetcode",
        problems_solved: 755,
        profilelink: "https://leetcode.com/u/Abhiram-06/",
        logo: "https://leetcode.com/static/images/LeetCode_logo.png"
      },
      {
        name: "geeksforgeeks",
        problems_solved: 216,
        profilelink: "https://www.geeksforgeeks.org/profile/abhiram_06",
        logo: "https://tse3.mm.bing.net/th/id/OIP.8v6j0MJlk2ZYnq0P_ifarAHaHa?pid=Api&P=0&h=180"
      },
      
    ],
    achievements: [
      {
        description: "Ranked among the top 5% of global participants after reaching Knight on LeetCode.",
        logo: "https://fastly.jsdelivr.net/gh/doocs/leetcode@main/images/Knight.gif"   // optional, falls back to a black trophy icon
      },
    ]
}

import { useState, useEffect, useRef } from "react";

function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function AnimatedCount({ value }) {
  const { count, ref } = useCountUp(value);
  return <span ref={ref}>{count}</span>;
}

function PlatformCard({ platform }) {
  return (
    <a
      href={platform.profilelink || "#"}
      target="_blank"
      rel="noopener noreferrer" className="text-zinc-500 hover:shadow-sm"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 10px",
        border: "1px solid #e5e5e5",
        borderRadius: "10px",
        backgroundColor: "#fff",
        textDecoration: "none",

        transition: "border-color 0.15s, background 0.15s",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        // e.currentTarget.style.borderColor = "#111";
        e.currentTarget.style.backgroundColor = "#fafafa";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "#e5e5e5";
        e.currentTarget.style.backgroundColor = "#fff";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "8px",
          background: "#f4f4f4", display: "flex", alignItems: "center",
          justifyContent: "center", flexShrink: 0, overflow: "hidden",
        }}>
          {platform.logo
            ? <img src={platform.logo} alt={platform.name} style={{ width: "25px", height: "25px", objectFit: "contain" }} />
            : <span style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>{platform.name?.[0]?.toUpperCase()}</span>
          }
        </div>

        <div>
          <p className="text-xm" style={{ margin: 0, fontWeight: 500, color: "#111", textTransform: "capitalize" }}>
            {platform.name}
          </p>
          <p className="text-sm" style={{ margin: 0, color: "#888", marginTop: "2px" }}>
            {platform.problems_solved}+ problems solved
          </p>
        </div>

      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
        <span className="text-sm" style={{
           fontWeight: 500, color: "#111",
          background: "#f0f0f0", padding: "4px 10px", borderRadius: "999px",
        }}>
          {platform.problems_solved}+
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
          <path d="M7 17L17 7M7 7h10v10"/>
        </svg>
      </div>
    </a>
  );
}

function AchievementCard({ achievement }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: "14px",
      padding: "14px 16px", border: "1px solid #e5e5e5",
      borderRadius: "10px", backgroundColor: "#fff",
    }}>
      {achievement.logo ? (
        <img
          src={achievement.logo}
          alt=""
          style={{ width: "36px", height: "36px", borderRadius: "8px", objectFit: "cover", flexShrink: 0, background: "#f4f4f4" }}
        />
      ) : (
        <div style={{
          width: "36px", height: "36px", borderRadius: "8px",
          background: "#111", display: "flex", alignItems: "center",
          justifyContent: "center", flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      )}
      <p className="text-sm "style={{ margin: 0,  color: "#333" }}>
        {achievement.description}
      </p>
    </div>
  );
}

export default function CodingPlatforms() {
  const { platforms = [], achievements = [] } = info;
  const totalSolved = platforms.reduce((acc, p) => acc + (p.problems_solved || 0), 0);

  return (
    <div className="text-zinc-500" style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
      gap: "24px",
      padding: "0",
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "16px" }}>
          <h2 className="text-2xl text-zinc-500" style={{ margin: 0, fontWeight: 600, letterSpacing: "-0.01em" }}>
            Coding platforms
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {platforms.map((p, i) => <PlatformCard key={i} platform={p} />)}
        </div>
      </div>

      <div>
        <div style={{ marginBottom: "16px" }}>
          <h2 className="text-2xl" style={{ margin: 0,  fontWeight: 600, letterSpacing: "-0.01em" }}>
            Achievements
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {achievements.map((a, i) => <AchievementCard key={i} achievement={a} />)}
        </div>
      </div>
    </div>
  );
}