"use client"
import { useEffect, useRef, useState } from "react"

export default function BlurText({
  children,
  className = "",
  delay = 0,
}: {
  children: string
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // check if already on screen on mount
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @keyframes blurIn {
          0%   { filter: blur(12px); opacity: 0; transform: translateY(8px); }
          100% { filter: blur(0px);  opacity: 1; transform: translateY(0px); }
        }
        .blur-in {
          animation: blurIn 0.8s ease forwards;
          opacity: 0;
        }
      `}</style>
      <p ref={ref} className={`flex flex-wrap gap-x-2 ${className}`}>
        {children.split(" ").map((word, i) => (
          <span
            key={i}
            className={visible ? "blur-in" : ""}
            style={{
              opacity: visible ? undefined : 0,
              animationDelay: visible ? `${delay + i * 120}ms` : undefined,
            }}
          >
            {word}
          </span>
        ))}
      </p>
    </>
  )
}