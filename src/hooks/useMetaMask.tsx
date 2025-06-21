
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

interface MetaMaskContextType {
  account: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  balance: string;
}

const MetaMaskContext = createContext<MetaMaskContextType | undefined>(undefined);

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const MetaMaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState('0');
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    checkConnection();
    setupEventListeners();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          await getBalance(accounts[0]);
          await updateUserProfile(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const setupEventListeners = () => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }
  };

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      setIsConnected(true);
      await getBalance(accounts[0]);
      await updateUserProfile(accounts[0]);
    } else {
      setAccount(null);
      setIsConnected(false);
      setBalance('0');
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const getBalance = async (address: string) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      });
      const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);
      setBalance(balanceInEth.toFixed(4));
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  const updateUserProfile = async (walletAddress: string) => {
    try {
      // Создаем или обновляем профиль пользователя в Supabase
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Если пользователь не авторизован, создаем анонимную сессию
        const { error } = await supabase.auth.signInAnonymously();
        if (error) throw error;
      }

      // Обновляем профиль с адресом кошелька
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: user?.id || (await supabase.auth.getUser()).data.user?.id,
          wallet_address: walletAddress 
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: t('error'),
        description: t('installMetaMask'),
        variant: 'destructive',
      });
      return;
    }

    setIsConnecting(true);

    try {
      // Запрашиваем подключение к кошельку
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      // Проверяем, подключена ли правильная сеть (BNB Smart Chain)
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x38') { // BNB Smart Chain ID
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            // Сеть не добавлена, добавляем её
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x38',
                chainName: 'BNB Smart Chain',
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18
                },
                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                blockExplorerUrls: ['https://bscscan.com/']
              }]
            });
          }
        }
      }

      setAccount(accounts[0]);
      setIsConnected(true);
      await getBalance(accounts[0]);
      await updateUserProfile(accounts[0]);

      toast({
        title: t('success'),
        description: t('walletConnected'),
      });

    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      toast({
        title: t('error'),
        description: t('walletConnectionError'),
        variant: 'destructive',
      });
    }

    setIsConnecting(false);
  };

  const disconnectWallet = async () => {
    setAccount(null);
    setIsConnected(false);
    setBalance('0');
    
    // Выходим из Supabase
    await supabase.auth.signOut();
    
    toast({
      title: t('success'),
      description: 'Кошелек отключен',
    });
  };

  return (
    <MetaMaskContext.Provider value={{
      account,
      isConnected,
      isConnecting,
      connectWallet,
      disconnectWallet,
      balance
    }}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (!context) {
    throw new Error('useMetaMask must be used within MetaMaskProvider');
  }
  return context;
};
