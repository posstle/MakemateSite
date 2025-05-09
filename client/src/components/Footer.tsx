import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Dribbble, 
  Send 
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-white">
          <div>
            <a href="#" className="text-2xl font-bold text-white mb-6 inline-block">
              make<span className="text-secondary">mate</span>
            </a>
            <p className="text-gray-400 mb-6">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Dribbble">
                <Dribbble size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">{t("footer.services")}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">{t("services.websiteDev")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">{t("services.webAppDev")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">{t("services.ecommerce")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">{t("services.uiux")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">{t("services.seo")}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">{t("footer.company")}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">{t("footer.about")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">{t("footer.portfolio")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">{t("footer.careers")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">{t("footer.blog")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">{t("footer.contact")}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">{t("footer.newsletter")}</h3>
            <p className="text-gray-400 mb-4">{t("footer.subscribeText")}</p>
            <form className="mb-4" onSubmit={handleSubscribe}>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder={t("footer.emailPlaceholder")} 
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button 
                  type="submit" 
                  className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors duration-300 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
            <p className="text-gray-500 text-sm">
              {t("footer.privacyConsent")}
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} makemate. {t("footer.rightsReserved")}
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">{t("footer.privacy")}</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">{t("footer.terms")}</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">{t("footer.cookies")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
