
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, TrendingUp, Wallet, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Profile {
  cosmo_balance: number;
  bnb_balance: number;
  wallet_address?: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (!error && data) {
      setProfile(data);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground digital-grid flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 neon-glow mx-auto mb-4 animate-pulse"></div>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground digital-grid">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Личный кабинет</h1>
            <p className="text-muted-foreground mt-2">Добро пожаловать, {user?.email}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Выйти
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="asset-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cosmo Баланс</CardTitle>
              <Coins className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">
                {profile?.cosmo_balance?.toLocaleString() || '0'} COSMO
              </div>
            </CardContent>
          </Card>

          <Card className="asset-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">BNB Баланс</CardTitle>
              <Wallet className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">
                {profile?.bnb_balance?.toFixed(4) || '0'} BNB
              </div>
            </CardContent>
          </Card>

          <Card className="asset-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Активы</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">0</div>
              <p className="text-xs text-muted-foreground">Токенизированных активов</p>
            </CardContent>
          </Card>

          <Card className="asset-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Кредиты</CardTitle>
              <CreditCard className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">0</div>
              <p className="text-xs text-muted-foreground">Активных кредитов</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="asset-card">
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
              <CardDescription>Основные операции на платформе</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full futuristic-btn" 
                onClick={() => navigate('/create-asset')}
              >
                Токенизировать актив
              </Button>
              <Button 
                className="w-full futuristic-btn" 
                variant="outline"
                onClick={() => navigate('/marketplace')}
              >
                Перейти в маркетплейс
              </Button>
              <Button 
                className="w-full futuristic-btn" 
                variant="outline"
                onClick={() => navigate('/loans')}
              >
                Кредитование
              </Button>
            </CardContent>
          </Card>

          <Card className="asset-card">
            <CardHeader>
              <CardTitle>Последние транзакции</CardTitle>
              <CardDescription>История ваших операций</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                <p>Транзакций пока нет</p>
                <p className="text-sm mt-2">Начните с создания актива или покупки токенов</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
