import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Dribbble, 
  Send, 
  Heart,
  ArrowUp, 
  Sparkles
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: t("newsletter.errorTitle"),
        description: t("newsletter.errorMessage"),
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/newsletter", { email });
      
      toast({
        title: t("newsletter.successTitle"),
        description: t("newsletter.successMessage"),
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: t("newsletter.errorTitle"),
        description: t("newsletter.submitError"),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text dark:bg-gray-900 py-16 relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
      
      {/* Scroll to top button */}
      <div className="absolute -top-5 right-8">
        <button 
          onClick={scrollToTop}
          className="bg-background dark:bg-gray-800 text-primary hover:text-secondary p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-white">
          <div className="animate-fade-in">
            <a href="#" className="text-2xl font-bold text-white mb-6 inline-block flex items-center">
              <Sparkles size={20} className="inline-block mr-2 text-accent animate-pulse-gentle" />
              make<span className="text-secondary">mate</span>
            </a>
            <p className="text-gray-400 mb-6">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 dark:bg-gray-700 p-2 rounded-full text-gray-400 hover:text-white hover:bg-primary transition-all duration-300 hover:scale-110" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-gray-800 dark:bg-gray-700 p-2 rounded-full text-gray-400 hover:text-white hover:bg-primary transition-all duration-300 hover:scale-110" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-gray-800 dark:bg-gray-700 p-2 rounded-full text-gray-400 hover:text-white hover:bg-primary transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="bg-gray-800 dark:bg-gray-700 p-2 rounded-full text-gray-400 hover:text-white hover:bg-primary transition-all duration-300 hover:scale-110" aria-label="Dribbble">
                <Dribbble size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <div className="w-8 h-0.5 bg-primary mr-2"></div>
              {t("footer.services")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center hover-slide-up">
                  <span className="w-0 h-0.5 bg-secondary opacity-0 transition-all duration-300 mr-0 group-hover:w-3 group-hover:opacity-100 group-hover:mr-2"></span>
                  {t("services.websiteDev")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center hover-slide-up">
                  <span className="w-0 h-0.5 bg-secondary opacity-0 transition-all duration-300 mr-0 group-hover:w-3 group-hover:opacity-100 group-hover:mr-2"></span>
                  {t("services.webAppDev")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center hover-slide-up">
                  <span className="w-0 h-0.5 bg-secondary opacity-0 transition-all duration-300 mr-0 group-hover:w-3 group-hover:opacity-100 group-hover:mr-2"></span>
                  {t("services.ecommerce")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center hover-slide-up">
                  <span className="w-0 h-0.5 bg-secondary opacity-0 transition-all duration-300 mr-0 group-hover:w-3 group-hover:opacity-100 group-hover:mr-2"></span>
                  {t("services.uiux")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center hover-slide-up">
                  <span className="w-0 h-0.5 bg-secondary opacity-0 transition-all duration-300 mr-0 group-hover:w-3 group-hover:opacity-100 group-hover:mr-2"></span>
                  {t("services.seo")}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <div className="w-8 h-0.5 bg-primary mr-2"></div>
              {t("footer.company")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center hover-slide-up">
                  <span className="w-0 h-0.5 bg-secondary opacity-0 transition-all duration-300 mr-0 group-hover:w-3 group-hover:opacity-100 group-hover:mr-2"></span>
                  {t("footer.about")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center hover-slide-up">
                  <span className="w-0 h-0.5 bg-secondary opacity-0 transition-all duration-300 mr-0 group-hover:w-3 group-hover:opacity-100 group-hover:mr-2"></span>
                  {t("footer.portfolio")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center hover-slide-up">
                  <span className="w-0 h-0.5 bg-secondary opacity-0 transition-all duration-300 mr-0 group-hover:w-3 group-hover:opacity-100 group-hover:mr-2"></span>
                  {t("footer.careers")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center hover-slide-up">
                  <span className="w-0 h-0.5 bg-secondary opacity-0 transition-all duration-300 mr-0 group-hover:w-3 group-hover:opacity-100 group-hover:mr-2"></span>
                  {t("footer.blog")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center hover-slide-up">
                  <span className="w-0 h-0.5 bg-secondary opacity-0 transition-all duration-300 mr-0 group-hover:w-3 group-hover:opacity-100 group-hover:mr-2"></span>
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <div className="w-8 h-0.5 bg-primary mr-2"></div>
              {t("footer.newsletter")}
            </h3>
            <p className="text-gray-400 mb-4">{t("footer.subscribeText")}</p>
            <form className="mb-4 group" onSubmit={handleSubscribe}>
              <div className="flex border border-gray-700 dark:border-gray-600 rounded-md overflow-hidden focus-within:border-secondary transition-colors duration-300">
                <input 
                  type="email" 
                  placeholder={t("footer.emailPlaceholder")} 
                  className="px-4 py-3 w-full focus:outline-none bg-gray-800 dark:bg-gray-700 text-white text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button 
                  type="submit" 
                  className="bg-primary text-white px-4 py-3 hover:bg-opacity-90 transition-colors duration-300 disabled:opacity-50 group-focus-within:bg-secondary"
                  disabled={isSubmitting}
                >
                  <Send size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </form>
            <p className="text-gray-500 text-sm">
              {t("footer.privacyConsent")}
            </p>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 flex items-center">
            <Heart size={14} className="text-primary mr-2 animate-pulse-gentle" />
            &copy; {currentYear} makemate. {t("footer.rightsReserved")}
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover-slide-up">{t("footer.privacy")}</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover-slide-up">{t("footer.terms")}</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover-slide-up">{t("footer.cookies")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
