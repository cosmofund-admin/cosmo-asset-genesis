import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMetaMask } from '@/hooks/useMetaMask';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, DollarSign, Calendar, Percent, Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Asset {
  id: string;
  name: string;
  ast_token_id: string;
  agt_token_id: string;
  abt_token_id: string;
}

interface Loan {
  id: string;
  asset_id: string;
  collateral_token_type: string;
  collateral_amount: number;
  loan_amount_cosmo: number;
  interest_rate: number;
  loan_duration_days: number;
  status: string;
  created_at: string;
  due_date: string;
  assets: Asset;
}

const Loans = () => {
  const { account, isConnected } = useMetaMask();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Форма для получения кредита
  const [borrowForm, setBorrowForm] = useState({
    assetId: '',
    tokenType: '',
    collateralAmount: '',
    loanAmount: '',
    duration: '30',
    interestRate: '10'
  });

  // Форма для выдачи кредита
  const [lendForm, setLendForm] = useState({
    amount: '',
    duration: '30',
    interestRate: '8'
  });

  useEffect(() => {
    if (isConnected && account) {
      fetchAssets();
      fetchLoans();
    }
  }, [isConnected, account]);

  const fetchAssets = async () => {
    if (!account) return;
    
    const { data, error } = await supabase
      .from('assets')
      .select('id, name, ast_token_id, agt_token_id, abt_token_id')
      .eq('owner_id', account);
    
    if (!error && data) {
      setAssets(data);
    }
  };

  const fetchLoans = async () => {
    if (!account) return;
    
    const { data, error } = await supabase
      .from('loans')
      .select(`
        *,
        assets (id, name, ast_token_id, agt_token_id, abt_token_id)
      `)
      .or(`borrower_id.eq.${account},lender_id.eq.${account}`);
    
    if (!error && data) {
      setLoans(data);
    }
  };

  const handleBorrowSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return;

    // Валидация формы
    if (!borrowForm.assetId || !borrowForm.tokenType || !borrowForm.collateralAmount || !borrowForm.loanAmount) {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    const collateralAmount = parseFloat(borrowForm.collateralAmount);
    const loanAmount = parseFloat(borrowForm.loanAmount);

    if (collateralAmount <= 0 || loanAmount <= 0) {
      toast({
        title: "Ошибка валидации",
        description: "Суммы должны быть больше нуля",
        variant: "destructive",
      });
      return;
    }

    // Проверка минимального коэффициента залога (например, 150%)
    const minCollateralRatio = 1.5;
    const collateralValue = collateralAmount * 0.1; // Предполагаем курс токена к COSMO
    if (collateralValue < loanAmount * minCollateralRatio) {
      toast({
        title: "Недостаточное обеспечение",
        description: `Минимальный коэффициент залога: ${minCollateralRatio * 100}%`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + parseInt(borrowForm.duration));

      const { error } = await supabase
        .from('loans')
        .insert({
          borrower_id: account,
          asset_id: borrowForm.assetId,
          collateral_token_type: borrowForm.tokenType,
          collateral_amount: collateralAmount,
          loan_amount_cosmo: loanAmount,
          interest_rate: parseFloat(borrowForm.interestRate),
          loan_duration_days: parseInt(borrowForm.duration),
          due_date: dueDate.toISOString(),
          status: 'active'
        });

      if (error) throw error;

      // Записываем транзакцию
      await supabase
        .from('transactions')
        .insert({
          user_id: account,
          asset_id: borrowForm.assetId,
          transaction_type: 'borrow',
          amount_cosmo: loanAmount,
          token_type: borrowForm.tokenType,
          token_amount: collateralAmount
        });

      toast({
        title: "Кредит успешно получен",
        description: `Получено ${loanAmount} COSMO под залог ${collateralAmount} ${borrowForm.tokenType} токенов`,
      });

      setBorrowForm({
        assetId: '',
        tokenType: '',
        collateralAmount: '',
        loanAmount: '',
        duration: '30',
        interestRate: '10'
      });

      fetchLoans();
    } catch (error: any) {
      toast({
        title: "Ошибка получения кредита",
        description: error.message,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const getTokenTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'AST': 'Стабильный (AST)',
      'AGT': 'Поддержки (AGT)',
      'ABT': 'Брендовый (ABT)'
    };
    return typeMap[type] || type;
  };

  const getStatusLabel = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'active': 'Активный',
      'repaid': 'Погашен',
      'defaulted': 'Просрочен'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      'active': 'bg-blue-500',
      'repaid': 'bg-green-500',
      'defaulted': 'bg-red-500'
    };
    return colorMap[status] || 'bg-gray-500';
  };

  // Redirect to home if not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background text-foreground digital-grid flex items-center justify-center">
        <Card className="asset-card">
          <CardContent className="text-center py-16">
            <div className="text-6xl mb-4">🦊</div>
            <h3 className="text-xl font-semibold mb-2">Подключите MetaMask</h3>
            <p className="text-muted-foreground mb-4">
              Для доступа к кредитованию необходимо подключить кошелек MetaMask
            </p>
            <Button onClick={() => navigate('/')} className="futuristic-btn">
              Вернуться на главную
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground digital-grid">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mr-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Кредитование</h1>
            <p className="text-muted-foreground">Получайте кредиты под залог токенов или кредитуйте других пользователей</p>
          </div>
        </div>

        <Tabs defaultValue="borrow" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="borrow">Получить кредит</TabsTrigger>
            <TabsTrigger value="lend">Выдать кредит</TabsTrigger>
            <TabsTrigger value="my-loans">Мои кредиты</TabsTrigger>
          </TabsList>

          <TabsContent value="borrow">
            <Card className="asset-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Получить кредит под залог токенов
                </CardTitle>
                <CardDescription>
                  Используйте ваши токенизированные активы в качестве залога для получения кредита в COSMO
                </CardDescription>
              </CardHeader>
              <CardContent>
                {assets.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      У вас нет токенизированных активов для залога
                    </p>
                    <Button onClick={() => navigate('/create-asset')} className="futuristic-btn">
                      Создать актив
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleBorrowSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Актив для залога</label>
                        <Select 
                          value={borrowForm.assetId} 
                          onValueChange={(value) => setBorrowForm(prev => ({ ...prev, assetId: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите актив" />
                          </SelectTrigger>
                          <SelectContent>
                            {assets.map((asset) => (
                              <SelectItem key={asset.id} value={asset.id}>
                                {asset.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Тип токена</label>
                        <Select 
                          value={borrowForm.tokenType} 
                          onValueChange={(value) => setBorrowForm(prev => ({ ...prev, tokenType: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип токена" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AST">Стабильный (AST)</SelectItem>
                            <SelectItem value="AGT">Поддержки (AGT)</SelectItem>
                            <SelectItem value="ABT">Брендовый (ABT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Количество токенов для залога</label>
                        <Input
                          type="number"
                          placeholder="1000"
                          value={borrowForm.collateralAmount}
                          onChange={(e) => setBorrowForm(prev => ({ ...prev, collateralAmount: e.target.value }))}
                          required
                          min="1"
                          step="0.001"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Сумма кредита (COSMO)</label>
                        <Input
                          type="number"
                          placeholder="500"
                          value={borrowForm.loanAmount}
                          onChange={(e) => setBorrowForm(prev => ({ ...prev, loanAmount: e.target.value }))}
                          required
                          min="1"
                          step="0.001"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Срок (дни)</label>
                        <Select 
                          value={borrowForm.duration} 
                          onValueChange={(value) => setBorrowForm(prev => ({ ...prev, duration: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 дней</SelectItem>
                            <SelectItem value="14">14 дней</SelectItem>
                            <SelectItem value="30">30 дней</SelectItem>
                            <SelectItem value="60">60 дней</SelectItem>
                            <SelectItem value="90">90 дней</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Процентная ставка (%)</label>
                        <Input
                          type="number"
                          value={borrowForm.interestRate}
                          onChange={(e) => setBorrowForm(prev => ({ ...prev, interestRate: e.target.value }))}
                          required
                          min="0.1"
                          max="50"
                          step="0.1"
                        />
                      </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Информация о кредите:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Минимальный коэффициент залога: 150%</li>
                        <li>• Комиссия за выдачу: 0.5%</li>
                        <li>• При просрочке актив может быть ликвидирован</li>
                      </ul>
                    </div>

                    <Button type="submit" className="w-full futuristic-btn" disabled={loading}>
                      {loading ? 'Обработка кредита...' : 'Получить кредит'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lend">
            <Card className="asset-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Выдать кредит
                </CardTitle>
                <CardDescription>
                  Кредитуйте других пользователей и получайте проценты
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Сумма (COSMO)</label>
                      <Input
                        type="number"
                        placeholder="1000"
                        value={lendForm.amount}
                        onChange={(e) => setLendForm(prev => ({ ...prev, amount: e.target.value }))}
                        required
                        min="1"
                        step="0.001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Максимальный срок (дни)</label>
                      <Select 
                        value={lendForm.duration} 
                        onValueChange={(value) => setLendForm(prev => ({ ...prev, duration: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 дней</SelectItem>
                          <SelectItem value="14">14 дней</SelectItem>
                          <SelectItem value="30">30 дней</SelectItem>
                          <SelectItem value="60">60 дней</SelectItem>
                          <SelectItem value="90">90 дней</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Процентная ставка (%)</label>
                      <Input
                        type="number"
                        value={lendForm.interestRate}
                        onChange={(e) => setLendForm(prev => ({ ...prev, interestRate: e.target.value }))}
                        required
                        min="0.1"
                        max="50"
                        step="0.1"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full futuristic-btn" disabled>
                    Создать предложение (скоро)
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-loans">
            <div className="space-y-4">
              {loans.length === 0 ? (
                <Card className="asset-card">
                  <CardContent className="text-center py-16">
                    <div className="text-6xl mb-4">💳</div>
                    <h3 className="text-xl font-semibold mb-2">Кредитов пока нет</h3>
                    <p className="text-muted-foreground">
                      Создайте заявку на получение кредита или выдайте кредит другим пользователям
                    </p>
                  </CardContent>
                </Card>
              ) : (
                loans.map((loan) => (
                  <Card key={loan.id} className="asset-card">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center">
                            {loan.assets?.name || 'Актив не найден'}
                            <Badge className={`ml-2 ${getStatusColor(loan.status)}`}>
                              {getStatusLabel(loan.status)}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            Тип залога: {getTokenTypeLabel(loan.collateral_token_type)}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-400">
                            {loan.loan_amount_cosmo} COSMO
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Сумма кредита
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="flex items-center text-muted-foreground">
                            <Coins className="mr-1 h-4 w-4" />
                            Залог
                          </div>
                          <div className="font-semibold">
                            {loan.collateral_amount} токенов
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-muted-foreground">
                            <Percent className="mr-1 h-4 w-4" />
                            Ставка
                          </div>
                          <div className="font-semibold">
                            {loan.interest_rate}% годовых
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="mr-1 h-4 w-4" />
                            Срок
                          </div>
                          <div className="font-semibold">
                            {loan.loan_duration_days} дней
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Дата погашения</div>
                          <div className="font-semibold">
                            {new Date(loan.due_date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Loans;
