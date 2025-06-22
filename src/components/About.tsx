
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Zap, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const About = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-400" />,
      title: t('feature1'),
    },
    {
      icon: <Users className="h-8 w-8 text-green-400" />,
      title: t('feature2'),
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-400" />,
      title: t('feature3'),
    },
    {
      icon: <Globe className="h-8 w-8 text-orange-400" />,
      title: t('feature4'),
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              {t('aboutTitle')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('aboutDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="asset-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">
                  {t('missionTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-lg">
                  {t('missionDescription')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="asset-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-400">
                  {t('featuresTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {feature.icon}
                      <p className="text-muted-foreground">{feature.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
