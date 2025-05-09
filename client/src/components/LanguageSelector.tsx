import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

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
          className={`text-text hover:text-primary transition-colors duration-300 ${i18n.language === 'en' ? 'font-semibold text-primary' : ''}`}
        >
          EN
        </button>
        <button 
          onClick={() => changeLanguage('ko')} 
          className={`text-text font-noto hover:text-primary transition-colors duration-300 ${i18n.language === 'ko' ? 'font-semibold text-primary' : ''}`}
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
        className="flex items-center text-text hover:text-primary transition-colors duration-300"
      >
        <span>{i18n.language === 'ko' ? 'KR' : 'EN'}</span>
        <ChevronDown className="ml-2" size={16} />
      </button>
      
      {isOpen && (
        <div className="absolute mt-2 py-2 w-24 bg-white rounded-md shadow-xl z-10">
          <button 
            onClick={() => changeLanguage('en')} 
            className={`block px-4 py-2 text-sm text-text hover:bg-gray-100 w-full text-left ${i18n.language === 'en' ? 'font-semibold' : ''}`}
          >
            English
          </button>
          <button 
            onClick={() => changeLanguage('ko')} 
            className={`block px-4 py-2 text-sm font-noto text-text hover:bg-gray-100 w-full text-left ${i18n.language === 'ko' ? 'font-semibold' : ''}`}
          >
            한국어
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
