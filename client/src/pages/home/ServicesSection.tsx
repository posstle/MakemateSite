import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { 
  Laptop, 
  Smartphone, 
  Paintbrush, 
  ShoppingCart, 
  TrendingUp, 
  Server,
  ArrowRight,
  CheckCircle,
  Code
} from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
  index: number;
  features: string[];
}

const ServiceCard = ({ icon, title, description, colorClass, index, features }: ServiceCardProps) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small delay based on the index for a staggered appearance
          setTimeout(() => {
            setIsVisible(true);
          }, index * 100);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);
  
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`service-card bg-background dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-500 border border-transparent hover:border-primary/20 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className={`w-16 h-16 ${colorClass} rounded-xl flex items-center justify-center mb-6 transform transition-transform duration-500 ${
        isHovered ? 'scale-110 rotate-3' : ''
      }`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {description}
      </p>
      
      {/* Feature list that appears when hovered */}
      <div className={`space-y-2 mb-6 overflow-hidden transition-all duration-500 ${
        isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start">
            <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={16} />
            <span className="ml-2 text-sm text-muted">{feature}</span>
          </div>
        ))}
      </div>
      
      <button 
        onClick={scrollToContact}
        className="text-primary font-medium flex items-center hover:text-secondary transition-colors duration-300 group/btn"
      >
        {t("services.learnMore")}
        <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" size={16} />
      </button>
      
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-transparent border-r-primary/10 rounded-tr-xl"></div>
    </div>
  );
};

const ServicesSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const services = [
    {
      icon: <Laptop className="text-primary text-2xl animate-pulse-gentle" />,
      title: t("services.websiteDev"),
      description: t("services.websiteDesc"),
      colorClass: "bg-primary bg-opacity-10 dark:bg-opacity-20",
      features: [
        t("services.websiteDev") + " - Responsive Design",
        t("services.websiteDev") + " - SEO Optimization",
        t("services.websiteDev") + " - Fast Loading Speed",
      ]
    },
    {
      icon: <Code className="text-secondary text-2xl animate-pulse-gentle" />,
      title: t("services.webAppDev"),
      description: t("services.webAppDesc"),
      colorClass: "bg-secondary bg-opacity-10 dark:bg-opacity-20",
      features: [
        t("services.webAppDev") + " - Custom Functionality",
        t("services.webAppDev") + " - API Integration",
        t("services.webAppDev") + " - Real-time Updates",
      ]
    },
    {
      icon: <Paintbrush className="text-accent text-2xl animate-pulse-gentle" />,
      title: t("services.uiux"),
      description: t("services.uiuxDesc"),
      colorClass: "bg-accent bg-opacity-10 dark:bg-opacity-20",
      features: [
        t("services.uiux") + " - User-Centered Design",
        t("services.uiux") + " - Interaction Design",
        t("services.uiux") + " - Accessibility",
      ]
    },
    {
      icon: <ShoppingCart className="text-primary text-2xl animate-pulse-gentle" />,
      title: t("services.ecommerce"),
      description: t("services.ecommerceDesc"),
      colorClass: "bg-primary bg-opacity-10 dark:bg-opacity-20",
      features: [
        t("services.ecommerce") + " - Secure Payment",
        t("services.ecommerce") + " - Inventory Management",
        t("services.ecommerce") + " - Order Processing",
      ]
    },
    {
      icon: <TrendingUp className="text-secondary text-2xl animate-pulse-gentle" />,
      title: t("services.seo"),
      description: t("services.seoDesc"),
      colorClass: "bg-secondary bg-opacity-10 dark:bg-opacity-20",
      features: [
        t("services.seo") + " - Keyword Optimization",
        t("services.seo") + " - Content Strategy",
        t("services.seo") + " - Performance Analysis",
      ]
    },
    {
      icon: <Server className="text-accent text-2xl animate-pulse-gentle" />,
      title: t("services.maintenance"),
      description: t("services.maintenanceDesc"),
      colorClass: "bg-accent bg-opacity-10 dark:bg-opacity-20",
      features: [
        t("services.maintenance") + " - Regular Updates",
        t("services.maintenance") + " - Security Monitoring",
        t("services.maintenance") + " - Performance Optimization",
      ]
    }
  ];
  
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <section id="services" ref={sectionRef} className="py-20 bg-[#F8F9FA] dark:bg-gray-900/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
        }`}>
          <div className="inline-block mb-3">
            <span className="bg-primary/10 dark:bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              {t("services.title")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t("services.title")}
            <span className="text-primary">.</span>
          </h2>
          <p className="text-muted text-lg max-w-3xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              index={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              colorClass={service.colorClass}
              features={service.features}
            />
          ))}
        </div>
        
        <div className={`mt-16 text-center transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <button
            onClick={scrollToContact}
            className="inline-block bg-secondary hover:bg-opacity-90 text-white px-8 py-4 rounded-md transition-all duration-300 shadow-md hover:shadow-xl font-medium hover:translate-y-[-2px] group"
          >
            {t("services.discussProject")}
            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
