"use client"
import { useEffect, useRef, useState } from "react"

const isMobile = typeof window !== "undefined" && window.innerWidth < 768
const blurAmount = isMobile ? "6px" : "10px"

export default function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // immediately check if already visible on mount
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
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
      { threshold: 0, rootMargin: "0px 0px -30px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        filter: visible ? "blur(0px)" : `blur(${blurAmount})`,
        WebkitFilter: visible ? "blur(0px)" : `blur(${blurAmount})`,
        transform: visible ? "translateY(0) translateZ(0)" : "translateY(16px) translateZ(0)",
        transition: `opacity 0.6s ease ${delay}ms, filter 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        WebkitTransition: `opacity 0.6s ease ${delay}ms, -webkit-filter 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        willChange: "opacity, filter, transform",
      }}
    >
      {children}
    </div>
  )
}