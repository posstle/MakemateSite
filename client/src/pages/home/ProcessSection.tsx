import { useTranslation } from "react-i18next";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

const ProcessStep = ({ number, title, description }: ProcessStepProps) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-6">
        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-xl">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted">{description}</p>
      </div>
    </div>
  );
};

const ProcessSection = () => {
  const { t } = useTranslation();
  
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
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("process.title")}</h2>
          <p className="text-muted text-lg max-w-3xl mx-auto">
            {t("process.subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=900" 
              alt={t("process.imageAlt")} 
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
          
          <div className="order-1 md:order-2">
            <div className="space-y-10">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={index}
                  number={step.number}
                  title={step.title}
                  description={step.description}
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
