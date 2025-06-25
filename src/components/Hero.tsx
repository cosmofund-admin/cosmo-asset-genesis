
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from '@/hooks/useLanguage';

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Орбитальная анимация на фоне - оптимизированная */}
      <div className="absolute inset-0 orbital-animation opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Главный заголовок */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 fade-in-up stable-text">
            {t('tokenizeRealAssets')}{" "}
            <span className="gradient-text neon-text">{t('realAssets')}</span>
          </h1>
          
          {/* Подзаголовок */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 fade-in-up stable-text" style={{animationDelay: "0.2s"}}>
            {t('heroSubtitle')}
          </p>

          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 fade-in-up" style={{animationDelay: "0.4s"}}>
            <div className="text-center stable-text">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">1B+</div>
              <div className="text-muted-foreground">{t('tokenLimitPerAsset')}</div>
            </div>
            <div className="text-center stable-text">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">90%</div>
              <div className="text-muted-foreground">{t('stableTokens')}</div>
            </div>
            <div className="text-center stable-text">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-muted-foreground">{t('assetTrading')}</div>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 fade-in-up" style={{animationDelay: "0.6s"}}>
            <Button size="lg" className="futuristic-btn text-lg px-8 py-6" onClick={() => navigate('/create-asset')}>
              {t('startTokenization')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="futuristic-btn text-lg px-8 py-6" onClick={() => navigate('/marketplace')}>
              {t('exploreMarketplace')}
            </Button>
          </div>

          {/* Преимущества */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-up" style={{animationDelay: "0.8s"}}>
            <div className="asset-card p-6 rounded-xl optimized">
              <TrendingUp className="h-12 w-12 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 stable-text">{t('highLiquidity')}</h3>
              <p className="text-muted-foreground stable-text">
                {t('highLiquidityDesc')}
              </p>
            </div>
            
            <div className="asset-card p-6 rounded-xl optimized">
              <Shield className="h-12 w-12 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 stable-text">{t('security')}</h3>
              <p className="text-muted-foreground stable-text">
                {t('securityDesc')}
              </p>
            </div>
            
            <div className="asset-card p-6 rounded-xl optimized">
              <Coins className="h-12 w-12 text-green-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 stable-text">{t('tripleTokenization')}</h3>
              <p className="text-muted-foreground stable-text">
                {t('tripleTokenizationDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
