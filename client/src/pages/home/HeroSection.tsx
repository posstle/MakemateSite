import { Link } from "wouter";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t("hero.title.part1")} <span className="text-primary">{t("hero.title.part2")}</span> {t("hero.title.part3")} <span className="text-secondary">{t("hero.title.part4")}</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-primary hover:bg-opacity-90 text-white px-8 py-4 rounded-md transition-all duration-300 text-center shadow-md hover:shadow-lg font-medium"
              >
                {t("hero.startProject")}
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-4 rounded-md transition-all duration-300 text-center font-medium"
              >
                {t("hero.seeWork")}
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-slide-up">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=900" 
              alt={t("hero.imageAlt")} 
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
        
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary mb-2">150+</p>
            <p className="text-gray-600 dark:text-gray-300">{t("hero.stats.projects")}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</p>
            <p className="text-gray-600 dark:text-gray-300">{t("hero.stats.satisfaction")}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary mb-2">10+</p>
            <p className="text-gray-600 dark:text-gray-300">{t("hero.stats.experience")}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary mb-2">25+</p>
            <p className="text-gray-600 dark:text-gray-300">{t("hero.stats.team")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
