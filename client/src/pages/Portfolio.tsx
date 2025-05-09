import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { 
  Filter, 
  ArrowRight, 
  Code, 
  Eye, 
  Clock, 
  ExternalLink,
  Star
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  tags: string[];
  image: string;
  description: string;
  client: string;
  date: string;
  duration: string;
  link: string;
  featured: boolean;
  achievements: string[];
  technologies: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

  return (
    <div 
      ref={cardRef}
      className={`group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-500 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      } hover:shadow-xl border border-gray-100 dark:border-gray-700`}
    >
      <div className="relative overflow-hidden h-64">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {project.featured && (
          <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="text-sm text-gray-200">{project.category}</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span 
              key={i} 
              className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {project.description}
        </p>
        
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{project.duration}</span>
          </div>
          <div>
            <span>Client: {project.client}</span>
          </div>
        </div>
        
        <a 
          href={`/portfolio/${project.id}`} 
          className="text-primary font-medium flex items-center hover:text-secondary transition-colors duration-300 group"
        >
          View Project
          <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={16} />
        </a>
      </div>
    </div>
  );
};

const FeaturedProject = ({ project }: { project: Project }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl overflow-hidden mb-16">
      <div className="h-full">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-8 md:p-10 xl:p-12">
        <div className="flex items-center mb-4">
          <div className="bg-secondary/10 dark:bg-secondary/20 text-secondary rounded-full px-3 py-1 text-sm font-medium">
            Featured Project
          </div>
          <div className="mx-3 w-4 h-px bg-gray-300 dark:bg-gray-600"></div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">{project.category}</div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4 text-foreground">
          {project.title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {project.description}
        </p>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span 
                key={i} 
                className="text-xs px-2 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-foreground mb-2">Key Achievements</h4>
          <ul className="space-y-2">
            {project.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-secondary mr-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM8.001 14.413L4.288 10.708L5.696 9.292L8.001 11.587L13.394 6.206L14.807 7.619L8.001 14.413Z" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-sm">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <a 
            href={`/portfolio/${project.id}`} 
            className="bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-all duration-300 font-medium flex items-center"
          >
            View Case Study
            <ArrowRight className="ml-2" size={16} />
          </a>
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-foreground px-6 py-3 rounded-md transition-all duration-300 font-medium flex items-center hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Live Preview
            <ExternalLink className="ml-2" size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

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

  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform Redesign",
      category: "web",
      tags: ["E-commerce", "UX/UI", "React"],
      image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      description: "Complete redesign and development of an e-commerce platform with improved conversion rates and customer experience.",
      client: "Fashion Retailer",
      date: "2023",
      duration: "3 months",
      link: "#",
      featured: true,
      achievements: [
        "40% increase in conversion rate",
        "30% reduction in cart abandonment",
        "Improved page load speed by 2.5x",
        "Implemented responsive design for all devices"
      ],
      technologies: ["React", "Node.js", "Redux", "Stripe API", "Material UI"]
    },
    {
      id: 2,
      title: "Real Estate Platform",
      category: "web-app",
      tags: ["Real Estate", "Vue.js", "Google Maps API"],
      image: "https://pixabay.com/get/g27a197a05236ae3db91a1e98bdb81c839dc737aec91072a4e33ca06292247cf1829a535d1d7f792f9b34d832684b5be3469b700cbad4a7fe3275aaeb223e7e5d_1280.jpg",
      description: "A comprehensive real estate platform with advanced search, property listing, and agent contact features.",
      client: "Property Group",
      date: "2022",
      duration: "4 months",
      link: "#",
      featured: false,
      achievements: [
        "Integrated advanced property search with 15+ filters",
        "Built interactive map-based property browsing",
        "Implemented secure messaging system for agents and clients"
      ],
      technologies: ["Vue.js", "Express", "MongoDB", "Google Maps API", "Vuetify"]
    },
    {
      id: 3,
      title: "Fitness App",
      category: "app",
      tags: ["Fitness", "React Native", "Health API"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      description: "Mobile fitness application with workout tracking, nutrition planning, and progress visualization.",
      client: "Health & Fitness Brand",
      date: "2023",
      duration: "5 months",
      link: "#",
      featured: false,
      achievements: [
        "Developed custom workout builder with 200+ exercises",
        "Integrated with health data APIs for activity tracking",
        "Built nutrition tracking with barcode scanner"
      ],
      technologies: ["React Native", "Firebase", "Redux", "Apple HealthKit", "Google Fit API"]
    },
    {
      id: 4,
      title: "Restaurant Ordering System",
      category: "web-app",
      tags: ["Restaurant", "WordPress", "WooCommerce"],
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      description: "Online ordering and reservation system for a chain of restaurants with menu management and kitchen integration.",
      client: "Restaurant Chain",
      date: "2022",
      duration: "2 months",
      link: "#",
      featured: false,
      achievements: [
        "Reduced order processing time by 45%",
        "Integrated with kitchen management system",
        "Implemented loyalty program with rewards"
      ],
      technologies: ["WordPress", "WooCommerce", "PHP", "MySQL", "JavaScript"]
    },
    {
      id: 5,
      title: "Travel Planning Application",
      category: "web-app",
      tags: ["Travel", "Next.js", "Google Maps API"],
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      description: "Comprehensive travel planning application with itinerary building, booking integration, and collaborative planning.",
      client: "Travel Tech Company",
      date: "2023",
      duration: "6 months",
      link: "#",
      featured: true,
      achievements: [
        "Built AI-powered itinerary recommendations",
        "Integrated with 5 major booking platforms",
        "Developed real-time collaboration features"
      ],
      technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "AWS"]
    },
    {
      id: 6,
      title: "Financial Dashboard",
      category: "web-app",
      tags: ["Finance", "Angular", "D3.js"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      description: "Interactive financial dashboard with data visualization, reporting, and investment tracking features.",
      client: "Financial Services Firm",
      date: "2022",
      duration: "4 months",
      link: "#",
      featured: false,
      achievements: [
        "Developed interactive data visualizations for complex financial data",
        "Implemented real-time data updates for market changes",
        "Created customizable reporting system"
      ],
      technologies: ["Angular", "D3.js", "TypeScript", "Node.js", "Express"]
    },
    {
      id: 7,
      title: "Educational Platform",
      category: "web",
      tags: ["Education", "React", "Firebase"],
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      description: "Comprehensive learning management system with course creation, student progress tracking, and interactive assessments.",
      client: "Educational Technology Startup",
      date: "2023",
      duration: "5 months",
      link: "#",
      featured: false,
      achievements: [
        "Developed interactive quiz system with instant feedback",
        "Built video-based learning platform with progress tracking",
        "Implemented gamification elements for student engagement"
      ],
      technologies: ["React", "Firebase", "Redux", "Node.js", "Express"]
    },
    {
      id: 8,
      title: "Healthcare Portal",
      category: "web-app",
      tags: ["Healthcare", "React", "HIPAA Compliant"],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      description: "Secure patient portal for medical records access, appointment scheduling, and telemedicine integration.",
      client: "Healthcare Provider",
      date: "2022",
      duration: "7 months",
      link: "#",
      featured: false,
      achievements: [
        "Built HIPAA-compliant secure messaging system",
        "Integrated with electronic health records system",
        "Developed telemedicine video consultation feature"
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "WebRTC", "AWS"]
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const filterOptions = [
    { value: "all", label: "All Projects" },
    { value: "web", label: "Websites" },
    { value: "web-app", label: "Web Applications" },
    { value: "app", label: "Mobile Apps" }
  ];

  return (
    <>
      <Helmet>
        <title>Our Portfolio | makemate Web Development & Design</title>
        <meta name="description" content="Explore our portfolio of web development, design, and digital marketing projects. See how we've helped clients across various industries achieve their digital goals." />
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
              Our Work
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Featured <span className="text-primary">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              Explore our portfolio of successful projects across various industries. 
              Each one represents our commitment to quality, innovation, and results.
            </p>
            
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-6">
              <button 
                onClick={() => setShowMobileFilter(!showMobileFilter)}
                className="flex items-center justify-center w-full bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-foreground font-medium"
              >
                <Filter size={16} className="mr-2" />
                {filterOptions.find(option => option.value === activeFilter)?.label}
              </button>
              
              {showMobileFilter && (
                <div className="mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2 border border-gray-200 dark:border-gray-700 absolute left-6 right-6 z-20">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setActiveFilter(option.value);
                        setShowMobileFilter(false);
                      }}
                      className={`block w-full text-left px-4 py-2 rounded-md text-sm ${
                        activeFilter === option.value
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-foreground'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Desktop Filters */}
            <div className="hidden md:flex flex-wrap justify-center mb-10 gap-2">
              {filterOptions.map((option) => (
                <button 
                  key={option.value}
                  onClick={() => setActiveFilter(option.value)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === option.value
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Featured Projects */}
        {activeFilter === "all" && (
          <div className="container mx-auto px-6 mb-24">
            {featuredProjects.map((project) => (
              <FeaturedProject key={project.id} project={project} />
            ))}
          </div>
        )}
        
        {/* Projects Grid */}
        <div className="container mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="bg-gray-50 dark:bg-gray-900/50 py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Completed Projects</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="text-4xl font-bold text-secondary mb-2">35</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Happy Clients</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="text-4xl font-bold text-accent mb-2">12</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Industries Served</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="text-4xl font-bold text-primary mb-2">5</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Years of Experience</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Process Section */}
        <div className="container mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-secondary/10 dark:bg-secondary/20 text-secondary rounded-full inline-block px-4 py-1 mb-4 text-sm font-medium">
              Our Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              How We <span className="text-secondary">Work</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our proven process ensures successful outcomes for every project. 
              We value collaboration, transparency, and attention to detail.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-full text-white font-bold text-xl">1</div>
                <div className="h-1 flex-grow bg-primary/20 ml-4 md:hidden"></div>
              </div>
              <div className="md:pl-16 md:ml-6 md:border-l md:border-primary/20 pb-12">
                <h3 className="text-xl font-bold mb-3 text-foreground">Discovery</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We begin by understanding your business, goals, and requirements. 
                  This phase involves detailed discussions to align on project scope, 
                  objectives, and success metrics.
                </p>
              </div>
              <div className="hidden md:block absolute top-0 left-6 w-0.5 h-full bg-primary/20"></div>
            </div>
            
            <div className="relative">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-full text-white font-bold text-xl">2</div>
                <div className="h-1 flex-grow bg-secondary/20 ml-4 md:hidden"></div>
              </div>
              <div className="md:pl-16 md:ml-6 md:border-l md:border-secondary/20 pb-12">
                <h3 className="text-xl font-bold mb-3 text-foreground">Design & Development</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our designers and developers work collaboratively to create 
                  beautiful, functional solutions. We follow an iterative approach 
                  with regular check-ins to ensure everything meets your expectations.
                </p>
              </div>
              <div className="hidden md:block absolute top-0 left-6 w-0.5 h-full bg-secondary/20"></div>
            </div>
            
            <div className="relative">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-accent flex items-center justify-center rounded-full text-white font-bold text-xl">3</div>
                <div className="h-1 flex-grow bg-accent/20 ml-4 md:hidden"></div>
              </div>
              <div className="md:pl-16 md:ml-6 md:border-l md:border-accent/20 pb-12">
                <h3 className="text-xl font-bold mb-3 text-foreground">Launch & Support</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  After thorough testing, we deploy your project and provide 
                  comprehensive training. Our relationship continues with ongoing 
                  support and maintenance to ensure long-term success.
                </p>
              </div>
              <div className="hidden md:block absolute top-0 left-6 w-0.5 h-full bg-accent/20"></div>
            </div>
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

export default Portfolio;