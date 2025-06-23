
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/useLanguage';

const CosmoSwap = () => {
  const { t } = useLanguage();
  const [isOpening, setIsOpening] = useState(false);

  const handleBuyOnPancakeSwap = () => {
    setIsOpening(true);
    
    const pancakeSwapUrl = 'https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=0x60E5FfdE4230985757E5Dd486e33E85AfEfC557b&chain=bsc';
    
    window.open(pancakeSwapUrl, '_blank');
    
    setTimeout(() => {
      setIsOpening(false);
    }, 2000);
  };

  const handleBuyOnUniswap = () => {
    setIsOpening(true);
    
    const uniswapUrl = 'https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0x27cd7375478f189bdcf55616b088be03d9c4339c';
    
    window.open(uniswapUrl, '_blank');
    
    setTimeout(() => {
      setIsOpening(false);
    }, 2000);
  };

  return (
    <Card className="asset-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
          <span>{t('buyCosmoCoin')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {t('buyCosmoCoinDescription')}
        </p>
        
        <Tabs defaultValue="bsc" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bsc">BNB Chain</TabsTrigger>
            <TabsTrigger value="eth">Ethereum</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bsc" className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('tokenContract')}:</span>
                <span className="font-mono text-xs">0x60E5...557b</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('network')}:</span>
                <span>BNB Smart Chain</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('exchange')}:</span>
                <span>PancakeSwap</span>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-500">
                  {t('pancakeSwapWarning')}
                </p>
              </div>
            </div>

            <Button 
              onClick={handleBuyOnPancakeSwap}
              className="w-full futuristic-btn"
              disabled={isOpening}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {isOpening ? t('opening') : t('buyOnPancakeSwap')}
            </Button>
          </TabsContent>
          
          <TabsContent value="eth" className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('tokenContract')}:</span>
                <span className="font-mono text-xs">0x27cd...339c</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('network')}:</span>
                <span>Ethereum Mainnet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('exchange')}:</span>
                <span>Uniswap</span>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-500">
                  Убедитесь, что подключены к сети Ethereum Mainnet
                </p>
              </div>
            </div>

            <Button 
              onClick={handleBuyOnUniswap}
              className="w-full futuristic-btn"
              disabled={isOpening}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {isOpening ? t('opening') : 'Купить на Uniswap'}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CosmoSwap;
