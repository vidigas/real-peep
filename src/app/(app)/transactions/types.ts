// src/domain/transactions/types.ts
export type TransactionType = 'buyer' | 'seller' | 'tenant' | 'landlord';
export type TransactionStatus = 'active' | 'pending' | 'closed';

export type FeeUnit = 'usd' | 'percent';
export type FeeBasis = 'pre_split' | 'post_split';

export interface Fee {
  label: string;
  unit: FeeUnit;
  basis: FeeBasis;
  amount_cents?: number | null;
  percent?: number | null;
}

export interface TransactionRow {
  id: string;
  user_id: string;
  type: TransactionType;
  status: TransactionStatus;
  client_name: string;
  property_address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  property_type: string | null;
  list_price: number | null;
  buyer_budget: number | null;
  listing_date: string | null;        // ISO date
  expiration_date: string | null;    // ISO date
  agreement_start_date: string | null;
  agreement_end_date: string | null;
  listing_agent_percentage: number | null;
  buyer_agent_percentage: number | null;
  broker_split_percentage: number | null;
  gci: number | null;
  lead_source: string | null;
  currency: string;
  details: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export type NewTransactionInput = Omit<TransactionRow, 'id'|'user_id'|'created_at'|'updated_at'>;
export type UpdateTransactionInput = Partial<NewTransactionInput>;
export const TRANSACTION_STATUSES: TransactionStatus[] = ['active', 'pending', 'closed'];
export const TRANSACTION_TYPES: TransactionType[] = ['buyer', 'seller', 'tenant', 'landlord'];
