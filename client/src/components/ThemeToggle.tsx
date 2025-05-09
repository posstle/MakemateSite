import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`w-9 h-9 ${className}`} />;
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 ${
        theme === "dark" ? "bg-gray-800 text-yellow-400" : "bg-gray-200 text-gray-800"
      } ${className}`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun size={18} className="animate-spin-slow" />
      ) : (
        <Moon size={18} className="animate-pulse-gentle" />
      )}
    </button>
  );
};

export default ThemeToggle;