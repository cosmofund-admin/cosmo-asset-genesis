
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
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setTransactions(data);
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
