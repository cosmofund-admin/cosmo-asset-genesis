
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { Asset, UserToken, Transaction } from '@/types/dashboard';

interface PortfolioStatsProps {
  assets: Asset[];
  userTokens: UserToken[];
  transactions: Transaction[];
}

const PortfolioStats = ({ assets, userTokens, transactions }: PortfolioStatsProps) => {
  const { t } = useLanguage();

  return (
    <Card className="asset-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          <span>{t('dashboard')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">{t('myAssets')}</div>
            <div className="text-xl font-semibold">{assets.length}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{t('tokens')}</div>
            <div className="text-xl font-semibold">{userTokens.length}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">{t('transactions')}</div>
            <div className="text-xl font-semibold">{transactions.length}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{t('totalRevenue')}</div>
            <div className="text-xl font-semibold text-green-400">+$0.00</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioStats;
