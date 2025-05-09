import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { 
  ArrowRight, 
  Users, 
  Award, 
  Clock, 
  Target, 
  Heart,
  Globe,
  Zap,
  Sparkles,
  Coffee
} from "lucide-react";

interface TeamMember {
  name: string;
  position: string;
  image: string;
  bio: string;
  socialLinks: {
    icon: React.ReactNode;
    url: string;
    label: string;
  }[];
}

interface Achievement {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const TeamMemberCard = ({ member, index }: { member: TeamMember, index: number }) => {
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
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-500 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      } hover:shadow-xl group border border-gray-100 dark:border-gray-700`}
    >
      <div className="relative overflow-hidden h-72">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-6 w-full">
            <div className="flex space-x-3 justify-center">
              {member.socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
        <p className="text-primary text-sm font-medium mb-4">{member.position}</p>
        <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
      </div>
    </div>
  );
};

const ValueCard = ({ value, index }: { value: Value, index: number }) => {
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
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-500 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      } hover:shadow-xl border border-gray-100 dark:border-gray-700`}
    >
      <div className={`w-12 h-12 ${value.color} rounded-lg flex items-center justify-center mb-6`}>
        {value.icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
      <p className="text-gray-600 dark:text-gray-300">
        {value.description}
      </p>
    </div>
  );
};

