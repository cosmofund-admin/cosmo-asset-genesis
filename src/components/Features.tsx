
import { Building, ShoppingCart, CreditCard, BarChart3, Wallet, Users } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Building,
      title: t('assetTokenization'),
      description: t('assetTokenizationDesc'),
      color: "text-blue-400"
    },
    {
      icon: ShoppingCart,
      title: t('marketplace'),
      description: t('marketplaceDesc'),
      color: "text-purple-400"
    },
    {
      icon: BarChart3,
      title: t('liquidityPools'),
      description: t('liquidityPoolsDesc'),
      color: "text-green-400"
    },
    {
      icon: CreditCard,
      title: t('lending'),
      description: t('lendingDesc'),
      color: "text-cyan-400"
    },
    {
      icon: Wallet,
      title: t('personalCabinet'),
      description: t('personalCabinetDesc'),
      color: "text-yellow-400"
    },
    {
      icon: Users,
      title: t('community'),
      description: t('communityDesc'),
      color: "text-pink-400"
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            {t('futureEcosystem')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('futureEcosystemDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="asset-card p-8 rounded-xl fade-in-up hover:neon-glow transition-all duration-300"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <feature.icon className={`h-16 w-16 ${feature.color} mb-6`} />
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Токены схема */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-12 gradient-text">
            {t('threeTokenSystem')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="asset-card p-6 rounded-xl pulse-glow">
              <div className="text-4xl font-bold text-blue-400 mb-2">AST</div>
              <div className="text-lg font-semibold mb-2">{t('stableTokensTitle')}</div>
              <div className="text-3xl font-bold text-blue-400 mb-4">90%</div>
              <p className="text-muted-foreground">
                {t('stableTokensDescription')}
              </p>
            </div>
            
            <div className="asset-card p-6 rounded-xl pulse-glow" style={{animationDelay: "0.5s"}}>
              <div className="text-4xl font-bold text-purple-400 mb-2">AGT</div>
              <div className="text-lg font-semibold mb-2">{t('supportTokensTitle')}</div>
              <div className="text-3xl font-bold text-purple-400 mb-4">9%</div>
              <p className="text-muted-foreground">
                {t('supportTokensDescription')}
              </p>
            </div>
            
            <div className="asset-card p-6 rounded-xl pulse-glow" style={{animationDelay: "1s"}}>
              <div className="text-4xl font-bold text-green-400 mb-2">ABT</div>
              <div className="text-lg font-semibold mb-2">{t('brandTokensTitle')}</div>
              <div className="text-3xl font-bold text-green-400 mb-4">1%</div>
              <p className="text-muted-foreground">
                {t('brandTokensDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
