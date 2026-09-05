import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [cursorState, setCursorState] = useState("default"); // "default" | "expanded" | "cta"
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Only on desktop with hover capability
    if (window.matchMedia("(hover: none)").matches || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    document.body.classList.add("custom-cursor-active");

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        const type = target.getAttribute("data-cursor");
        setCursorState(type || "expanded");
      } else if (e.target.closest("a, button, [role='button']")) {
        setCursorState("cta");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseLeave = () => {
      targetRef.current = { x: -100, y: -100 };
    };

    // Smooth lerp animation
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.15);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.15);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.classList.remove("custom-cursor-active");
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  const stateClass = {
    default: "",
    expanded: "expanded",
    cta: "cta-hover",
    view: "expanded",
  }[cursorState] || "";

  return (
    <div
      ref={cursorRef}
      className={`cursor-dot ${stateClass}`}
      style={{ top: 0, left: 0 }}
      aria-hidden="true"
    />
  );
}
