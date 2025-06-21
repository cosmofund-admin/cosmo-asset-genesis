
export interface Profile {
  id: string;
  wallet_address: string;
  cosmo_balance: number;
  bnb_balance: number;
  created_at: string;
  updated_at: string;
}

export interface Asset {
  id: string;
  name: string;
  description: string;
  asset_type: string;
  value_usd: number;
  location: string;
}

export interface UserToken {
  id: string;
  asset_id: string;
  user_id: string;
  token_type: string;
  amount: number;
}

export interface Transaction {
  id: string;
  asset_id: string;
  user_id: string;
  transaction_type: string;
  amount_cosmo: number;
  amount_bnb: number;
  token_amount: number;
  token_type: string;
  created_at: string;
  status: string;
}
