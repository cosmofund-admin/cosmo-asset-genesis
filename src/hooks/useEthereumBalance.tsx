
import { useState, useEffect } from 'react';

export const useEthereumBalance = (account: string | null) => {
  const [ethBalance, setEthBalance] = useState('0');
  const [cosmoEthBalance, setCosmoEthBalance] = useState('0');
  const [loading, setLoading] = useState(false);

  const COSMO_ETH_CONTRACT = '0x27cd7375478f189bdcf55616b088be03d9c4339c';

  useEffect(() => {
    if (account && typeof window.ethereum !== 'undefined') {
      fetchBalances();
    }
  }, [account]);

  const fetchBalances = async () => {
    if (!account || typeof window.ethereum === 'undefined') return;
    
    setLoading(true);
    
    try {
      // Получаем баланс ETH
      const ethBalance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest']
      });
      const ethBalanceInEth = parseInt(ethBalance, 16) / Math.pow(10, 18);
      setEthBalance(ethBalanceInEth.toFixed(4));

      // Получаем баланс COSMO в сети ETH
      // Проверяем, находимся ли мы в сети Ethereum
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      if (chainId === '0x1') { // Ethereum Mainnet
        try {
          // ERC-20 balanceOf метод
          const balanceOfABI = '0x70a08231000000000000000000000000' + account.slice(2).padStart(64, '0');
          
          const result = await window.ethereum.request({
            method: 'eth_call',
            params: [{
              to: COSMO_ETH_CONTRACT,
              data: balanceOfABI
            }, 'latest']
          });
          
          if (result && result !== '0x') {
            const balance = parseInt(result, 16) / Math.pow(10, 18); // Предполагаем 18 decimals
            setCosmoEthBalance(balance.toFixed(4));
          } else {
            setCosmoEthBalance('0');
          }
        } catch (error) {
          console.log('COSMO ETH balance fetch error:', error);
          setCosmoEthBalance('0');
        }
      } else {
        setCosmoEthBalance('0');
      }
    } catch (error) {
      console.error('Error fetching Ethereum balances:', error);
    }
    
    setLoading(false);
  };

  return {
    ethBalance,
    cosmoEthBalance,
    loading,
    refetch: fetchBalances
  };
};
