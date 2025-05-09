import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  delay: number;
  isVisible: boolean;
}

const ProcessStep = ({ number, title, description, delay, isVisible }: ProcessStepProps) => {
  return (
    <div 
      className={`flex group transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex-shrink-0 mr-6">
        <div className="w-12 h-12 bg-primary/90 dark:bg-primary/80 text-white rounded-full flex items-center justify-center font-semibold text-xl shadow-md transition-all duration-300 group-hover:scale-110">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const ProcessSection = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
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
  
  const processSteps = [
    {
      number: 1,
      title: t("process.discovery.title"),
      description: t("process.discovery.description")
    },
    {
      number: 2,
      title: t("process.design.title"),
      description: t("process.design.description")
    },
    {
      number: 3,
      title: t("process.development.title"),
      description: t("process.development.description")
    },
    {
      number: 4,
      title: t("process.testing.title"),
      description: t("process.testing.description")
    },
    {
      number: 5,
      title: t("process.support.title"),
      description: t("process.support.description")
    }
  ];
  
  return (
    <section ref={sectionRef} className="py-20 bg-[#F8F9FA] dark:bg-gray-900/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
        }`}>
          <div className="inline-block mb-3">
            <span className="bg-primary/10 dark:bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              {t("process.title")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t("process.title")}
            <span className="text-primary">.</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            {t("process.subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`order-2 md:order-1 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-30 blur-xl rounded-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=900" 
                alt={t("process.imageAlt")} 
                className="rounded-2xl shadow-2xl w-full relative"
              />
              <div className="absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                    <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">100% Satisfaction</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="space-y-10">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={index}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  delay={index * 100}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
