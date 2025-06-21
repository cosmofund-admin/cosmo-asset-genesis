
-- Создание таблицы профилей пользователей
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  wallet_address TEXT,
  cosmo_balance DECIMAL(20,8) DEFAULT 0,
  bnb_balance DECIMAL(20,8) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы активов
CREATE TABLE public.assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  asset_type TEXT NOT NULL, -- 'real_estate', 'goods', 'other'
  value_usd DECIMAL(20,2) NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  ast_token_id TEXT NOT NULL, -- Стабильный токен (90%)
  agt_token_id TEXT NOT NULL, -- Токен поддержки (9%)
  abt_token_id TEXT NOT NULL, -- Брендовый токен (1%)
  ast_supply BIGINT DEFAULT 1000000000, -- 1 млрд лимит
  agt_supply BIGINT DEFAULT 1000000000,
  abt_supply BIGINT DEFAULT 1000000000,
  ast_price DECIMAL(20,8),
  agt_price DECIMAL(20,8),
  abt_price DECIMAL(20,8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы токенов пользователей
CREATE TABLE public.user_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  asset_id UUID REFERENCES public.assets NOT NULL,
  token_type TEXT NOT NULL, -- 'AST', 'AGT', 'ABT'
  amount DECIMAL(20,8) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, asset_id, token_type)
);

-- Создание таблицы транзакций
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  asset_id UUID REFERENCES public.assets,
  transaction_type TEXT NOT NULL, -- 'buy', 'sell', 'create_asset', 'create_liquidity', 'borrow', 'lend'
  amount_cosmo DECIMAL(20,8),
  amount_bnb DECIMAL(20,8),
  token_type TEXT, -- 'AST', 'AGT', 'ABT'
  token_amount DECIMAL(20,8),
  status TEXT DEFAULT 'completed', -- 'pending', 'completed', 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы пулов ликвидности
CREATE TABLE public.liquidity_pools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id UUID REFERENCES public.assets NOT NULL,
  token_type TEXT NOT NULL, -- 'AST', 'AGT', 'ABT'
  cosmo_amount DECIMAL(20,8) NOT NULL DEFAULT 0,
  token_amount DECIMAL(20,8) NOT NULL DEFAULT 0,
  total_liquidity DECIMAL(20,8) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(asset_id, token_type)
);

-- Создание таблицы пользовательской ликвидности
CREATE TABLE public.user_liquidity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  pool_id UUID REFERENCES public.liquidity_pools NOT NULL,
  liquidity_amount DECIMAL(20,8) NOT NULL DEFAULT 0,
  cosmo_contributed DECIMAL(20,8) NOT NULL DEFAULT 0,
  token_contributed DECIMAL(20,8) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы кредитов
CREATE TABLE public.loans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  borrower_id UUID REFERENCES auth.users NOT NULL,
  lender_id UUID REFERENCES auth.users,
  asset_id UUID REFERENCES public.assets NOT NULL,
  collateral_token_type TEXT NOT NULL, -- 'AST', 'AGT', 'ABT'
  collateral_amount DECIMAL(20,8) NOT NULL,
  loan_amount_cosmo DECIMAL(20,8) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL, -- процентная ставка
  loan_duration_days INTEGER NOT NULL,
  status TEXT DEFAULT 'active', -- 'active', 'repaid', 'defaulted'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  repaid_at TIMESTAMP WITH TIME ZONE
);

-- Включение RLS для всех таблиц
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.liquidity_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_liquidity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;

-- Политики для profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Политики для assets (все могут читать, владелец может изменять)
CREATE POLICY "Anyone can view assets" ON public.assets FOR SELECT USING (true);
CREATE POLICY "Users can create assets" ON public.assets FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update own assets" ON public.assets FOR UPDATE USING (auth.uid() = owner_id);

-- Политики для user_tokens
CREATE POLICY "Users can view own tokens" ON public.user_tokens FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own tokens" ON public.user_tokens FOR ALL USING (auth.uid() = user_id);

-- Политики для transactions
CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Политики для liquidity_pools (все могут читать)
CREATE POLICY "Anyone can view liquidity pools" ON public.liquidity_pools FOR SELECT USING (true);
CREATE POLICY "System can manage liquidity pools" ON public.liquidity_pools FOR ALL USING (true);

-- Политики для user_liquidity
CREATE POLICY "Users can view own liquidity" ON public.user_liquidity FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own liquidity" ON public.user_liquidity FOR ALL USING (auth.uid() = user_id);

-- Политики для loans
CREATE POLICY "Users can view own loans as borrower" ON public.loans FOR SELECT USING (auth.uid() = borrower_id);
CREATE POLICY "Users can view own loans as lender" ON public.loans FOR SELECT USING (auth.uid() = lender_id);
CREATE POLICY "Users can create loans as borrower" ON public.loans FOR INSERT WITH CHECK (auth.uid() = borrower_id);
CREATE POLICY "Users can update loans as lender" ON public.loans FOR UPDATE USING (auth.uid() = lender_id OR auth.uid() = borrower_id);

-- Функция для автоматического создания профиля
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, cosmo_balance, bnb_balance)
  VALUES (NEW.id, 10000, 1); -- Начальный баланс для тестирования
  RETURN NEW;
END;
$$;

-- Триггер для создания профиля при регистрации
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
