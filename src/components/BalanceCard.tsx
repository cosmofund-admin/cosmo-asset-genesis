
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { Profile } from '@/types/dashboard';

interface BalanceCardProps {
  profile: Profile | null;
  balance: string;
}

const BalanceCard = ({ profile, balance }: BalanceCardProps) => {
  const { t } = useLanguage();

  return (
    <Card className="asset-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Coins className="h-5 w-5 text-green-400" />
          <span>{t('balance')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm text-muted-foreground">{t('cosmoBalance')}</div>
          <div className="text-2xl font-bold text-green-400">
            {profile?.cosmo_balance || 0} COSMO
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">{t('bnbBalance')}</div>
          <div className="text-xl font-semibold">
            {balance} BNB
          </div>
        </div>
        <div className="pt-2 border-t border-border">
          <div className="text-sm text-muted-foreground">{t('totalValue')}</div>
          <div className="text-lg font-semibold text-blue-400">
            ${((profile?.cosmo_balance || 0) * 0.1 + parseFloat(balance) * 300).toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
