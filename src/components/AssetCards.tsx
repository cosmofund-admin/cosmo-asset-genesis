
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Coins } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const AssetCards = () => {
  const { t } = useLanguage();

  const assets = [
    {
      id: 1,
      name: t('luxuryApartmentNYC'),
      type: t('realEstate'),
      location: t('newYorkUSA'),
      value: "1,250,000",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      tokens: {
        ast: "1,125,000",
        agt: "112,500", 
        abt: "12,500"
      },
      growth: "+12.5%"
    },
    {
      id: 2,
      name: t('commercialOfficeSpace'),
      type: t('commercialRealEstate'),
      location: t('londonUK'),
      value: "2,800,000",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      tokens: {
        ast: "2,520,000",
        agt: "252,000",
        abt: "28,000"
      },
      growth: "+8.3%"
    },
    {
      id: 3,
      name: t('vintageWineCollection'),
      type: t('goods'),
      location: t('bordeauxFrance'),
      value: "450,000",
      image: "https://images.unsplash.com/photo-1566137480273-80f0b2e66d8d?w=400&h=300&fit=crop",
      tokens: {
        ast: "405,000",
        agt: "40,500",
        abt: "4,500"
      },
      growth: "+15.7%"
    }
  ];

  return (
    <section id="marketplace" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            {t('popularAssets')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('popularAssetsDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assets.map((asset, index) => (
            <div 
              key={asset.id} 
              className="asset-card rounded-xl overflow-hidden fade-in-up"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              {/* Изображение актива */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={asset.image} 
                  alt={asset.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-green-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                  {asset.growth}
                </div>
              </div>

              {/* Информация об активе */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-400 font-semibold">{asset.type}</span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {asset.location}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">{asset.name}</h3>

                {/* Стоимость */}
                <div className="mb-6">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    ${parseInt(asset.value).toLocaleString()} USDT
                  </div>
                  <div className="text-sm text-muted-foreground">{t('totalAssetValue')}</div>
                </div>

                {/* Распределение токенов */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-2 rounded bg-blue-500/10 border border-blue-500/20">
                    <span className="text-sm">AST (90%)</span>
                    <span className="text-sm font-semibold text-blue-400">
                      {parseInt(asset.tokens.ast).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-purple-500/10 border border-purple-500/20">
                    <span className="text-sm">AGT (9%)</span>
                    <span className="text-sm font-semibold text-purple-400">
                      {parseInt(asset.tokens.agt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-green-500/10 border border-green-500/20">
                    <span className="text-sm">ABT (1%)</span>
                    <span className="text-sm font-semibold text-green-400">
                      {parseInt(asset.tokens.abt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="grid grid-cols-2 gap-3">
                  <Button className="futuristic-btn">
                    <Coins className="w-4 h-4 mr-2" />
                    {t('buy')}
                  </Button>
                  <Button variant="outline" className="futuristic-btn">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {t('liquidity')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка перехода к полному маркетплейсу */}
        <div className="text-center mt-12">
          <Button size="lg" className="futuristic-btn">
            {t('openFullMarketplace')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AssetCards;
