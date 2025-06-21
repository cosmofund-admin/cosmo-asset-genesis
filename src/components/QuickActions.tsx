
import { Card, CardContent } from '@/components/ui/card';
import { Coins, Plus, CreditCard, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const QuickActions = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card className="asset-card cursor-pointer hover:border-blue-500/50 transition-colors" onClick={() => navigate('/marketplace')}>
        <CardContent className="p-6 text-center">
          <Coins className="h-8 w-8 mx-auto mb-2 text-blue-400" />
          <h3 className="font-semibold">{t('marketplace')}</h3>
          <p className="text-sm text-muted-foreground">Торговля активами</p>
        </CardContent>
      </Card>

      <Card className="asset-card cursor-pointer hover:border-purple-500/50 transition-colors" onClick={() => navigate('/create-asset')}>
        <CardContent className="p-6 text-center">
          <Plus className="h-8 w-8 mx-auto mb-2 text-purple-400" />
          <h3 className="font-semibold">{t('createAsset')}</h3>
          <p className="text-sm text-muted-foreground">Токенизировать актив</p>
        </CardContent>
      </Card>

      <Card className="asset-card cursor-pointer hover:border-green-500/50 transition-colors" onClick={() => navigate('/loans')}>
        <CardContent className="p-6 text-center">
          <CreditCard className="h-8 w-8 mx-auto mb-2 text-green-400" />
          <h3 className="font-semibold">{t('loans')}</h3>
          <p className="text-sm text-muted-foreground">Кредитование</p>
        </CardContent>
      </Card>

      <Card className="asset-card cursor-pointer hover:border-yellow-500/50 transition-colors">
        <CardContent className="p-6 text-center">
          <TrendingUp className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
          <h3 className="font-semibold">{t('liquidity')}</h3>
          <p className="text-sm text-muted-foreground">Управление ликвидностью</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;
