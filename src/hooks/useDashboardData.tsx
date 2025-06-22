
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Profile, Asset, UserToken, Transaction } from '@/types/dashboard';

export const useDashboardData = (account: string | null) => {
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
      console.log('Fetching profile for account:', account);
      
      // Сначала пытаемся найти по wallet_address
      let { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', account)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Если профиль не найден, создаем новый
        console.log('Profile not found, creating new profile');
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({ 
            wallet_address: account,
            cosmo_balance: 10000,
            bnb_balance: 1
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          return;
        }
        profileData = newProfile;
      } else if (profileError) {
        console.error('Error fetching profile:', profileError);
        return;
      }

      console.log('Profile data:', profileData);
      setProfile(profileData);
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
    }
  };

  const fetchAssets = async () => {
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching assets:', error);
        return;
      }
      
      console.log('Assets data:', data);
      setAssets(data || []);
    } catch (error) {
      console.error('Unexpected error fetching assets:', error);
    }
  };

  const fetchUserTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('user_tokens')
        .select('*')
        .eq('user_id', account);
      
      if (error) {
        console.error('Error fetching user tokens:', error);
        return;
      }
      
      console.log('User tokens data:', data);
      setUserTokens(data || []);
    } catch (error) {
      console.error('Unexpected error fetching user tokens:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', account)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching transactions:', error);
      } else {
        console.log('Transactions data:', data);
        setTransactions(data || []);
      }
    } catch (error) {
      console.error('Unexpected error fetching transactions:', error);
    }
    
    setLoading(false);
  };

  return {
    profile,
    assets,
    userTokens,
    transactions,
    loading
  };
};
