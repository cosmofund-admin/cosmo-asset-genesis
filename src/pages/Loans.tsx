
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
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
  const { user } = useAuth();
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
    if (user) {
      fetchAssets();
      fetchLoans();
    }
  }, [user]);

  const fetchAssets = async () => {
    const { data, error } = await supabase
      .from('assets')
      .select('id, name, ast_token_id, agt_token_id, abt_token_id')
      .eq('owner_id', user?.id);
    
    if (!error && data) {
      setAssets(data);
    }
  };

  const fetchLoans = async () => {
    const { data, error } = await supabase
      .from('loans')
      .select(`
        *,
        assets (id, name, ast_token_id, agt_token_id, abt_token_id)
      `)
      .or(`borrower_id.eq.${user?.id},lender_id.eq.${user?.id}`);
    
    if (!error && data) {
      setLoans(data);
    }
  };

  const handleBorrowSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + parseInt(borrowForm.duration));

      const { error } = await supabase
        .from('loans')
        .insert({
          borrower_id: user.id,
          asset_id: borrowForm.assetId,
          collateral_token_type: borrowForm.tokenType,
          collateral_amount: parseFloat(borrowForm.collateralAmount),
          loan_amount_cosmo: parseFloat(borrowForm.loanAmount),
          interest_rate: parseFloat(borrowForm.interestRate),
          loan_duration_days: parseInt(borrowForm.duration),
          due_date: dueDate.toISOString()
        });

      if (error) throw error;

      // Записываем транзакцию
      await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          asset_id: borrowForm.assetId,
          transaction_type: 'borrow',
          amount_cosmo: parseFloat(borrowForm.loanAmount),
          token_type: borrowForm.tokenType,
          token_amount: parseFloat(borrowForm.collateralAmount)
        });

      toast({
        title: "Заявка на кредит создана",
        description: "Ожидайте одобрения от кредиторов",
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
        title: "Ошибка создания заявки",
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
                  Используйте ваши токены в качестве залога для получения кредита в COSMO
                </CardDescription>
              </CardHeader>
              <CardContent>
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

                  <Button type="submit" className="w-full futuristic-btn" disabled={loading}>
                    {loading ? 'Создание заявки...' : 'Подать заявку на кредит'}
                  </Button>
                </form>
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
