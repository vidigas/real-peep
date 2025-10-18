import { z } from 'zod';
import type { Path } from 'react-hook-form';

/** ---------- Enums ---------- */
export const TxnStatus = z.enum(['active', 'pending', 'closed']);
export const TxnType = z.enum(['buyer', 'seller', 'tenant', 'landlord']);

/** ---------- Fee row ---------- */
export const FeeRow = z
  .object({
    label: z.string().min(1, 'Required'),
    unit: z.enum(['usd', 'percent']),
    basis: z.enum(['pre_split', 'post_split']),
    amount_cents: z.number().int().nonnegative().optional(),
    percent: z.number().min(0).max(100).optional(),
  })
  .refine(
    (r) =>
      (r.unit === 'usd' && r.amount_cents != null) ||
      (r.unit === 'percent' && r.percent != null),
    { message: 'Provide value according to unit' }
  );
export type FeeRow = z.infer<typeof FeeRow>;

/** ---------- UI field specs ---------- */
export type FieldKind =
  | 'text'
  | 'currency'
  | 'percent'
  | 'date'
  | 'select'
  | 'radio-cards'
  | 'segmented'
  | 'fees';

export type FieldSpec = {
  name: string;
  label?: string;
  placeholder?: string;
  kind: FieldKind;
  options?: { value: string; label: string }[];
  help?: string;
  width?: 'full' | '1/2' | '1/3' | '2/3';
  disabled?: boolean;
};

export type StepSpec<FormT> = {
  id: string;
  title: string;
  description?: string;
  fields: FieldSpec[];     // for rendering
  fieldNames: Path<FormT>[]; // for RHF trigger([...])
};

/**
 * To avoid cross-package generic headaches, keep rootSchema as ZodTypeAny.
 * We’ll narrow at the resolver boundary inside the hook.
 */
export type VariantSpec<FormT> = {
  type: z.infer<typeof TxnType>;
  rootSchema: z.ZodTypeAny;
  defaults: Partial<FormT>;
  steps: StepSpec<FormT>[];
  toPayload: (data: FormT) => Record<string, unknown>;
  fromPayload?: (payload: Record<string, unknown>) => Partial<FormT>;
};

/** ---------- Common option lists ---------- */
const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'closed', label: 'Closed' },
] as const;

const leadSourceOptions = [
  { value: 'referral', label: 'Referral' },
  { value: 'website', label: 'Website' },
  { value: 'zillow', label: 'Zillow' },
  { value: 'other', label: 'Other' },
] as const;

/** ===================== BUYER ===================== */

export const BuyerFormSchema = z
  .object({
    type: z.literal('buyer'),
    buyer_name: z.string().min(1, 'Required'),
    budget_cents: z.number().int().nonnegative().optional(),
    agreement_start: z.string().optional(),
    agreement_end: z.string().optional(),
    fees: z.array(FeeRow).default([]),
    status: TxnStatus.default('active'),
    lead_source: z
      .enum(leadSourceOptions.map((o) => o.value) as [string, ...string[]])
      .optional(),
    lead_source_other: z.string().optional(),
  })
  .strict();
export type BuyerForm = z.infer<typeof BuyerFormSchema>;

const buyerSteps: StepSpec<BuyerForm>[] = [
  {
    id: 'buyer-basics',
    title: 'Buyer',
    description: 'Buyer details and agreement window',
    fields: [
      { name: 'buyer_name', label: 'Buyer name', kind: 'text', width: '1/2', placeholder: 'Full name' },
      { name: 'budget_cents', label: 'Budget', kind: 'currency', width: '1/2', placeholder: '$0.00' },
      { name: 'agreement_start', label: 'Agreement start', kind: 'date', width: '1/2' },
      { name: 'agreement_end', label: 'Agreement end', kind: 'date', width: '1/2' },
    ],
    fieldNames: ['buyer_name', 'budget_cents', 'agreement_start', 'agreement_end'],
  },
  {
    id: 'buyer-fees',
    title: 'Commission & Fees',
    description: 'Configure commission and fee rows',
    fields: [{ name: 'fees', label: 'Fees', kind: 'fees', width: 'full' }],
    fieldNames: ['fees'],
  },
  {
    id: 'buyer-status',
    title: 'Status',
    description: 'Track status and lead source',
    fields: [
      { name: 'status', label: 'Status', kind: 'segmented', options: [...statusOptions], width: 'full' },
      { name: 'lead_source', label: 'Lead source', kind: 'select', options: [...leadSourceOptions], width: '1/2' },
      { name: 'lead_source_other', label: 'Other source', kind: 'text', width: '1/2', placeholder: 'Type source' },
    ],
    fieldNames: ['status', 'lead_source', 'lead_source_other'],
  },
];

