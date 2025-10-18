import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Transaction {
  id: string;
  user_id: string;
  type: 'buyer' | 'seller';
  status: 'active' | 'pending' | 'closed';
  client_name: string;
  property_address?: string;
  city?: string;
  state?: string;
  zip?: string;
  property_type?: string;
  list_price?: number;
  buyer_budget?: number;
  listing_date?: string;
  expiration_date?: string;
  agreement_start_date?: string;
  agreement_end_date?: string;
  listing_agent_percentage?: number;
  buyer_agent_percentage?: number;
  broker_split_percentage?: number;
  gci?: number;
  lead_source?: string;
  currency: string;
  details: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateTransactionData {
  type: 'buyer' | 'seller';
  status?: 'active' | 'pending' | 'closed';
  client_name: string;
  property_address?: string;
  city?: string;
  state?: string;
  zip?: string;
  property_type?: string;
  list_price?: number;
  buyer_budget?: number;
  listing_date?: string;
  expiration_date?: string;
  agreement_start_date?: string;
  agreement_end_date?: string;
  listing_agent_percentage?: number;
  buyer_agent_percentage?: number;
  broker_split_percentage?: number;
  gci?: number;
  lead_source?: string;
  currency?: string;
  details?: Record<string, unknown>;
}

export interface UpdateTransactionData extends Partial<CreateTransactionData> {
  id: string;
}
