
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Globe, Zap, Users } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const About = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Shield className="h-6 w-6 text-blue-400" />,
      title: t('feature1'),
    },
    {
      icon: <Globe className="h-6 w-6 text-green-400" />,
      title: t('feature2'),
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-400" />,
      title: t('feature3'),
    },
    {
      icon: <Users className="h-6 w-6 text-orange-400" />,
      title: t('feature4'),
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-r from-background/50 to-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">{t('aboutTitle')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('aboutDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Card className="asset-card">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">{t('missionTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  {t('missionDescription')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-2xl font-bold gradient-text mb-6">{t('featuresTitle')}</h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <p className="text-foreground">{feature.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
