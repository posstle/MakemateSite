import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, CheckCircle, Layers, Code, PenTool, BarChart, Globe, Cpu } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  colorClass: string;
  delay: number;
}

const ServiceCard = ({ icon, title, description, features, colorClass, delay }: ServiceCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
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
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-500 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
    >
      <div className={`w-14 h-14 ${colorClass} rounded-lg flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-foreground">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        {description}
      </p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="text-primary h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <button className="text-primary font-medium flex items-center hover:text-secondary transition-colors duration-300 group">
        Learn more
        <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={16} />
      </button>
    </div>
  );
};

const ServiceFAQItem = ({ question, answer, isOpen, onClick }: { 
  question: string; 
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-5">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-foreground">{question}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div className={`mt-2 transform transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-600 dark:text-gray-300 py-2">{answer}</p>
      </div>
    </div>
  );
};

const Services = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [activeFAQ, setActiveFAQ] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    
    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const servicesData = [
    {
      icon: <Layers className="h-7 w-7 text-white" />,
      title: t("services.websiteDev"),
      description: "Create stunning, responsive websites that reflect your brand identity and engage your visitors.",
      features: [
        "Custom responsive design",
        "SEO optimization",
        "Content management",
        "Website maintenance",
        "Performance optimization"
      ],
      colorClass: "bg-primary",
      category: "web"
    },
    {
      icon: <Code className="h-7 w-7 text-white" />,
      title: t("services.webAppDev"),
      description: "Build powerful web applications with intuitive interfaces and robust functionality.",
      features: [
        "User-centered design",
        "Secure authentication",
        "API integration",
        "Real-time features",
        "Scalable architecture"
      ],
      colorClass: "bg-secondary",
      category: "app"
    },
    {
      icon: <PenTool className="h-7 w-7 text-white" />,
      title: t("services.uiux"),
      description: "Create intuitive, engaging interfaces that enhance user experience and satisfaction.",
      features: [
        "User research",
        "Wireframing & prototyping",
        "Visual design",
        "Usability testing",
        "Design systems"
      ],
      colorClass: "bg-accent",
      category: "design"
    },
    {
      icon: <BarChart className="h-7 w-7 text-white" />,
      title: t("services.seo"),
      description: "Optimize your digital presence to rank higher in search results and attract more visitors.",
      features: [
        "Keyword research",
        "On-page optimization",
        "Content strategy",
        "Technical SEO",
        "Performance monitoring"
      ],
      colorClass: "bg-primary",
      category: "marketing"
    },
    {
      icon: <Globe className="h-7 w-7 text-white" />,
      title: t("services.ecommerce"),
      description: "Build powerful online stores with seamless checkout processes and customer experiences.",
      features: [
        "Product management",
        "Payment processing",
        "Inventory tracking",
        "Customer accounts",
        "Mobile optimization"
      ],
      colorClass: "bg-secondary",
      category: "web"
    },
    {
      icon: <Cpu className="h-7 w-7 text-white" />,
      title: "API Development",
      description: "Create robust, scalable APIs that connect your systems and enable powerful integrations.",
      features: [
        "RESTful architecture",
        "Authentication & security",
        "Documentation",
        "Performance optimization",
        "Versioning"
      ],
      colorClass: "bg-accent",
      category: "app"
    }
  ];

  const filteredServices = activeTab === "all" 
    ? servicesData 
    : servicesData.filter(service => service.category === activeTab);

  const faqData = [
    {
      question: "What is your development process like?",
      answer: "Our development process follows an agile methodology with 5 key phases: discovery, planning, design, development, and post-launch support. We keep you involved throughout the process with regular updates and feedback sessions to ensure your vision is realized."
    },
    {
      question: "How long does it take to complete a project?",
      answer: "Project timelines vary depending on complexity and scope. A basic website may take 4-6 weeks, while complex web applications could take 3-6 months or more. During our discovery phase, we'll provide you with a detailed timeline specific to your project requirements."
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer: "Yes, we offer various maintenance and support packages to keep your digital products running smoothly after launch. These include regular updates, security patches, performance optimization, and technical support for any issues that may arise."
    },
    {
      question: "What technologies do you use for development?",
      answer: "We specialize in modern web technologies including React, Node.js, Next.js, Vue.js, and TypeScript for frontend and backend development. For e-commerce, we work with platforms like Shopify and WooCommerce. Our technology choices are always aligned with your specific project requirements and long-term goals."
    },
    {
      question: "How do you handle project revisions and changes?",
      answer: "We build flexibility into our process to accommodate revisions. Each project phase includes designated review periods for feedback. For changes outside the initial project scope, we handle them through a transparent change request process, ensuring clear communication about any impacts on timeline or budget."
    }
  ];

  const handleFAQClick = (index: number) => {
    setActiveFAQ(index === activeFAQ ? -1 : index);
  };

  return (
    <>
      <Helmet>
        <title>Our Services | makemate Web Development & Design</title>
        <meta name="description" content="Explore our comprehensive range of web development, design, and digital marketing services. From responsive websites to complex web applications, we deliver solutions that drive results." />
      </Helmet>
      
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <div 
          ref={headerRef}
          className={`container mx-auto px-6 mb-24 transition-all duration-1000 transform ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center max-w-3xl mx-auto">
            <div className="bg-primary/10 dark:bg-primary/20 text-primary rounded-full inline-block px-4 py-1 mb-4 text-sm font-medium">
              Our Expertise
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Comprehensive Digital <span className="text-primary">Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              Expert solutions tailored to your needs. From concept to completion, 
              we deliver high-quality digital experiences that transform ideas into reality.
            </p>
            
            <div className="flex flex-wrap justify-center mb-10 gap-2">
              <button 
                onClick={() => setActiveTab("all")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'all' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                All Services
              </button>
              <button 
                onClick={() => setActiveTab("web")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'web' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Web Development
              </button>
              <button 
                onClick={() => setActiveTab("app")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'app' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                App Development
              </button>
              <button 
                onClick={() => setActiveTab("design")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'design' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Design
              </button>
              <button 
                onClick={() => setActiveTab("marketing")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'marketing' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Digital Marketing
              </button>
            </div>
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="container mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                colorClass={service.colorClass}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
        
        {/* Process Section */}
        <div className="bg-gray-50 dark:bg-gray-900/50 py-24">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="bg-secondary/10 dark:bg-secondary/20 text-secondary rounded-full inline-block px-4 py-1 mb-4 text-sm font-medium">
                Our Approach
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                How We <span className="text-secondary">Work</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Our structured approach ensures smooth collaboration and successful outcomes.
                We value transparency and keep you involved throughout the process.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full"></div>
                <div className="bg-primary/90 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-white font-bold text-xl">1</div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Discovery & Planning</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 relative z-10">
                  We begin by understanding your business, goals, and requirements through in-depth consultations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Requirements gathering</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Project scope definition</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Timeline & milestone planning</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-bl-full"></div>
                <div className="bg-secondary/90 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-white font-bold text-xl">2</div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Design & Development</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 relative z-10">
                  We create stunning designs and implement them with clean, efficient code.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="text-secondary h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">UI/UX design & prototyping</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-secondary h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Frontend & backend development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-secondary h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Regular progress updates</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-full"></div>
                <div className="bg-accent/90 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-white font-bold text-xl">3</div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Testing & Launch</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 relative z-10">
                  We thoroughly test everything before delivery and provide support after launch.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="text-accent h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Quality assurance testing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-accent h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Deployment & launch</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-accent h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Post-launch support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="container mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-primary/10 dark:bg-primary/20 text-primary rounded-full inline-block px-4 py-1 mb-4 text-sm font-medium">
              FAQs
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get answers to common questions about our services, process, and more.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqData.map((faq, index) => (
              <ServiceFAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={activeFAQ === index}
                onClick={() => handleFAQClick(index)}
              />
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
            <p className="text-white text-lg mb-10 max-w-3xl mx-auto opacity-90">
              Let's transform your ideas into reality. Contact us today for a free consultation
              and learn how we can help you achieve your digital goals.
            </p>
            <a 
              href="/contact"
              className="inline-block bg-white text-primary hover:bg-opacity-90 px-8 py-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg font-medium"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;