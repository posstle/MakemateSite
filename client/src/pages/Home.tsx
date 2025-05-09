import HeroSection from "./home/HeroSection";
import ServicesSection from "./home/ServicesSection";
import ProcessSection from "./home/ProcessSection";
import PortfolioSection from "./home/PortfolioSection";
import TestimonialsSection from "./home/TestimonialsSection";
import AboutSection from "./home/AboutSection";
import ContactSection from "./home/ContactSection";
import CTASection from "./home/CTASection";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Helmet>
        <title>{t('seo.homeTitle')}</title>
        <meta name="description" content={t('seo.homeDescription')} />
        <meta property="og:title" content={t('seo.homeTitle')} />
        <meta property="og:description" content={t('seo.homeDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://makemate.com" />
        <meta property="og:image" content="https://makemate.com/og-image.jpg" />
      </Helmet>
      
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <CTASection />
    </>
  );
};

export default Home;
