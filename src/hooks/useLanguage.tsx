import { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Словари переводов для 10 языков
const translations = {
  ru: {
    // Общие
    'welcome': 'Добро пожаловать',
    'loading': 'Загрузка...',
    'error': 'Ошибка',
    'success': 'Успешно',
    'cancel': 'Отмена',
    'confirm': 'Подтвердить',
    'back': 'Назад',
    'next': 'Далее',
    'save': 'Сохранить',
    'edit': 'Редактировать',
    'delete': 'Удалить',
    
    // Навигация
    'home': 'Главная',
    'marketplace': 'Маркетплейс',
    'dashboard': 'Личный кабинет',
    'howToStart': 'Как начать',
    'about': 'О проекте',
    'connectWallet': 'Подключить кошелек',
    'disconnect': 'Отключить',
    
    // Аутентификация
    'connectMetaMask': 'Подключить MetaMask',
    'connectingWallet': 'Подключение кошелька...',
    'walletConnected': 'Кошелек подключен',
    'walletConnectionError': 'Ошибка подключения кошелька',
    'installMetaMask': 'Установите MetaMask',
    'switchToCorrectNetwork': 'Переключите на BNB Smart Chain',
    
    // Токены
    'buyCosmoCoin': 'Купить токен COSMO',
    'buyCosmoCoinDescription': 'Покупайте токены COSMO на PancakeSwap для использования в платформе',
    'tokenContract': 'Контракт токена',
    'network': 'Сеть',
    'exchange': 'Биржа',
    'buyOnPancakeSwap': 'Купить на PancakeSwap',
    'opening': 'Открывается...',
    'pancakeSwapWarning': 'Вы будете перенаправлены на PancakeSwap. Убедитесь, что используете правильный контракт токена.',
    'tokens': 'Токены',
    'defiSwap': 'DeFi Обмен',
    'exchangeTokens': 'Обменивайте токены',
    
    // Баланс
    'balance': 'Баланс',
    'cosmoBalance': 'Баланс COSMO',
    'bnbBalance': 'Баланс BNB',
    'totalValue': 'Общая стоимость',
    'totalRevenue': 'Общий доход',
    
    // Активы
    'createAsset': 'Создать актив',
    'myAssets': 'Мои активы',
    'assetName': 'Название актива',
    'assetDescription': 'Описание актива',
    'assetType': 'Тип актива',
    'assetValue': 'Стоимость (USD)',
    'location': 'Локация',
    'realEstate': 'Недвижимость',
    'goods': 'Товары',
    'art': 'Искусство',
    'collectibles': 'Коллекционные предметы',
    'other': 'Другое',
    'startTokenization': 'Начать токенизацию',
    'tokenizeYourAsset': 'Токенизируйте свой актив',
    'tradeAssetTokens': 'Торгуйте токенами активов',
    'loansWithTokenCollateral': 'Займы под залог токенов',
    'quickActions': 'Быстрые действия',
    
    // Транзакции
    'transactions': 'Транзакции',
    'transactionHistory': 'История транзакций',
    'buy': 'Купить',
    'sell': 'Продать',
    'collateral': 'Заложить',
    'liquidity': 'Ликвидность',
    
    // Кредиты
    'loans': 'Кредиты',
    'borrow': 'Занять',
    'lend': 'Дать в долг',
    'loanAmount': 'Сумма кредита',
    'interestRate': 'Процентная ставка',
    'duration': 'Срок',
    'collateralAmount': 'Сумма залога',
    
    // Как начать
    'howToStartTitle': 'Как начать работу с Cosmo RWA',
    'step1Title': 'Подключите MetaMask',
    'step1Description': 'Установите и настройте кошелек MetaMask для работы с BNB Smart Chain',
    'step2Title': 'Купите токены COSMO',
    'step2Description': 'Приобретите токены COSMO на PancakeSwap для использования в платформе',
    'step3Title': 'Создайте актив',
    'step3Description': 'Токенизируйте свой актив и получите три уникальных токена',
    'step4Title': 'Торгуйте на маркетплейсе',
    'step4Description': 'Покупайте и продавайте токены активов на нашем маркетплейсе',
    
    // О проекте
    'aboutTitle': 'О проекте Cosmo RWA',
    'aboutDescription': 'Cosmo RWA - это инновационная децентрализованная платформа для токенизации реальных активов на блокчейне BNB Smart Chain.',
    'missionTitle': 'Наша миссия',
    'missionDescription': 'Мы делаем инвестиции в реальные активы доступными для всех через технологию блокчейна.',
    'featuresTitle': 'Особенности платформы',
    'feature1': 'Автоматическое создание трех типов токенов для каждого актива',
    'feature2': 'Децентрализованная торговля и обмен токенами',
    'feature3': 'Кредитование под залог токенизированных активов',
    'feature4': 'Прозрачность и безопасность блокчейна'
  },
  
  en: {
    // General
    'welcome': 'Welcome',
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    'cancel': 'Cancel',
    'confirm': 'Confirm',
    'back': 'Back',
    'next': 'Next',
    'save': 'Save',
    'edit': 'Edit',
    'delete': 'Delete',
    
    // Navigation
    'home': 'Home',
    'marketplace': 'Marketplace',
    'dashboard': 'Dashboard',
    'howToStart': 'How to Start',
    'about': 'About',
    'connectWallet': 'Connect Wallet',
    'disconnect': 'Disconnect',
    
    // Authentication
    'connectMetaMask': 'Connect MetaMask',
    'connectingWallet': 'Connecting wallet...',
    'walletConnected': 'Wallet connected',
    'walletConnectionError': 'Wallet connection error',
    'installMetaMask': 'Install MetaMask',
    'switchToCorrectNetwork': 'Switch to BNB Smart Chain',
    
    // Tokens
    'buyCosmoCoin': 'Buy COSMO Token',
    'buyCosmoCoinDescription': 'Purchase COSMO tokens on PancakeSwap to use in the platform',
    'tokenContract': 'Token Contract',
    'network': 'Network',
    'exchange': 'Exchange',
    'buyOnPancakeSwap': 'Buy on PancakeSwap',
    'opening': 'Opening...',
    'pancakeSwapWarning': 'You will be redirected to PancakeSwap. Make sure to use the correct token contract.',
    'tokens': 'Tokens',
    'defiSwap': 'DeFi Swap',
    'exchangeTokens': 'Exchange tokens',
    
    // Balance
    'balance': 'Balance',
    'cosmoBalance': 'COSMO Balance',
    'bnbBalance': 'BNB Balance',
    'totalValue': 'Total Value',
    'totalRevenue': 'Total Revenue',
    
    // Assets
    'createAsset': 'Create Asset',
    'myAssets': 'My Assets',
    'assetName': 'Asset Name',
    'assetDescription': 'Asset Description',
    'assetType': 'Asset Type',
    'assetValue': 'Value (USD)',
    'location': 'Location',
    'realEstate': 'Real Estate',
    'goods': 'Goods',
    'art': 'Art',
    'collectibles': 'Collectibles',
    'other': 'Other',
    'startTokenization': 'Start Tokenization',
    'tokenizeYourAsset': 'Tokenize your asset',
    'tradeAssetTokens': 'Trade asset tokens',
    'loansWithTokenCollateral': 'Loans with token collateral',
    'quickActions': 'Quick Actions',
    
    // Transactions
    'transactions': 'Transactions',
    'transactionHistory': 'Transaction History',
    'buy': 'Buy',
    'sell': 'Sell',
    'collateral': 'Collateral',
    'liquidity': 'Liquidity',
    
    // Loans
    'loans': 'Loans',
    'borrow': 'Borrow',
    'lend': 'Lend',
    'loanAmount': 'Loan Amount',
    'interestRate': 'Interest Rate',
    'duration': 'Duration',
    'collateralAmount': 'Collateral Amount',
    
    // How to start
    'howToStartTitle': 'How to Get Started with Cosmo RWA',
    'step1Title': 'Connect MetaMask',
    'step1Description': 'Install and configure MetaMask wallet for BNB Smart Chain',
    'step2Title': 'Buy COSMO Tokens',
    'step2Description': 'Purchase COSMO tokens on PancakeSwap to use in the platform',
    'step3Title': 'Create Asset',
    'step3Description': 'Tokenize your asset and receive three unique tokens',
    'step4Title': 'Trade on Marketplace',
    'step4Description': 'Buy and sell asset tokens on our marketplace',
    
    // About
    'aboutTitle': 'About Cosmo RWA Project',
    'aboutDescription': 'Cosmo RWA is an innovative decentralized platform for tokenizing real-world assets on the BNB Smart Chain.',
    'missionTitle': 'Our Mission',
    'missionDescription': 'We make real asset investments accessible to everyone through blockchain technology.',
    'featuresTitle': 'Platform Features',
    'feature1': 'Automatic creation of three token types for each asset',
    'feature2': 'Decentralized trading and token exchange',
    'feature3': 'Lending with tokenized asset collateral',
    'feature4': 'Blockchain transparency and security'
  },
  
  es: {
    'welcome': 'Bienvenido',
    'loading': 'Cargando...',
    'error': 'Error',
    'success': 'Éxito',
    'home': 'Inicio',
    'marketplace': 'Mercado',
    'dashboard': 'Panel',
    'howToStart': 'Cómo Empezar',
    'about': 'Acerca de',
    'connectMetaMask': 'Conectar MetaMask',
    'balance': 'Balance',
    'createAsset': 'Crear Activo',
    'startTokenization': 'Iniciar Tokenización',
    'tokens': 'Tokens',
    'myAssets': 'Mis Activos',
    'transactions': 'Transacciones',
    'totalRevenue': 'Ingresos Totales',
    'quickActions': 'Acciones Rápidas',
    'tokenizeYourAsset': 'Tokenizar activo',
    'tradeAssetTokens': 'Comerciar tokens',
    'loansWithTokenCollateral': 'Préstamos con garantía',
    'defiSwap': 'DeFi Intercambio',
    'exchangeTokens': 'Intercambiar tokens'
  },
  
  fr: {
    'welcome': 'Bienvenue',
    'loading': 'Chargement...',
    'error': 'Erreur',
    'success': 'Succès',
    'home': 'Accueil',
    'marketplace': 'Marché',
    'dashboard': 'Tableau de bord',
    'howToStart': 'Comment Commencer',
    'about': 'À propos',
    'connectMetaMask': 'Connecter MetaMask',
    'balance': 'Solde',
    'createAsset': 'Créer un Actif',
    'startTokenization': 'Commencer la Tokenisation',
    'tokens': 'Jetons',
    'myAssets': 'Mes Actifs',
    'transactions': 'Transactions',
    'totalRevenue': 'Revenus Totaux',
    'quickActions': 'Actions Rapides',
    'tokenizeYourAsset': 'Tokeniser votre actif',
    'tradeAssetTokens': 'Échanger des jetons',
    'loansWithTokenCollateral': 'Prêts avec garantie',
    'defiSwap': 'DeFi Échange',
    'exchangeTokens': 'Échanger des jetons'
  },
  
  de: {
    'welcome': 'Willkommen',
    'loading': 'Laden...',
    'error': 'Fehler',
    'success': 'Erfolg',
    'home': 'Startseite',
    'marketplace': 'Marktplatz',
    'dashboard': 'Dashboard',
    'howToStart': 'Wie Anfangen',
    'about': 'Über uns',
    'connectMetaMask': 'MetaMask Verbinden',
    'balance': 'Guthaben',
    'createAsset': 'Asset Erstellen',
    'startTokenization': 'Tokenisierung Starten',
    'tokens': 'Token',
    'myAssets': 'Meine Assets',
    'transactions': 'Transaktionen',
    'totalRevenue': 'Gesamtumsatz',
    'quickActions': 'Schnelle Aktionen',
    'tokenizeYourAsset': 'Asset tokenisieren',
    'tradeAssetTokens': 'Token handeln',
    'loansWithTokenCollateral': 'Kredite mit Sicherheit',
    'defiSwap': 'DeFi Tausch',
    'exchangeTokens': 'Token tauschen'
  },
  
  zh: {
    'welcome': '欢迎',
    'loading': '加载中...',
    'error': '错误',
    'success': '成功',
    'home': '首页',
    'marketplace': '市场',
    'dashboard': '仪表板',
    'howToStart': '如何开始',
    'about': '关于我们',
    'connectMetaMask': '连接MetaMask',
    'balance': '余额',
    'createAsset': '创建资产',
    'startTokenization': '开始代币化',
    'tokens': '代币',
    'myAssets': '我的资产',
    'transactions': '交易',
    'totalRevenue': '总收入',
    'quickActions': '快捷操作',
    'tokenizeYourAsset': '代币化资产',
    'tradeAssetTokens': '交易代币',
    'loansWithTokenCollateral': '抵押贷款',
    'defiSwap': 'DeFi交换',
    'exchangeTokens': '交换代币'
  },
  
  ja: {
    'welcome': 'ようこそ',
    'loading': '読み込み中...',
    'error': 'エラー',
    'success': '成功',
    'home': 'ホーム',
    'marketplace': 'マーケット',
    'dashboard': 'ダッシュボード',
    'howToStart': '始め方',
    'about': '私たちについて',
    'connectMetaMask': 'MetaMaskに接続',
    'balance': '残高',
    'createAsset': 'アセット作成',
    'startTokenization': 'トークン化開始',
    'tokens': 'トークン',
    'myAssets': 'マイアセット',
    'transactions': '取引',
    'totalRevenue': '総収益',
    'quickActions': 'クイックアクション',
    'tokenizeYourAsset': 'アセットをトークン化',
    'tradeAssetTokens': 'トークンを取引',
    'loansWithTokenCollateral': '担保付きローン',
    'defiSwap': 'DeFiスワップ',
    'exchangeTokens': 'トークン交換'
  },
  
  ar: {
    'welcome': 'مرحبا',
    'loading': 'جاري التحميل...',
    'error': 'خطأ',
    'success': 'نجح',
    'home': 'الرئيسية',
    'marketplace': 'السوق',
    'dashboard': 'لوحة القيادة',
    'howToStart': 'كيفية البدء',
    'about': 'حولنا',
    'connectMetaMask': 'ربط MetaMask',
    'balance': 'الرصيد',
    'createAsset': 'إنشاء أصل',
    'startTokenization': 'بدء الترميز',
    'tokens': 'الرموز',
    'myAssets': 'أصولي',
    'transactions': 'المعاملات',
    'totalRevenue': 'إجمالي الإيرادات',
    'quickActions': 'إجراءات سريعة',
    'tokenizeYourAsset': 'رمز أصلك',
    'tradeAssetTokens': 'تداول الرموز',
    'loansWithTokenCollateral': 'قروض بضمانة',
    'defiSwap': 'DeFi تبادل',
    'exchangeTokens': 'تبادل الرموز'
  },
  
  pt: {
    'welcome': 'Bem-vindo',
    'loading': 'Carregando...',
    'error': 'Erro',
    'success': 'Sucesso',
    'home': 'Início',
    'marketplace': 'Mercado',
    'dashboard': 'Painel',
    'howToStart': 'Como Começar',
    'about': 'Sobre',
    'connectMetaMask': 'Conectar MetaMask',
    'balance': 'Saldo',
    'createAsset': 'Criar Ativo',
    'startTokenization': 'Iniciar Tokenização',
    'tokens': 'Tokens',
    'myAssets': 'Meus Ativos',
    'transactions': 'Transações',
    'totalRevenue': 'Receita Total',
    'quickActions': 'Ações Rápidas',
    'tokenizeYourAsset': 'Tokenizar ativo',
    'tradeAssetTokens': 'Negociar tokens',
    'loansWithTokenCollateral': 'Empréstimos garantidos',
    'defiSwap': 'DeFi Troca',
    'exchangeTokens': 'Trocar tokens'
  },
  
  hi: {
    'welcome': 'स्वागत',
    'loading': 'लोड हो रहा है...',
    'error': 'त्रुटि',
    'success': 'सफलता',
    'home': 'होम',
    'marketplace': 'बाज़ार',
    'dashboard': 'डैशबोर्ड',
    'howToStart': 'शुरुआत कैसे करें',
    'about': 'हमारे बारे में',
    'connectMetaMask': 'MetaMask कनेक्ट करें',
    'balance': 'शेष राशि',
    'createAsset': 'एसेट बनाएं',
    'startTokenization': 'टोकनाइज़ेशन शुरू करें',
    'tokens': 'टोकन',
    'myAssets': 'मेरी संपत्ति',
    'transactions': 'लेन-देन',
    'totalRevenue': 'कुल राजस्व',
    'quickActions': 'त्वरित कार्य',
    'tokenizeYourAsset': 'संपत्ति टोकनाइज़ करें',
    'tradeAssetTokens': 'टोकन ट्रेड करें',
    'loansWithTokenCollateral': 'टोकन जमानत पर ऋण',
    'defiSwap': 'DeFi स्वैप',
    'exchangeTokens': 'टोकन एक्सचेंज'
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState('ru');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'ru';
    setLanguage(savedLanguage);
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.ru] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
