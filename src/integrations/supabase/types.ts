export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assets: {
        Row: {
          abt_price: number | null
          abt_supply: number | null
          abt_token_id: string
          agt_price: number | null
          agt_supply: number | null
          agt_token_id: string
          asset_type: string
          ast_price: number | null
          ast_supply: number | null
          ast_token_id: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          location: string
          name: string
          owner_id: string
          updated_at: string | null
          value_usd: number
        }
        Insert: {
          abt_price?: number | null
          abt_supply?: number | null
          abt_token_id: string
          agt_price?: number | null
          agt_supply?: number | null
          agt_token_id: string
          asset_type: string
          ast_price?: number | null
          ast_supply?: number | null
          ast_token_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          location: string
          name: string
          owner_id: string
          updated_at?: string | null
          value_usd: number
        }
        Update: {
          abt_price?: number | null
          abt_supply?: number | null
          abt_token_id?: string
          agt_price?: number | null
          agt_supply?: number | null
          agt_token_id?: string
          asset_type?: string
          ast_price?: number | null
          ast_supply?: number | null
          ast_token_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string
          name?: string
          owner_id?: string
          updated_at?: string | null
          value_usd?: number
        }
        Relationships: []
      }
      "Cosmo RWA": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      liquidity_pools: {
        Row: {
          asset_id: string
          cosmo_amount: number
          created_at: string | null
          id: string
          token_amount: number
          token_type: string
          total_liquidity: number
          updated_at: string | null
        }
        Insert: {
          asset_id: string
          cosmo_amount?: number
          created_at?: string | null
          id?: string
          token_amount?: number
          token_type: string
          total_liquidity?: number
          updated_at?: string | null
        }
        Update: {
          asset_id?: string
          cosmo_amount?: number
          created_at?: string | null
          id?: string
          token_amount?: number
          token_type?: string
          total_liquidity?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "liquidity_pools_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      loans: {
        Row: {
          asset_id: string
          borrower_id: string
          collateral_amount: number
          collateral_token_type: string
          created_at: string | null
          due_date: string
          id: string
          interest_rate: number
          lender_id: string | null
          loan_amount_cosmo: number
          loan_duration_days: number
          repaid_at: string | null
          status: string | null
        }
        Insert: {
          asset_id: string
          borrower_id: string
          collateral_amount: number
          collateral_token_type: string
          created_at?: string | null
          due_date: string
          id?: string
          interest_rate: number
          lender_id?: string | null
          loan_amount_cosmo: number
          loan_duration_days: number
          repaid_at?: string | null
          status?: string | null
        }
        Update: {
          asset_id?: string
          borrower_id?: string
          collateral_amount?: number
          collateral_token_type?: string
          created_at?: string | null
          due_date?: string
          id?: string
          interest_rate?: number
          lender_id?: string | null
          loan_amount_cosmo?: number
          loan_duration_days?: number
          repaid_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loans_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bnb_balance: number | null
          cosmo_balance: number | null
          created_at: string | null
          id: string
          updated_at: string | null
          wallet_address: string | null
        }
        Insert: {
          bnb_balance?: number | null
          cosmo_balance?: number | null
          created_at?: string | null
          id: string
          updated_at?: string | null
          wallet_address?: string | null
        }
        Update: {
          bnb_balance?: number | null
          cosmo_balance?: number | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount_bnb: number | null
          amount_cosmo: number | null
          asset_id: string | null
          created_at: string | null
          id: string
          status: string | null
          token_amount: number | null
          token_type: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount_bnb?: number | null
          amount_cosmo?: number | null
          asset_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          token_amount?: number | null
          token_type?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount_bnb?: number | null
          amount_cosmo?: number | null
          asset_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          token_amount?: number | null
          token_type?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_liquidity: {
        Row: {
          cosmo_contributed: number
          created_at: string | null
          id: string
          liquidity_amount: number
          pool_id: string
          token_contributed: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cosmo_contributed?: number
          created_at?: string | null
          id?: string
          liquidity_amount?: number
          pool_id: string
          token_contributed?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cosmo_contributed?: number
          created_at?: string | null
          id?: string
          liquidity_amount?: number
          pool_id?: string
          token_contributed?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_liquidity_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "liquidity_pools"
            referencedColumns: ["id"]
          },
        ]
      }
      user_tokens: {
        Row: {
          amount: number
          asset_id: string
          created_at: string | null
          id: string
          token_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount?: number
          asset_id: string
          created_at?: string | null
          id?: string
          token_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          asset_id?: string
          created_at?: string | null
          id?: string
          token_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tokens_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
