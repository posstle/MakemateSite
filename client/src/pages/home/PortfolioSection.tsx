import { useTranslation } from "react-i18next";

interface PortfolioItemProps {
  image: string;
  title: string;
  description: string;
  bgColor: string;
  buttonColor: string;
  altText: string;
  viewCaseText: string;
}

const PortfolioItem = ({ image, title, description, bgColor, buttonColor, altText, viewCaseText }: PortfolioItemProps) => {
  return (
    <div className="portfolio-item relative group rounded-xl overflow-hidden shadow-lg">
      <img 
        src={image} 
        alt={altText} 
        className="w-full h-72 object-cover transition-all duration-300 group-hover:scale-105"
      />
      <div className={`portfolio-overlay absolute inset-0 ${bgColor} flex flex-col justify-center items-center p-6 opacity-0 transition-opacity duration-300`}>
        <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
        <p className="text-white text-center mb-4">{description}</p>
        <button className={`bg-white ${buttonColor} px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300`}>
          {viewCaseText}
        </button>
      </div>
    </div>
  );
};

const PortfolioSection = () => {
  const { t } = useTranslation();
  
  const portfolioItems = [
    {
      image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: t("portfolio.items.ecommerce.title"),
      description: t("portfolio.items.ecommerce.description"),
      bgColor: "bg-primary bg-opacity-90",
      buttonColor: "text-primary",
      altText: t("portfolio.items.ecommerce.alt"),
      viewCaseText: t("portfolio.viewCase")
    },
    {
      image: "https://pixabay.com/get/g27a197a05236ae3db91a1e98bdb81c839dc737aec91072a4e33ca06292247cf1829a535d1d7f792f9b34d832684b5be3469b700cbad4a7fe3275aaeb223e7e5d_1280.jpg",
      title: t("portfolio.items.realEstate.title"),
      description: t("portfolio.items.realEstate.description"),
      bgColor: "bg-secondary bg-opacity-90",
      buttonColor: "text-secondary",
      altText: t("portfolio.items.realEstate.alt"),
      viewCaseText: t("portfolio.viewCase")
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: t("portfolio.items.fitness.title"),
      description: t("portfolio.items.fitness.description"),
      bgColor: "bg-primary bg-opacity-90",
      buttonColor: "text-primary",
      altText: t("portfolio.items.fitness.alt"),
      viewCaseText: t("portfolio.viewCase")
    },
    {
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: t("portfolio.items.restaurant.title"),
      description: t("portfolio.items.restaurant.description"),
      bgColor: "bg-secondary bg-opacity-90",
      buttonColor: "text-secondary",
      altText: t("portfolio.items.restaurant.alt"),
      viewCaseText: t("portfolio.viewCase")
    },
    {
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: t("portfolio.items.travel.title"),
      description: t("portfolio.items.travel.description"),
      bgColor: "bg-primary bg-opacity-90",
      buttonColor: "text-primary",
      altText: t("portfolio.items.travel.alt"),
      viewCaseText: t("portfolio.viewCase")
    },
    {
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: t("portfolio.items.finance.title"),
      description: t("portfolio.items.finance.description"),
      bgColor: "bg-secondary bg-opacity-90",
      buttonColor: "text-secondary",
      altText: t("portfolio.items.finance.alt"),
      viewCaseText: t("portfolio.viewCase")
    }
  ];
  
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <section id="portfolio" className="py-20 bg-[#F8F9FA]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("portfolio.title")}</h2>
          <p className="text-muted text-lg max-w-3xl mx-auto">
            {t("portfolio.subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <PortfolioItem
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
              bgColor={item.bgColor}
              buttonColor={item.buttonColor}
              altText={item.altText}
              viewCaseText={item.viewCaseText}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button
            onClick={scrollToContact}
            className="inline-block bg-primary hover:bg-opacity-90 text-white px-8 py-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg font-medium"
          >
            {t("portfolio.startProject")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
