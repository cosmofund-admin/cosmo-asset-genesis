import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Coins, TrendingUp, CreditCard, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMetaMask } from '@/hooks/useMetaMask';
import { useLanguage } from '@/hooks/useLanguage';
import CosmoSwap from '@/components/CosmoSwap';

interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  cosmo_balance: number;
}

interface Asset {
  id: string;
  name: string;
  description: string;
  asset_type: string;
  value_usd: number;
  location: string;
}

interface UserToken {
  id: string;
  asset_id: string;
  user_id: string;
  token_type: string;
  amount: number;
}

interface Transaction {
  id: string;
  asset_id: string;
  user_id: string;
  transaction_type: string;
  amount: number;
  timestamp: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { account, isConnected, balance } = useMetaMask();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [userTokens, setUserTokens] = useState<UserToken[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (account) {
      fetchProfile();
      fetchAssets();
      fetchUserTokens();
      fetchTransactions();
    } else {
      setLoading(false);
    }
  }, [account]);

  const fetchProfile = async () => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', account)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      }

      setProfile(profileData);
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
    }
  };

  const fetchAssets = async () => {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setAssets(data);
    }
  };

  const fetchUserTokens = async () => {
    const { data, error } = await supabase
      .from('user_tokens')
      .select('*')
      .eq('user_id', account);
    
    if (!error && data) {
      setUserTokens(data);
    }
  };

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', account)
      .order('timestamp', { ascending: false });
    
    if (!error && data) {
      setTransactions(data);
    }
    setLoading(false);
  };

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
          {/* Карточка баланса */}
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

          {/* Компонент покупки COSMO */}
          <CosmoSwap />

          {/* Статистика портфеля */}
          <Card className="asset-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <span>Портфель</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">{t('myAssets')}</div>
                  <div className="text-xl font-semibold">{assets.length}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Токены</div>
                  <div className="text-xl font-semibold">{userTokens.length}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">{t('transactions')}</div>
                  <div className="text-xl font-semibold">{transactions.length}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Общий доход</div>
                  <div className="text-xl font-semibold text-green-400">+$0.00</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Навигационные карточки */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold gradient-text mb-4">Управление активами</h2>
          <p className="text-muted-foreground">
            Здесь вы можете управлять своими токенизированными активами и взаимодействовать с платформой.
          </p>
        </div>
        
        {/* Быстрые действия */}
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

        {/* Таблица последних транзакций */}
        <div>
          <h2 className="text-2xl font-bold gradient-text mb-4">{t('transactionHistory')}</h2>
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Нет транзакций для отображения</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border rounded-md shadow-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Тип
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Сумма
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Актив
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Дата
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-background divide-y divide-border">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{transaction.transaction_type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{transaction.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">Asset ID: {transaction.asset_id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{new Date(transaction.timestamp).toLocaleString()}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