const buyerDefaults: Partial<BuyerForm> = {
  type: 'buyer',
  buyer_name: '',
  budget_cents: undefined,
  agreement_start: undefined,
  agreement_end: undefined,
  fees: [],
  status: 'active',
  lead_source: undefined,
  lead_source_other: '',
};

export const buyerVariant: VariantSpec<BuyerForm> = {
  type: 'buyer',
  rootSchema: BuyerFormSchema,
  defaults: buyerDefaults,
  steps: buyerSteps,
  toPayload: (data) => data,
  fromPayload: (p) => p as Partial<BuyerForm>,
};

/** ===================== SELLER ===================== */

export const SellerFormSchema = z
  .object({
    type: z.literal('seller'),
    listing_address: z.string().min(1, 'Required'),
    list_date: z.string().optional(),
    expiration_date: z.string().optional(),
    price_cents: z.number().int().nonnegative().optional(),
    fees: z.array(FeeRow).default([]),
    status: TxnStatus.default('active'),
    lead_source: z
      .enum(leadSourceOptions.map((o) => o.value) as [string, ...string[]])
      .optional(),
    lead_source_other: z.string().optional(),
  })
  .strict();
export type SellerForm = z.infer<typeof SellerFormSchema>;

const sellerSteps: StepSpec<SellerForm>[] = [
  {
    id: 'seller-listing',
    title: 'Listing',
    description: 'Listing details & pricing',
    fields: [
      { name: 'listing_address', label: 'Listing', kind: 'text', width: 'full', placeholder: '123 Main St' },
      { name: 'list_date', label: 'List date', kind: 'date', width: '1/2' },
      { name: 'expiration_date', label: 'Expiration date', kind: 'date', width: '1/2' },
      { name: 'price_cents', label: 'List price', kind: 'currency', width: '1/2', placeholder: '$0.00' },
    ],
    fieldNames: ['listing_address', 'list_date', 'expiration_date', 'price_cents'],
  },
  {
    id: 'seller-fees',
    title: 'Commission & Fees',
    description: 'Configure commission and fee rows',
    fields: [{ name: 'fees', label: 'Fees', kind: 'fees', width: 'full' }],
    fieldNames: ['fees'],
  },
  {
    id: 'seller-status',
    title: 'Status',
    description: 'Track status and lead source',
    fields: [
      { name: 'status', label: 'Status', kind: 'segmented', options: [...statusOptions], width: 'full' },
      { name: 'lead_source', label: 'Lead source', kind: 'select', options: [...leadSourceOptions], width: '1/2' },
      { name: 'lead_source_other', label: 'Other source', kind: 'text', width: '1/2', placeholder: 'Type source' },
    ],
    fieldNames: ['status', 'lead_source', 'lead_source_other'],
  },
];

const sellerDefaults: Partial<SellerForm> = {
  type: 'seller',
  listing_address: '',
  list_date: undefined,
  expiration_date: undefined,
  price_cents: undefined,
  fees: [],
  status: 'active',
  lead_source: undefined,
  lead_source_other: '',
};

export const sellerVariant: VariantSpec<SellerForm> = {
  type: 'seller',
  rootSchema: SellerFormSchema,
  defaults: sellerDefaults,
  steps: sellerSteps,
  toPayload: (data) => data,
  fromPayload: (p) => p as Partial<SellerForm>,
};
