
import { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Словари переводов
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
    
    // Баланс
    'balance': 'Баланс',
    'cosmoBalance': 'Баланс COSMO',
    'bnbBalance': 'Баланс BNB',
    'totalValue': 'Общая стоимость',
    
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
    'collateralAmount': 'Сумма залога'
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
    
    // Balance
    'balance': 'Balance',
    'cosmoBalance': 'COSMO Balance',
    'bnbBalance': 'BNB Balance',
    'totalValue': 'Total Value',
    
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
    'collateralAmount': 'Collateral Amount'
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
