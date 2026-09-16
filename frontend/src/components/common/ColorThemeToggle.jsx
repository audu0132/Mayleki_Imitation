import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ColorThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle luxury contrast theme"
      className="p-2 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
    >
      {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
    </button>
  );
}
