import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    }
  };

  return (
    <header className={`fixed w-full bg-white shadow-md z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
              make<span className="text-secondary">mate</span>
            </Link>
          </div>
          
          <div className="lg:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-text focus:outline-none" 
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-10">
            <button 
              onClick={() => scrollToSection("home")} 
              className="text-text hover:text-primary transition-colors duration-300"
            >
              {t("nav.home")}
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className="text-text hover:text-primary transition-colors duration-300"
            >
              {t("nav.services")}
            </button>
            <button 
              onClick={() => scrollToSection("portfolio")} 
              className="text-text hover:text-primary transition-colors duration-300"
            >
              {t("nav.portfolio")}
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className="text-text hover:text-primary transition-colors duration-300"
            >
              {t("nav.about")}
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="text-text hover:text-primary transition-colors duration-300"
            >
              {t("nav.contact")}
            </button>
            
            <LanguageSelector />
          </nav>
          
          <div className="hidden lg:block">
            <button 
              onClick={() => scrollToSection("contact")} 
              className="bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {t("nav.getInTouch")}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white border-t ${isOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-6 py-4">
          <nav className="flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection("home")} 
              className="text-text hover:text-primary transition-colors duration-300"
            >
              {t("nav.home")}
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className="text-text hover:text-primary transition-colors duration-300"
            >
              {t("nav.services")}
            </button>
            <button 
              onClick={() => scrollToSection("portfolio")} 
              className="text-text hover:text-primary transition-colors duration-300"
            >
              {t("nav.portfolio")}
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className="text-text hover:text-primary transition-colors duration-300"
            >
              {t("nav.about")}
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="text-text hover:text-primary transition-colors duration-300"
            >
              {t("nav.contact")}
            </button>
            
            <div className="flex space-x-4 mt-2">
              <LanguageSelector mobile />
            </div>
            
            <button 
              onClick={() => scrollToSection("contact")} 
              className="bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-all duration-300 text-center shadow-md hover:shadow-lg mt-2"
            >
              {t("nav.getInTouch")}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
