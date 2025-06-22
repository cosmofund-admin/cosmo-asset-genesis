
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Coins, Plus, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const HowToStart = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Wallet className="h-8 w-8 text-blue-400" />,
      title: t('step1Title'),
      description: t('step1Description')
    },
    {
      icon: <Coins className="h-8 w-8 text-green-400" />,
      title: t('step2Title'),
      description: t('step2Description')
    },
    {
      icon: <Plus className="h-8 w-8 text-purple-400" />,
      title: t('step3Title'),
      description: t('step3Description')
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-400" />,
      title: t('step4Title'),
      description: t('step4Description')
    }
  ];

  return (
    <section id="how-to-start" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">{t('howToStartTitle')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('howToStartDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="asset-card text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                  {step.icon}
                </div>
                <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
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
