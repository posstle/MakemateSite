import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  image: string;
  index: number;
  isVisible: boolean;
}

const Testimonial = ({ quote, author, position, image, index, isVisible }: TestimonialProps) => {
  return (
    <div className="slide min-w-full px-4">
      <div 
        className={`bg-background dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-10 relative border border-border/10 transition-all duration-500 hover:shadow-xl hover:border-primary/20 transform ${
          isVisible ? `opacity-100 translate-y-0 delay-${index * 100}` : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-5xl text-primary opacity-10 dark:opacity-20 absolute top-6 left-8">
          <Quote className="w-10 h-10 transform rotate-180" />
        </div>
        <div className="text-5xl text-primary opacity-10 dark:opacity-20 absolute bottom-6 right-8">
          <Quote className="w-10 h-10" />
        </div>
        
        <div className="mb-8 relative z-10">
          <p className="text-lg md:text-xl text-muted italic">{quote}</p>
        </div>
        
        <div className="flex items-center">
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-background dark:border-gray-800 shadow-md">
              <img src={image} alt={author} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-background dark:bg-gray-800 rounded-full p-1">
              <div className="bg-primary/10 dark:bg-primary/20 p-1 rounded-full">
                <Star className="w-3 h-3 text-primary fill-primary" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{author}</h4>
            <p className="text-sm text-muted">{position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const slideInterval = useRef<ReturnType<typeof setInterval> | null>(null);
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
  
  const testimonials = [
    {
      quote: t("testimonials.first.quote"),
      author: t("testimonials.first.author"),
      position: t("testimonials.first.position"),
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
      quote: t("testimonials.second.quote"),
      author: t("testimonials.second.author"),
      position: t("testimonials.second.position"),
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
      quote: t("testimonials.third.quote"),
      author: t("testimonials.third.author"),
      position: t("testimonials.third.position"),
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    }
  ];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  // Auto slide every 5 seconds
  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 5000);
    
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);
  
  // Reset interval when changing slide manually
  useEffect(() => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    slideInterval.current = setInterval(nextSlide, 5000);
  }, [currentSlide]);
  
  return (
    <section ref={sectionRef} className="py-20 bg-[#F8F9FA] dark:bg-gray-900/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
        }`}>
          <div className="inline-block mb-3">
            <span className="bg-primary/10 dark:bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              {t("testimonials.title")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t("testimonials.title")}
            <span className="text-primary">.</span>
          </h2>
          <p className="text-muted text-lg max-w-3xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-all duration-500" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <Testimonial 
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  position={testimonial.position}
                  image={testimonial.image}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary/50'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            className="absolute top-1/2 left-2 md:left-6 transform -translate-y-1/2 bg-background dark:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-primary" size={20} />
          </button>
          
          <button 
            className="absolute top-1/2 right-2 md:right-6 transform -translate-y-1/2 bg-background dark:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-primary" size={20} />
          </button>
        </div>
        
        {/* Background decorative quotes */}
        <div className="absolute top-20 left-0 opacity-5 dark:opacity-[0.02] text-primary">
          <Quote className="w-32 h-32 transform rotate-180" />
        </div>
        <div className="absolute bottom-20 right-0 opacity-5 dark:opacity-[0.02] text-secondary">
          <Quote className="w-24 h-24" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
