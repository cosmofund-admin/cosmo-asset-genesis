
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useEthereumBalance } from '@/hooks/useEthereumBalance';
import type { Profile } from '@/types/dashboard';

interface BalanceCardProps {
  profile: Profile | null;
  balance: string;
  account: string | null;
}

const BalanceCard = ({ profile, balance, account }: BalanceCardProps) => {
  const { t } = useLanguage();
  const { ethBalance, cosmoEthBalance, loading, refetch } = useEthereumBalance(account);

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Card className="asset-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Coins className="h-5 w-5 text-green-400" />
            <span>{t('balance')}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <div className="text-sm text-muted-foreground">{t('cosmoBalance')} (BNB Chain)</div>
            <div className="text-2xl font-bold text-green-400">
              {profile?.cosmo_balance || 0} COSMO
            </div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">{t('cosmoBalance')} (Ethereum)</div>
            <div className="text-xl font-semibold text-green-400">
              {cosmoEthBalance} COSMO
            </div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">{t('bnbBalance')}</div>
            <div className="text-xl font-semibold">
              {balance} BNB
            </div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">ETH Balance</div>
            <div className="text-xl font-semibold">
              {ethBalance} ETH
            </div>
          </div>
        </div>
        
        <div className="pt-3 border-t border-border">
          <div className="text-sm text-muted-foreground">{t('totalValue')}</div>
          <div className="text-lg font-semibold text-blue-400">
            ${(
              (profile?.cosmo_balance || 0) * 0.1 + 
              parseFloat(cosmoEthBalance) * 0.1 + 
              parseFloat(balance) * 300 + 
              parseFloat(ethBalance) * 2500
            ).toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
