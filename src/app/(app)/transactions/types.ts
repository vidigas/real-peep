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
  listing: string | null;
  list_date: string | null;        // ISO date
  expiration_date: string | null;  // ISO date
  list_price_cents: number | null;
  gci_cents: number | null;
  lead_source: string | null;
  fees: Fee[] | null;
  created_at: string;
  updated_at: string;
}

export type NewTransactionInput = Omit<TransactionRow, 'id'|'user_id'|'created_at'|'updated_at'>;
export type UpdateTransactionInput = Partial<NewTransactionInput>;
export const TRANSACTION_STATUSES: TransactionStatus[] = ['active', 'pending', 'closed'];
export const TRANSACTION_TYPES: TransactionType[] = ['buyer', 'seller', 'tenant', 'landlord'];
