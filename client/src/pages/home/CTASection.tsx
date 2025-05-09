import { useTranslation } from "react-i18next";

const CTASection = () => {
  const { t } = useTranslation();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("cta.title")}</h2>
        <p className="text-white text-lg mb-10 max-w-3xl mx-auto opacity-90">
          {t("cta.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-white text-primary hover:bg-opacity-90 px-8 py-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg font-medium"
          >
            {t("cta.getStarted")}
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-md transition-all duration-300 font-medium"
          >
            {t("cta.viewWork")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
