import { useState, useEffect, useRef, useCallback } from "react";

const DEFAULT_LOGOS = [
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "GraphQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "Rust", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg" },
];

const DEFAULT_COLS = 4;
const DEFAULT_SPEED = 1200; // ms per flip

function LogoCell({ logos, slotIndex, speed, globalOffset }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const timerRef = useRef(null);

  const cycle = useCallback(() => {
    setFlipping(true);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % logos.length);
      setFlipping(false);
    }, speed * 0.4);
  }, [logos.length, speed]);

  useEffect(() => {
    if (logos.length <= 1) return;
    const delay = globalOffset + slotIndex * (speed / 3);
    const timeout = setTimeout(() => {
      cycle();
      timerRef.current = setInterval(cycle, speed);
    }, delay % speed);

    return () => {
      clearTimeout(timeout);
      clearInterval(timerRef.current);
    };
  }, [slotIndex, speed, globalOffset, cycle]);

  const logo = logos[currentIndex];

  return (
    <div
      style={{
        perspective: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "16px",
          background: "var(--color-background-secondary)",
          border: "0.5px solid var(--color-border-tertiary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformStyle: "preserve-3d",
          transform: flipping ? "rotateX(90deg)" : "rotateX(0deg)",
          transition: flipping
            ? `transform ${speed * 0.4}ms cubic-bezier(0.55,0,1,0.45)`
            : `transform ${speed * 0.4}ms cubic-bezier(0,0.55,0.45,1)`,
          padding: "12px",
        }}
      >
        {console.log(logo.url)}
        <img
          src={logo.url}
          alt={logo.name}
          title={logo.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        //   onError={(e) => {
        //     e.target.style.display = "none";
        //     e.target.parentNode.innerHTML = `<span style="font-size:11px;color:var(--color-text-tertiary);text-align:center;word-break:break-word;padding:4px">${logo.name}</span>`;
        //   }}
        />
      </div>
      <span
        style={{
          fontSize: "11px",
          color: "var(--color-text-secondary)",
          fontWeight: 500,
          opacity: flipping ? 0 : 1,
          transition: `opacity ${speed * 0.25}ms ease`,
          maxWidth: "80px",
          textAlign: "center",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {logo.name}
      </span>
    </div>
  );
}

// Distributes logos into `cols` slots as evenly as possible
function distributeLogos(logos, cols) {
  const slots = Array.from({ length: cols }, () => []);
  logos.forEach((logo, i) => {
    slots[i % cols].push(logo);
  });
  return slots;
}

export default function SkillLogoSpawner({
  logos = DEFAULT_LOGOS,
  columns = DEFAULT_COLS,
  speed = DEFAULT_SPEED,
  showControls = true,
}) {
  const [cols, setCols] = useState(columns);
  const [spd, setSpd] = useState(speed);
  const [key, setKey] = useState(0);

  const slots = distributeLogos(logos, cols);

  const restart = () => setKey((k) => k + 1);

  return (
    <div style={{ fontFamily: "var(--font-sans)", padding: "24px 0" }}>
      {showControls && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            alignItems: "center",
            marginBottom: "28px",
            padding: "16px 20px",
            background: "var(--color-background-secondary)",
            borderRadius: "var(--border-radius-lg)",
            border: "0.5px solid var(--color-border-tertiary)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: "1 1 200px" }}>
            <label
              style={{ fontSize: "13px", color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}
            >
              Columns
            </label>
            <input
              type="range"
              min={1}
              max={8}
              step={1}
              value={cols}
              onChange={(e) => { setCols(Number(e.target.value)); restart(); }}
              style={{ flex: 1 }}
            />
            <span
              style={{ fontSize: "13px", fontWeight: 500, minWidth: "18px", color: "var(--color-text-primary)" }}
            >
              {cols}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: "1 1 240px" }}>
            <label
              style={{ fontSize: "13px", color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}
            >
              Flip speed
            </label>
            <input
              type="range"
              min={300}
              max={4000}
              step={100}
              value={spd}
              onChange={(e) => { setSpd(Number(e.target.value)); restart(); }}
              style={{ flex: 1 }}
            />
            <span
              style={{ fontSize: "13px", fontWeight: 500, minWidth: "38px", color: "var(--color-text-primary)" }}
            >
              {(spd / 1000).toFixed(1)}s
            </span>
          </div>
          <button onClick={restart} style={{ fontSize: "13px", padding: "6px 14px" }}>
            Reset
          </button>
        </div>
      )}

      <div
        key={key}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gap: "20px 16px",
          justifyItems: "center",
        }}
      >
        {slots.map((slotLogos, slotIndex) =>
          slotLogos.length > 0 ? (
            <LogoCell
              key={slotIndex}
              logos={slotLogos}
              slotIndex={slotIndex}
              speed={spd}
              globalOffset={0}
            />
          ) : null
        )}
      </div>

      {/* <div
        style={{
          marginTop: "20px",
          fontSize: "12px",
          color: "var(--color-text-tertiary)",
          textAlign: "center",
        }}
      >
        {logos.length} logos across {cols} column{cols !== 1 ? "s" : ""} · each slot cycles {Math.ceil(logos.length / cols)} logo{Math.ceil(logos.length / cols) !== 1 ? "s" : ""}
      </div> */}
    </div>
  );
}