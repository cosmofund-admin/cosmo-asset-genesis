
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Coins } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const CosmoSwap = () => {
  const { t } = useLanguage();
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenPancakeSwap = () => {
    setIsOpening(true);
    // Открываем PancakeSwap с предустановленными параметрами для покупки COSMO
    const pancakeSwapUrl = 'https://pancakeswap.finance/swap?inputCurrency=0x60E5FfdE4230985757E5Dd486e33E85AfEfC557b&outputCurrency=BNB&chain=bsc';
    window.open(pancakeSwapUrl, '_blank');
    
    setTimeout(() => {
      setIsOpening(false);
    }, 1000);
  };

  return (
    <Card className="asset-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Coins className="h-5 w-5 text-blue-400" />
          <span>{t('buyCosmoCoin')}</span>
        </CardTitle>
        <CardDescription>
          {t('buyCosmoCoinDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">{t('tokenContract')}:</span>
          </div>
          <div className="text-xs font-mono bg-background/50 p-2 rounded break-all">
            0x60E5FfdE4230985757E5Dd486e33E85AfEfC557b
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">{t('network')}:</div>
            <div className="font-semibold">BNB Smart Chain</div>
          </div>
          <div>
            <div className="text-muted-foreground">{t('exchange')}:</div>
            <div className="font-semibold">PancakeSwap</div>
          </div>
        </div>

        <Button 
          onClick={handleOpenPancakeSwap}
          className="w-full futuristic-btn"
          disabled={isOpening}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          {isOpening ? t('opening') : t('buyOnPancakeSwap')}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          {t('pancakeSwapWarning')}
        </p>
      </CardContent>
    </Card>
  );
};

export default CosmoSwap;