const TimelineItem = ({ event, index, isLast }: { event: TimelineEvent, index: number, isLast: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
      className={`flex transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center mr-6">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
          {event.year}
        </div>
        {!isLast && <div className="w-0.5 bg-primary/20 flex-grow mt-3"></div>}
      </div>
      <div className={`pb-8 ${isLast ? '' : ''}`}>
        <h3 className="text-xl font-bold mb-2 text-foreground">{event.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
      </div>
    </div>
  );
};

const About = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  const teamMembers: TeamMember[] = [
    {
      name: "Alex Johnson",
      position: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&h=950&crop=entropy",
      bio: "With over 15 years of experience in web development and digital strategy, Alex founded makemate to help businesses thrive in the digital world.",
      socialLinks: [
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>,
          url: "#",
          label: "LinkedIn"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg>,
          url: "#",
          label: "Twitter"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/></svg>,
          url: "#",
          label: "Instagram"
        }
      ]
    },
    {
      name: "Sarah Kim",
      position: "Lead Designer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&h=950&crop=entropy",
      bio: "Sarah combines creativity with user-centered design principles to create beautiful, functional interfaces that engage and convert.",
      socialLinks: [
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>,
          url: "#",
          label: "LinkedIn"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>,
          url: "#",
          label: "LinkedIn"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>,
          url: "#",
          label: "GitHub"
        }
      ]
    },
    {
      name: "Michael Chen",
      position: "Lead Developer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&h=950&crop=entropy",
      bio: "Michael is a full-stack developer with expertise in modern web technologies and a passion for creating elegant, efficient code.",
      socialLinks: [
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>,
          url: "#",
          label: "LinkedIn"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>,
          url: "#",
          label: "GitHub"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg>,
          url: "#",
          label: "Twitter"
        }
      ]
    },
    {
      name: "Emily Rodriguez",
      position: "Project Manager",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&h=950&crop=entropy",
      bio: "Emily ensures projects run smoothly from start to finish, keeping everything on track and facilitating clear communication between all stakeholders.",
      socialLinks: [
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>,
          url: "#",
          label: "LinkedIn"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg>,
          url: "#",
          label: "Twitter"
        }
      ]
    }
  ];

  const achievements: Achievement[] = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      value: "120+",
      label: "Happy Clients"
    },
    {
      icon: <Award className="h-6 w-6 text-secondary" />,
      value: "15",
      label: "Industry Awards"
    },
    {
      icon: <Clock className="h-6 w-6 text-accent" />,
      value: "5+",
      label: "Years of Experience"
    },
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      value: "250+",
      label: "Projects Completed"
    }
  ];

  const values: Value[] = [
    {
      icon: <Heart className="h-7 w-7 text-white" />,
      title: "Client Focused",
      description: "We put our clients at the center of everything we do, striving to exceed expectations and build lasting partnerships.",
      color: "bg-primary"
    },
    {
      icon: <Zap className="h-7 w-7 text-white" />,
      title: "Innovation",
      description: "We constantly explore new technologies and approaches to deliver cutting-edge solutions that keep our clients ahead of the curve.",
      color: "bg-secondary"
    },
    {
      icon: <Sparkles className="h-7 w-7 text-white" />,
      title: "Quality",
      description: "We're committed to excellence in every aspect of our work, from design and development to testing and support.",
      color: "bg-accent"
    },
    {
      icon: <Globe className="h-7 w-7 text-white" />,
      title: "Sustainability",
      description: "We build sustainable digital products that are not only beautiful and functional but also environmentally responsible.",
      color: "bg-primary"
    },
    {
      icon: <Users className="h-7 w-7 text-white" />,
      title: "Collaboration",
      description: "We believe in the power of teamwork, both within our company and with our clients, to achieve exceptional results.",
      color: "bg-secondary"
    },
    {
      icon: <Coffee className="h-7 w-7 text-white" />,
      title: "Work-Life Balance",
      description: "We foster a healthy work environment that allows our team to thrive professionally while maintaining personal well-being.",
      color: "bg-accent"
    }
  ];

  const timeline: TimelineEvent[] = [
    {
      year: "2018",
      title: "Company Founded",
      description: "makemate was established with a vision to help businesses succeed in the digital world through innovative web solutions."
    },
    {
      year: "2019",
      title: "First Major Client",
      description: "Secured our first enterprise client and expanded the team to meet growing demand for our services."
    },
    {
      year: "2020",
      title: "Remote Transformation",
      description: "Successfully transitioned to a fully remote operation while maintaining productivity and client satisfaction."
    },
    {
      year: "2021",
      title: "International Expansion",
      description: "Began serving clients internationally and implemented a 24/7 support system to accommodate global time zones."
    },
    {
      year: "2022",
      title: "Team Growth",
      description: "Doubled our team size and expanded service offerings to include mobile app development and digital marketing."
    },
    {
      year: "2023",
      title: "Award Recognition",
      description: "Received multiple industry awards for excellence in web design and development, including 'Agency of the Year'."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | makemate Web Development & Design</title>
        <meta name="description" content="Learn about makemate - who we are, our mission, values, and the talented team behind our digital solutions. Discover how we help businesses succeed online." />
      </Helmet>
      
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <div 
          ref={headerRef}
          className={`container mx-auto px-6 mb-24 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-primary/10 dark:bg-primary/20 text-primary rounded-full inline-block px-4 py-1 mb-4 text-sm font-medium">
              Our Story
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Who We <span className="text-primary">Are</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              We're a team of passionate digital creators dedicated to helping businesses
              succeed in the digital world through innovative, user-centered design and development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800&q=80" 
                alt="Our team at work" 
                className="rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                At makemate, our mission is to empower businesses of all sizes with cutting-edge digital solutions that drive growth and enhance user experiences. We believe in creating not just websites and applications, but meaningful digital experiences that connect businesses with their audiences.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Founded in 2018, we've grown from a small team of passionate developers to a full-service digital agency, helping clients across multiple industries transform their digital presence and achieve their goals.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-primary mr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C18.617 24 24 18.617 24 12C24 5.383 18.617 0 12 0ZM9.6 17.295L5.705 13.4L7.123 11.982L9.6 14.459L16.877 7.182L18.295 8.6L9.6 17.295Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">User-centered approach to design and development</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-primary mr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C18.617 24 24 18.617 24 12C24 5.383 18.617 0 12 0ZM9.6 17.295L5.705 13.4L7.123 11.982L9.6 14.459L16.877 7.182L18.295 8.6L9.6 17.295Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Commitment to quality and attention to detail</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-primary mr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C18.617 24 24 18.617 24 12C24 5.383 18.617 0 12 0ZM9.6 17.295L5.705 13.4L7.123 11.982L9.6 14.459L16.877 7.182L18.295 8.6L9.6 17.295Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Transparent communication and collaborative approach</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-primary mr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C18.617 24 24 18.617 24 12C24 5.383 18.617 0 12 0ZM9.6 17.295L5.705 13.4L7.123 11.982L9.6 14.459L16.877 7.182L18.295 8.6L9.6 17.295Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Continuous learning and staying ahead of industry trends</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Achievements Section */}
        <div className="bg-gray-50 dark:bg-gray-900/50 py-16 mb-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
                  <div className="flex justify-center mb-3">
                    {achievement.icon}
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">{achievement.value}</div>
                  <div className="text-gray-500 dark:text-gray-400">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="container mx-auto px-6 mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-secondary/10 dark:bg-secondary/20 text-secondary rounded-full inline-block px-4 py-1 mb-4 text-sm font-medium">
              Our Values
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              What We <span className="text-secondary">Believe In</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our core values guide everything we do, from how we work together as a team 
              to how we approach projects and interact with our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard key={index} value={value} index={index} />
            ))}
          </div>
        </div>
        
        {/* Timeline Section */}
        <div className="bg-gray-50 dark:bg-gray-900/50 py-24 mb-24">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="bg-primary/10 dark:bg-primary/20 text-primary rounded-full inline-block px-4 py-1 mb-4 text-sm font-medium">
                Our Journey
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                How We've <span className="text-primary">Grown</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                From our humble beginnings to where we are today, we're proud of the 
                journey we've taken and excited about what lies ahead.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {timeline.map((event, index) => (
                <TimelineItem 
                  key={index} 
                  event={event} 
                  index={index} 
                  isLast={index === timeline.length - 1} 
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="container mx-auto px-6 mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-accent/10 dark:bg-accent/20 text-accent rounded-full inline-block px-4 py-1 mb-4 text-sm font-medium">
              Our Team
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Meet The <span className="text-accent">People</span> Behind makemate
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our talented team brings together a diverse range of skills and experiences,
              united by a shared passion for creating exceptional digital experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} index={index} />
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Work With Us?</h2>
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

export default About;