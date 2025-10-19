// src/domain/transactions/schema.ts
import { z } from 'zod';

/** ---------- Shared primitives ---------- */
export const TxnStatus = z.enum(['active', 'pending', 'closed']);
export type TxnStatus = z.infer<typeof TxnStatus>;

export type WidthToken = '1/3' | '1/2' | '2/3' | 'full' | '1/4' | '3/4';

export type FieldKind =
  | 'text'
  | 'select'
  | 'date'
  | 'currency'
  | 'percent'
  | 'radio-cards'
  | 'fees'
  | 'section-title';

export type Option = { value: string; label: string; disabled?: boolean };

export type FieldSpec = {
  name: string;
  kind: FieldKind;
  label?: string;
  title?: string;
  description?: string;
  width?: WidthToken;
  placeholder?: string;
  options?: Option[];
  disabled?: boolean;
};

export type StepSpec = {
  id: string;
  title: string;
  fields: FieldSpec[];
  /** Field names to validate for this step */
  fieldNames: string[];
};

export type VariantSpec<FormT> = {
  type: 'buyer' | 'seller';
  rootSchema: z.ZodType<FormT>;
  defaults: Partial<FormT>;
  steps: StepSpec[];
  /** Allow mapping / shaping before persistence */
  toPayload: (formValues: FormT) => Record<string, unknown>;
};

/** ---------- Fees row (used by both variants) ---------- */
export const FeeRow = z.object({
  id: z.string().uuid().optional(),       // created client-side
  label: z.string().min(1, 'Required'),
  unit: z.enum(['usd', 'percent']),
  basis: z.enum(['pre_split', 'post_split']).default('pre_split'),
  amount_cents: z.number().int().nonnegative().optional(),
  percent: z.number().min(0).max(100).optional(),
});
export type FeeRow = z.infer<typeof FeeRow>;
