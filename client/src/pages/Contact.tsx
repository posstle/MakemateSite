import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  MessageSquare,
  Send,
  Info,
  Briefcase,
  Users
} from "lucide-react";

// FAQ Component
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-5">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full text-left"
        aria-expanded={isOpen}
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

// Office Card Component
interface OfficeProps {
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  image: string;
  index: number;
}

const OfficeCard = ({ city, address, phone, email, hours, image, index }: OfficeProps) => {
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
      } hover:shadow-xl border border-gray-100 dark:border-gray-700`}
    >
      <img 
        src={image} 
        alt={`${city} Office`} 
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">{city}</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
            <p className="text-gray-600 dark:text-gray-300">{address}</p>
          </div>
          <div className="flex items-start">
            <Phone className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
            <p className="text-gray-600 dark:text-gray-300">{phone}</p>
          </div>
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
            <p className="text-gray-600 dark:text-gray-300">{email}</p>
          </div>
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
            <p className="text-gray-600 dark:text-gray-300">{hours}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Service Card Component
interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  color: string;
}

const ServiceCard = ({ icon, title, description, index, color }: ServiceProps) => {
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
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all duration-500 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      } hover:shadow-lg border border-gray-100 dark:border-gray-700`}
    >
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
};

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
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
  
  const formSchema = z.object({
    name: z.string().min(2, t("contact.validation.nameRequired")),
    email: z.string().email(t("contact.validation.emailInvalid")),
    company: z.string().optional(),
    subject: z.string().min(2, t("contact.validation.subjectRequired")),
    message: z.string().min(10, t("contact.validation.messageRequired")),
    agreement: z.boolean().refine(val => val === true, {
      message: t("contact.validation.agreementRequired"),
    }),
  });
  
  type FormValues = z.infer<typeof formSchema>;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      agreement: false,
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: t("contact.success.title"),
        description: t("contact.success.message"),
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: t("contact.error.title"),
        description: t("contact.error.message"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFAQToggle = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const officeLocations: OfficeProps[] = [
    {
      city: "New York",
      address: "123 Fifth Avenue, Suite 400, New York, NY 10010",
      phone: "+1 (212) 555-1234",
      email: "nyc@makemate.com",
      hours: "Mon-Fri: 9AM - 6PM",
      image: "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      index: 0
    },
    {
      city: "London",
      address: "14 King Street, London, EC2A 4JT, UK",
      phone: "+44 20 7123 4567",
      email: "london@makemate.com",
      hours: "Mon-Fri: 9AM - 6PM",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      index: 1
    },
    {
      city: "Singapore",
      address: "10 Anson Road, #34-10, International Plaza, Singapore 079903",
      phone: "+65 6123 4567",
      email: "singapore@makemate.com",
      hours: "Mon-Fri: 9AM - 6PM",
      image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      index: 2
    }
  ];

  const faqItems = [
    {
      question: "What information should I provide for a project inquiry?",
      answer: "To help us understand your needs better, please include details about your project scope, timeline, budget range, and any specific requirements or features you're looking for. The more information you provide, the more tailored our response can be."
    },
    {
      question: "How quickly can I expect a response to my inquiry?",
      answer: "We typically respond to all inquiries within 24-48 business hours. For urgent matters, you can also reach us by phone during our business hours."
    },
    {
      question: "Do you work with clients internationally?",
      answer: "Yes, we work with clients worldwide. We have experience collaborating remotely with clients in different time zones and can schedule calls and meetings at times that work for you."
    },
    {
      question: "What is your typical project process?",
      answer: "Our process typically includes discovery, planning, design, development, testing, and launch phases. We maintain clear communication throughout and provide regular updates on progress."
    },
    {
      question: "Do you offer ongoing support and maintenance?",
      answer: "Yes, we offer various support and maintenance packages to keep your digital products running smoothly after launch. We can discuss the best option for your needs during our consultation."
    }
  ];

  const servicesData: ServiceProps[] = [
    {
      icon: <Info className="h-6 w-6 text-white" />,
      title: "General Inquiries",
      description: "Questions about our services, processes, or company? We're here to provide the information you need.",
      index: 0,
      color: "bg-primary"
    },
    {
      icon: <Briefcase className="h-6 w-6 text-white" />,
      title: "Project Discussions",
      description: "Ready to start a project? Contact us to discuss your requirements, timeline, and budget.",
      index: 1,
      color: "bg-secondary"
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Partnership Opportunities",
      description: "Interested in partnering with us? Let's explore how we can collaborate to create value together.",
      index: 2,
      color: "bg-accent"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      title: "Support Requests",
      description: "Existing clients can reach out for support, maintenance, or enhancements to their projects.",
      index: 3,
      color: "bg-primary"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | makemate Web Development & Design</title>
        <meta name="description" content="Get in touch with the makemate team. We're here to answer your questions and discuss how we can help with your web development and design needs." />
      </Helmet>
      
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <div 
          ref={headerRef}
          className={`container mx-auto px-6 mb-24 transition-all duration-1000 transform ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-primary/10 dark:bg-primary/20 text-primary rounded-full inline-block px-4 py-1 mb-4 text-sm font-medium">
              Get In Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              We're Here To <span className="text-primary">Help</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              Have a question, feedback, or ready to start a project? 
              Reach out to us and our team will get back to you shortly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
                color={service.color}
              />
            ))}
          </div>
        </div>
        
        {/* Contact Form Section */}
        <div className="container mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">{t("contact.title")}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-10 leading-relaxed">
                {t("contact.subtitle")}
              </p>
              
              <div className="space-y-8 mb-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                      <MapPin className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{t("contact.location.title")}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{t("contact.location.address")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                      <Mail className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{t("contact.email.title")}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{t("contact.email.address")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                      <Phone className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{t("contact.phone.title")}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{t("contact.phone.number")}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{t("contact.social.title")}</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-primary hover:bg-opacity-90 text-white rounded-full flex items-center justify-center transition-all duration-300">
                    <span className="sr-only">Instagram</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary hover:bg-opacity-90 text-white rounded-full flex items-center justify-center transition-all duration-300">
                    <span className="sr-only">Twitter</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary hover:bg-opacity-90 text-white rounded-full flex items-center justify-center transition-all duration-300">
                    <span className="sr-only">LinkedIn</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary hover:bg-opacity-90 text-white rounded-full flex items-center justify-center transition-all duration-300">
                    <span className="sr-only">Dribbble</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path></svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-10 border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-semibold mb-6 text-foreground">{t("contact.form.title")}</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("contact.form.fullName")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("contact.form.namePlaceholder")}
                                className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("contact.form.email")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("contact.form.emailPlaceholder")}
                                className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t("contact.form.company")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("contact.form.companyPlaceholder")}
                              className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t("contact.form.subject")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("contact.form.subjectPlaceholder")}
                              className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t("contact.form.message")}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("contact.form.messagePlaceholder")}
                              className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="agreement"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                              {t("contact.form.agreement")} 
                              <a href="#" className="text-primary hover:underline ml-1">{t("contact.form.privacyPolicy")}</a> 
                              {t("contact.form.and")} 
                              <a href="#" className="text-primary hover:underline ml-1">{t("contact.form.terms")}</a>.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting 
                        ? <><Send className="mr-2 h-4 w-4 animate-spin" /> {t("contact.form.sending")}</> 
                        : t("contact.form.send")
                      }
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Office Locations */}
        <div className="bg-gray-50 dark:bg-gray-900/50 py-20 mb-24">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="bg-secondary/10 dark:bg-secondary/20 text-secondary rounded-full inline-block px-4 py-1 mb-4 text-sm font-medium">
                Our Locations
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Visit Our <span className="text-secondary">Offices</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We have offices in strategic locations to better serve our global clients.
                Feel free to visit us or get in touch with the office nearest to you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {officeLocations.map((office, index) => (
                <OfficeCard
                  key={index}
                  city={office.city}
                  address={office.address}
                  phone={office.phone}
                  email={office.email}
                  hours={office.hours}
                  image={office.image}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="container mx-auto px-6 mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-accent/10 dark:bg-accent/20 text-accent rounded-full inline-block px-4 py-1 mb-4 text-sm font-medium">
              FAQs
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Frequently Asked <span className="text-accent">Questions</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Have questions about working with us? Here are answers to some common queries.
              If you don't find what you're looking for, please reach out directly.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqItems.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={activeFAQ === index}
                onToggle={() => handleFAQToggle(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Map Section */}
        <div className="h-[400px] bg-gray-100 dark:bg-gray-800 mb-20">
          <div className="relative w-full h-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.69818185719!2d-73.99016225!3d40.73523694999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a3f71c1f67%3A0xa6f20a8d8f76eb77!2sUnion%20Square%2C%20New%20York%2C%20NY%2010003!5e0!3m2!1sen!2sus!4v1664367325063!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Our office location"
              className="filter grayscale"
            ></iframe>
            <div className="absolute top-0 left-0 w-full h-full bg-primary/10 dark:bg-primary/20 pointer-events-none"></div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Digital Presence?</h2>
            <p className="text-white text-lg mb-10 max-w-3xl mx-auto opacity-90">
              Take the first step towards a successful digital journey. Contact us today to discuss
              your project and discover how we can help you achieve your goals.
            </p>
            <Button 
              className="bg-white text-primary hover:bg-opacity-90 px-8 py-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg font-medium"
              onClick={() => {
                const formElement = document.querySelector('form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;