import { useTranslation } from "react-i18next";
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  Dribbble, 
  Github, 
  SquareStack 
} from "lucide-react";

interface TeamMemberProps {
  image: string;
  name: string;
  position: string;
  bio: string;
  socialLinks: {
    icon: React.ReactNode;
    url: string;
    colorClass: string;
  }[];
}

const TeamMember = ({ image, name, position, bio, socialLinks }: TeamMemberProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h4 className="font-semibold text-xl mb-1">{name}</h4>
        <p className={`${position.includes("Creative") || position.includes("Project") ? 'text-secondary' : 'text-primary'} text-sm mb-4`}>{position}</p>
        <p className="text-muted text-sm">{bio}</p>
        <div className="flex mt-4 space-x-3">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url} 
              className={`text-muted hover:${link.colorClass} transition-colors duration-300`}
              aria-label={`${name}'s social link`}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutSection = () => {
  const { t } = useTranslation();
  
  const teamMembers = [
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      name: t("about.team.ceo.name"),
      position: t("about.team.ceo.position"),
      bio: t("about.team.ceo.bio"),
      socialLinks: [
        { icon: <Linkedin size={18} />, url: "#", colorClass: "text-primary" },
        { icon: <Twitter size={18} />, url: "#", colorClass: "text-primary" },
        { icon: <Mail size={18} />, url: "#", colorClass: "text-primary" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      name: t("about.team.designer.name"),
      position: t("about.team.designer.position"),
      bio: t("about.team.designer.bio"),
      socialLinks: [
        { icon: <Dribbble size={18} />, url: "#", colorClass: "text-secondary" },
        { icon: <Linkedin size={18} />, url: "#", colorClass: "text-secondary" },
        { icon: <Mail size={18} />, url: "#", colorClass: "text-secondary" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      name: t("about.team.developer.name"),
      position: t("about.team.developer.position"),
      bio: t("about.team.developer.bio"),
      socialLinks: [
        { icon: <Github size={18} />, url: "#", colorClass: "text-primary" },
        { icon: <SquareStack size={18} />, url: "#", colorClass: "text-primary" },
        { icon: <Mail size={18} />, url: "#", colorClass: "text-primary" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      name: t("about.team.manager.name"),
      position: t("about.team.manager.position"),
      bio: t("about.team.manager.bio"),
      socialLinks: [
        { icon: <Linkedin size={18} />, url: "#", colorClass: "text-secondary" },
        { icon: <Twitter size={18} />, url: "#", colorClass: "text-secondary" },
        { icon: <Mail size={18} />, url: "#", colorClass: "text-secondary" }
      ]
    }
  ];
  
  return (
    <section id="about" className="py-20 bg-[#F8F9FA]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("about.title")}</h2>
          <p className="text-muted text-lg max-w-3xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
              alt={t("about.imageAlt")} 
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">{t("about.story.title")}</h3>
            <p className="text-muted mb-6 leading-relaxed">
              {t("about.story.p1")}
            </p>
            <p className="text-muted mb-6 leading-relaxed">
              {t("about.story.p2")}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <h4 className="font-semibold text-lg mb-1">25+</h4>
                <p className="text-sm text-muted">{t("about.stats.team")}</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <h4 className="font-semibold text-lg mb-1">10+</h4>
                <p className="text-sm text-muted">{t("about.stats.experience")}</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <h4 className="font-semibold text-lg mb-1">150+</h4>
                <p className="text-sm text-muted">{t("about.stats.projects")}</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <h4 className="font-semibold text-lg mb-1">12</h4>
                <p className="text-sm text-muted">{t("about.stats.awards")}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <h3 className="text-2xl font-semibold mb-10 text-center">{t("about.team.title")}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                image={member.image}
                name={member.name}
                position={member.position}
                bio={member.bio}
                socialLinks={member.socialLinks}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
