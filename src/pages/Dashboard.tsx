
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMetaMask } from '@/hooks/useMetaMask';
import { useLanguage } from '@/hooks/useLanguage';
import { useDashboardData } from '@/hooks/useDashboardData';
import BalanceCard from '@/components/BalanceCard';
import PortfolioStats from '@/components/PortfolioStats';
import QuickActions from '@/components/QuickActions';
import TransactionHistory from '@/components/TransactionHistory';
import CosmoSwap from '@/components/CosmoSwap';

const Dashboard = () => {
  const navigate = useNavigate();
  const { account, isConnected, balance } = useMetaMask();
  const { t } = useLanguage();
  const { profile, assets, userTokens, transactions, loading } = useDashboardData(account);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background text-foreground digital-grid flex items-center justify-center">
        <div className="text-center">
          <Wallet className="h-16 w-16 mx-auto mb-4 text-blue-400" />
          <h2 className="text-2xl font-bold mb-4">{t('connectMetaMask')}</h2>
          <p className="text-muted-foreground mb-6">
            Подключите MetaMask для доступа к личному кабинету
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground digital-grid flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 neon-glow mx-auto mb-4 animate-pulse"></div>
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground digital-grid">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('back')}
            </Button>
            <div>
              <h1 className="text-3xl font-bold gradient-text">{t('dashboard')}</h1>
              <p className="text-muted-foreground">
                {account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : ''}
              </p>
            </div>
          </div>
          <Button className="futuristic-btn" onClick={() => navigate('/create-asset')}>
            <Plus className="mr-2 h-4 w-4" />
            {t('createAsset')}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <BalanceCard profile={profile} balance={balance} account={account} />
          <CosmoSwap />
          <PortfolioStats assets={assets} userTokens={userTokens} transactions={transactions} />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold gradient-text mb-4">Управление активами</h2>
          <p className="text-muted-foreground">
            Здесь вы можете управлять своими токенизированными активами и взаимодействовать с платформой.
          </p>
        </div>
        
        <QuickActions />

        <TransactionHistory transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;
