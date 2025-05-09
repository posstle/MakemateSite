import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  image: string;
}

const Testimonial = ({ quote, author, position, image }: TestimonialProps) => {
  return (
    <div className="slide min-w-full px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 relative">
        <div className="text-5xl text-primary opacity-20 absolute top-6 left-8">"</div>
        <div className="text-5xl text-primary opacity-20 absolute bottom-6 right-8">"</div>
        
        <div className="mb-8 relative z-10">
          <p className="text-lg md:text-xl text-muted italic">{quote}</p>
        </div>
        
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
            <img src={image} alt={author} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-semibold">{author}</h4>
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
  const slideInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  
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
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("testimonials.title")}</h2>
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
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-primary' : 'bg-gray-300'}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            className="absolute top-1/2 left-2 md:left-6 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 hover:bg-gray-100 transition-colors duration-300"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-primary" size={20} />
          </button>
          
          <button 
            className="absolute top-1/2 right-2 md:right-6 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 hover:bg-gray-100 transition-colors duration-300"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-primary" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
