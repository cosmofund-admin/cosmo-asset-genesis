
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Coins, FileText, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const HowToStart = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Wallet className="h-12 w-12 text-blue-400" />,
      title: t('step1Title'),
      description: t('step1Description'),
    },
    {
      icon: <Coins className="h-12 w-12 text-green-400" />,
      title: t('step2Title'),
      description: t('step2Description'),
    },
    {
      icon: <FileText className="h-12 w-12 text-purple-400" />,
      title: t('step3Title'),
      description: t('step3Description'),
    },
    {
      icon: <ShoppingCart className="h-12 w-12 text-orange-400" />,
      title: t('step4Title'),
      description: t('step4Description'),
    },
  ];

  return (
    <section id="how-to-start" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">
            {t('howToStartTitle')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="asset-card text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <CardTitle className="text-xl font-semibold">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToStart;
