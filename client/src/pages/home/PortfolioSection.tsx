import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, ExternalLink, Eye, Code, Clock } from "lucide-react";

interface PortfolioItemProps {
  image: string;
  title: string;
  description: string;
  bgColor: string;
  buttonColor: string;
  altText: string;
  viewCaseText: string;
  tags: string[];
  index: number;
}

const PortfolioItem = ({ 
  image, 
  title, 
  description, 
  bgColor, 
  buttonColor, 
  altText, 
  viewCaseText,
  tags,
  index
}: PortfolioItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small delay based on the index for a staggered appearance
          setTimeout(() => {
            setIsVisible(true);
          }, index * 150);
        }
      },
      { threshold: 0.1 }
    );
    
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    
    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [index]);

  return (
    <div 
      ref={itemRef}
      className={`portfolio-item relative group rounded-xl overflow-hidden shadow-lg transition-all duration-700 transform
        ${isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-2'}
      `}
    >
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        {tags.map((tag, idx) => (
          <span 
            key={idx} 
            className={`text-xs font-medium py-1 px-2 rounded-full ${
              idx % 2 === 0 ? 'bg-primary/80 text-white' : 'bg-secondary/80 text-white'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="h-72 overflow-hidden">
        <img 
          src={image} 
          alt={altText} 
          className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
      </div>
      
      <div className={`portfolio-overlay absolute inset-0 ${bgColor} flex flex-col justify-center items-center p-6 opacity-0 transition-all duration-500`}>
        <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
          <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
          <p className="text-white text-center mb-6">{description}</p>
          
          <div className="flex justify-center space-x-3 mb-6">
            <div className="flex flex-col items-center text-white/80">
              <Eye size={20} className="mb-1" />
              <span className="text-xs">UI/UX</span>
            </div>
            <div className="flex flex-col items-center text-white/80">
              <Code size={20} className="mb-1" />
              <span className="text-xs">Dev</span>
            </div>
            <div className="flex flex-col items-center text-white/80">
              <Clock size={20} className="mb-1" />
              <span className="text-xs">3 weeks</span>
            </div>
          </div>
          
          <button className={`bg-white ${buttonColor} px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300 flex items-center mx-auto`}>
            {viewCaseText}
            <ExternalLink size={16} className="ml-2" />
          </button>
        </div>
      </div>
      
      {/* Bottom info bar that slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-background dark:bg-gray-800 p-4 transform transition-transform duration-500 translate-y-full group-hover:translate-y-0">
        <h3 className="text-foreground font-semibold mb-1 truncate">{title}</h3>
        <p className="text-muted text-sm line-clamp-1">{description}</p>
      </div>
    </div>
  );
};

const PortfolioSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  
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
  
  const portfolioItems = [
    {
      image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: t("portfolio.items.ecommerce.title"),
      description: t("portfolio.items.ecommerce.description"),
      bgColor: "bg-primary bg-opacity-90",
      buttonColor: "text-primary",
      altText: t("portfolio.items.ecommerce.alt"),
      viewCaseText: t("portfolio.viewCase"),
      tags: ["E-commerce", "React"],
      category: "web"
    },
    {
      image: "https://pixabay.com/get/g27a197a05236ae3db91a1e98bdb81c839dc737aec91072a4e33ca06292247cf1829a535d1d7f792f9b34d832684b5be3469b700cbad4a7fe3275aaeb223e7e5d_1280.jpg",
      title: t("portfolio.items.realEstate.title"),
      description: t("portfolio.items.realEstate.description"),
      bgColor: "bg-secondary bg-opacity-90",
      buttonColor: "text-secondary",
      altText: t("portfolio.items.realEstate.alt"),
      viewCaseText: t("portfolio.viewCase"),
      tags: ["Real Estate", "Vue.js"],
      category: "app"
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: t("portfolio.items.fitness.title"),
      description: t("portfolio.items.fitness.description"),
      bgColor: "bg-primary bg-opacity-90",
      buttonColor: "text-primary",
      altText: t("portfolio.items.fitness.alt"),
      viewCaseText: t("portfolio.viewCase"),
      tags: ["Fitness", "React Native"],
      category: "app"
    },
    {
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: t("portfolio.items.restaurant.title"),
      description: t("portfolio.items.restaurant.description"),
      bgColor: "bg-secondary bg-opacity-90",
      buttonColor: "text-secondary",
      altText: t("portfolio.items.restaurant.alt"),
      viewCaseText: t("portfolio.viewCase"),
      tags: ["Restaurant", "WordPress"],
      category: "web"
    },
    {
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: t("portfolio.items.travel.title"),
      description: t("portfolio.items.travel.description"),
      bgColor: "bg-primary bg-opacity-90",
      buttonColor: "text-primary",
      altText: t("portfolio.items.travel.alt"),
      viewCaseText: t("portfolio.viewCase"),
      tags: ["Travel", "Next.js"],
      category: "website"
    },
    {
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: t("portfolio.items.finance.title"),
      description: t("portfolio.items.finance.description"),
      bgColor: "bg-secondary bg-opacity-90",
      buttonColor: "text-secondary",
      altText: t("portfolio.items.finance.alt"),
      viewCaseText: t("portfolio.viewCase"),
      tags: ["Finance", "Angular"],
      category: "web-app"
    }
  ];
  
  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);
  
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };
  
  return (
    <section id="portfolio" ref={sectionRef} className="py-20 bg-[#F8F9FA] dark:bg-gray-900/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary/50 via-primary/50 to-accent/50"></div>
      <div className="absolute -top-48 -right-48 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className={`text-center mb-12 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
        }`}>
          <div className="inline-block mb-3">
            <span className="bg-secondary/10 dark:bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-sm font-medium">
              {t("portfolio.title")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t("portfolio.title")}
            <span className="text-secondary">.</span>
          </h2>
          <p className="text-muted text-lg max-w-3xl mx-auto">
            {t("portfolio.subtitle")}
          </p>
        </div>
        
        {/* Project Filters */}
        <div className={`flex flex-wrap justify-center mb-10 gap-2 transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <button 
            onClick={() => handleFilterChange('all')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === 'all' 
                ? 'bg-secondary text-white shadow-md' 
                : 'bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {t("portfolio.filters.all")}
          </button>
          <button 
            onClick={() => handleFilterChange('web')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === 'web' 
                ? 'bg-secondary text-white shadow-md' 
                : 'bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {t("portfolio.filters.web")}
          </button>
          <button 
            onClick={() => handleFilterChange('app')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === 'app' 
                ? 'bg-secondary text-white shadow-md' 
                : 'bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {t("portfolio.filters.app")}
          </button>
          <button 
            onClick={() => handleFilterChange('website')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === 'website' 
                ? 'bg-secondary text-white shadow-md' 
                : 'bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {t("portfolio.filters.website")}
          </button>
          <button 
            onClick={() => handleFilterChange('web-app')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === 'web-app' 
                ? 'bg-secondary text-white shadow-md' 
                : 'bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {t("portfolio.filters.webApp")}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <PortfolioItem
              key={index}
              index={index}
              image={item.image}
              title={item.title}
              description={item.description}
              bgColor={item.bgColor}
              buttonColor={item.buttonColor}
              altText={item.altText}
              viewCaseText={item.viewCaseText}
              tags={item.tags}
            />
          ))}
        </div>
        
        <div className={`mt-16 text-center transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <button
            onClick={scrollToContact}
            className="inline-block bg-primary hover:bg-opacity-90 text-white px-8 py-4 rounded-md transition-all duration-300 shadow-md hover:shadow-xl font-medium hover:translate-y-[-2px] group"
          >
            {t("portfolio.startProject")}
            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
