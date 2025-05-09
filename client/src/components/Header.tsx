import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, Sparkles } from "lucide-react";

const Header = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToSection = (id: string) => {
    // Only scroll if on homepage
    if (window.location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        closeMenu();
      }
    }
  };

  const isDark = mounted && theme === "dark";

  return (
    <header className={`fixed w-full bg-background/90 backdrop-blur-sm border-b border-border shadow-md z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center animate-slide-in-left">
            <Link href="/" className="text-2xl font-bold text-primary tracking-tight flex items-center group">
              <span className="mr-1 text-foreground transition-all duration-300 group-hover:text-primary">
                <Sparkles size={20} className="inline-block mr-1 animate-pulse-gentle" />
              </span>
              make<span className="text-secondary">mate</span>
            </Link>
          </div>
          
          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button 
              onClick={toggleMenu} 
              className="text-foreground focus:outline-none" 
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-6 animate-fade-in">
            <Link 
              href="/"
              className="text-foreground hover:text-primary transition-colors duration-300 hover-slide-up"
            >
              {t("nav.home")}
            </Link>
            <Link 
              href="/services"
              className="text-foreground hover:text-primary transition-colors duration-300 hover-slide-up"
            >
              {t("nav.services")}
            </Link>
            <Link 
              href="/portfolio"
              className="text-foreground hover:text-primary transition-colors duration-300 hover-slide-up"
            >
              {t("nav.portfolio")}
            </Link>
            <Link 
              href="/about"
              className="text-foreground hover:text-primary transition-colors duration-300 hover-slide-up"
            >
              {t("nav.about")}
            </Link>
            <Link 
              href="/contact"
              className="text-foreground hover:text-primary transition-colors duration-300 hover-slide-up"
            >
              {t("nav.contact")}
            </Link>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </nav>
          
          <div className="hidden lg:block animate-slide-in-right">
            <Link 
              href="/contact"
              className="bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg inline-block"
            >
              {t("nav.getInTouch")}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`lg:hidden bg-background/95 backdrop-blur-sm border-t border-border ${isOpen ? 'block animate-slide-in-right' : 'hidden'}`}>
        <div className="container mx-auto px-6 py-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/"
              className="text-foreground hover:text-primary transition-colors duration-300"
              onClick={closeMenu}
            >
              {t("nav.home")}
            </Link>
            <Link 
              href="/services"
              className="text-foreground hover:text-primary transition-colors duration-300"
              onClick={closeMenu}
            >
              {t("nav.services")}
            </Link>
            <Link 
              href="/portfolio"
              className="text-foreground hover:text-primary transition-colors duration-300"
              onClick={closeMenu}
            >
              {t("nav.portfolio")}
            </Link>
            <Link 
              href="/about"
              className="text-foreground hover:text-primary transition-colors duration-300"
              onClick={closeMenu}
            >
              {t("nav.about")}
            </Link>
            <Link 
              href="/contact"
              className="text-foreground hover:text-primary transition-colors duration-300"
              onClick={closeMenu}
            >
              {t("nav.contact")}
            </Link>
            
            <div className="flex space-x-4 mt-2">
              <LanguageSelector mobile />
            </div>
            
            <Link 
              href="/contact"
              className="bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-all duration-300 text-center shadow-md hover:shadow-lg mt-2 block"
              onClick={closeMenu}
            >
              {t("nav.getInTouch")}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
