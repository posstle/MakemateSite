import { useTranslation } from "react-i18next";
import { 
  Laptop, 
  Smartphone, 
  Paintbrush, 
  ShoppingCart, 
  TrendingUp, 
  Server,
  ArrowRight
} from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
}

const ServiceCard = ({ icon, title, description, colorClass }: ServiceCardProps) => {
  const { t } = useTranslation();
  
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <div className="service-card bg-white rounded-xl shadow-lg p-8 transition-all duration-300">
      <div className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-muted mb-6">
        {description}
      </p>
      <button 
        onClick={scrollToContact}
        className="text-primary font-medium flex items-center hover:text-secondary transition-colors duration-300"
      >
        {t("services.learnMore")}
        <ArrowRight className="ml-2" size={16} />
      </button>
    </div>
  );
};

const ServicesSection = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: <Laptop className="text-primary text-2xl" />,
      title: t("services.websiteDev"),
      description: t("services.websiteDesc"),
      colorClass: "bg-primary bg-opacity-10"
    },
    {
      icon: <Smartphone className="text-secondary text-2xl" />,
      title: t("services.webAppDev"),
      description: t("services.webAppDesc"),
      colorClass: "bg-secondary bg-opacity-10"
    },
    {
      icon: <Paintbrush className="text-accent text-2xl" />,
      title: t("services.uiux"),
      description: t("services.uiuxDesc"),
      colorClass: "bg-accent bg-opacity-10"
    },
    {
      icon: <ShoppingCart className="text-primary text-2xl" />,
      title: t("services.ecommerce"),
      description: t("services.ecommerceDesc"),
      colorClass: "bg-primary bg-opacity-10"
    },
    {
      icon: <TrendingUp className="text-secondary text-2xl" />,
      title: t("services.seo"),
      description: t("services.seoDesc"),
      colorClass: "bg-secondary bg-opacity-10"
    },
    {
      icon: <Server className="text-accent text-2xl" />,
      title: t("services.maintenance"),
      description: t("services.maintenanceDesc"),
      colorClass: "bg-accent bg-opacity-10"
    }
  ];
  
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <section id="services" className="py-20 bg-[#F8F9FA]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("services.title")}</h2>
          <p className="text-muted text-lg max-w-3xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              colorClass={service.colorClass}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button
            onClick={scrollToContact}
            className="inline-block bg-secondary hover:bg-opacity-90 text-white px-8 py-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg font-medium"
          >
            {t("services.discussProject")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
