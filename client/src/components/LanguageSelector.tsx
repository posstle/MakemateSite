import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, Globe } from "lucide-react";

interface LanguageSelectorProps {
  mobile?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ mobile = false }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  if (mobile) {
    return (
      <>
        <button 
          onClick={() => changeLanguage('en')} 
          className={`text-foreground hover:text-primary transition-colors duration-300 ${i18n.language === 'en' ? 'font-semibold text-primary' : ''}`}
        >
          EN
        </button>
        <button 
          onClick={() => changeLanguage('ko')} 
          className={`text-foreground font-noto hover:text-primary transition-colors duration-300 ${i18n.language === 'ko' ? 'font-semibold text-primary' : ''}`}
        >
          KR
        </button>
      </>
    );
  }
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="flex items-center text-foreground hover:text-primary transition-colors duration-300 group"
      >
        <Globe size={18} className="mr-1 group-hover:rotate-12 transition-transform duration-300" />
        <span>{i18n.language === 'ko' ? 'KR' : 'EN'}</span>
        <ChevronDown className={`ml-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={14} />
      </button>
      
      {isOpen && (
        <div className="absolute mt-2 py-2 w-32 bg-background border border-border rounded-md shadow-xl z-10 animate-fade-in">
          <button 
            onClick={() => changeLanguage('en')} 
            className={`block px-4 py-2 text-sm text-foreground hover:bg-primary/10 w-full text-left transition-colors duration-200 ${i18n.language === 'en' ? 'font-semibold bg-primary/5' : ''}`}
          >
            🇺🇸 English
          </button>
          <button 
            onClick={() => changeLanguage('ko')} 
            className={`block px-4 py-2 text-sm font-noto text-foreground hover:bg-primary/10 w-full text-left transition-colors duration-200 ${i18n.language === 'ko' ? 'font-semibold bg-primary/5' : ''}`}
          >
            🇰🇷 한국어
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
