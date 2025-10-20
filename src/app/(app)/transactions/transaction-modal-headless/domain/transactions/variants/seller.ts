import { z } from 'zod';
import { VariantSpec, TxnStatus, FeeRow } from '../schema';

const PROPERTY_TYPES = [
  { value: 'single_family_home', label: 'Single-Family Home' },
  { value: 'condo', label: 'Condo' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'multi_family', label: 'Multi-Family' },
  { value: 'vacant_land', label: 'Vacant Land' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'other', label: 'Other' },
] as const;

const STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DC','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME',
  'MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX',
  'UT','VA','VT','WA','WI','WV'
] as const;

/* ---------- Schemas ---------- */
const S0 = z.object({ type: z.literal('seller') });

// Only owner_full_name required
const S1 = z.object({
  owner_full_name: z.string().min(1, 'Required'),
  property_type: z.enum(PROPERTY_TYPES.map(o => o.value) as [string, ...string[]]).optional(),
  address_line: z.string().optional(),
  city: z.string().optional(),
  zip_code: z.string().optional(),
  state: z.enum(STATES as unknown as [string, ...string[]]).optional(),
});

const S2 = z.object({
  list_price_cents: z.number().int().nonnegative().optional(),
  list_date: z.string().optional(),
  expiration_date: z.string().optional(),
  listing_agent_pct: z.number().min(0).max(100).optional(),
  broker_share_pct: z.number().min(0).max(100).optional(),
  fees: z.array(FeeRow).default([]).optional(),
  lead_source: z.string().optional(),
  lead_source_other: z.string().optional(),
});

const S3 = z.object({
  status: TxnStatus.optional(),
});

export const SellerSchema = S0.and(S1).and(S2).and(S3);
export type SellerForm = z.infer<typeof SellerSchema>;

/* ---------- Variant ---------- */
export const SellerVariant: VariantSpec<SellerForm> = {
  type: 'seller',
  rootSchema: SellerSchema,
  defaults: {
    type: 'seller',
    status: 'active',
    property_type: 'single_family_home',
    fees: [],
  },
  steps: [
    {
      id: 'type',
      title: 'Transaction Type',
      description: 'Which type of transaction are you adding?',
      fields: [
        {
          name: 'type',
          kind: 'radio-cards',
          options: [
            { value: 'buyer', label: 'Buyer' },
            { value: 'seller', label: 'Seller' },
            { value: 'tenant', label: 'Tenant', disabled: true },
            { value: 'landlord', label: 'Landlord', disabled: true },
          ],
        },
      ],
      fieldNames: ['type'],
    },
    {
      id: 'property',
      title: 'Property Details',
      fields: [
        { name: 'owner_full_name', label: 'Full Name', kind: 'text', width: '1/2', placeholder: 'Full Name' },
        {
          name: 'property_type',
          label: 'Property type',
          kind: 'select',
          width: '1/2',
          options: PROPERTY_TYPES as unknown as Array<{ value: string; label: string }>,
        },
        { name: 'address_line', label: 'Address', kind: 'text', width: 'full', placeholder: 'Enter Address' },
        { name: 'city', label: 'City', kind: 'text', width: '1/3' },
        { name: 'zip_code', label: 'Zip Code', kind: 'text', width: '1/3' },
        {
          name: 'state',
          label: 'State',
          kind: 'select',
          width: '1/3',
          options: STATES.map(s => ({ value: s, label: s })) as unknown as Array<{ value: string; label: string }>,
        },
      ],
      fieldNames: ['owner_full_name', 'property_type', 'address_line', 'city', 'zip_code', 'state'],
    },
    {
      id: 'listing',
      title: 'Listing Details',
      fields: [
        { name: 'list_price_cents', label: 'List Price', kind: 'currency', width: '1/3', placeholder: '$ 1,000.00' },
        { name: 'list_date', label: 'List Date', kind: 'date', width: '1/3' },
        { name: 'expiration_date', label: 'Expiration Date', kind: 'date', width: '1/3' },
        { name: 'listing_agent_pct', label: 'Listing Agent %', kind: 'percent', width: '1/2' },
        { name: 'broker_share_pct', label: '% to Broker', kind: 'percent', width: '1/2' },
        { name: 'fees', label: 'Other fees', kind: 'fees', width: 'full' },
        {
          name: 'lead_source',
          label: 'Source',
          kind: 'select',
          width: '1/2',
          options: [
            { value: 'expired_cancelled', label: 'Expired/Cancelled' },
            { value: 'open_house', label: 'Open House' },
            { value: 'soi', label: 'SOI (Sphere of influence)' },
            { value: 'other', label: 'Other' },
          ],
        },
        { name: 'lead_source_other', label: '', kind: 'text', width: '1/2', placeholder: 'If Other, type here' },
      ],
      fieldNames: [
        'list_price_cents',
        'list_date',
        'expiration_date',
        'listing_agent_pct',
        'broker_share_pct',
        'fees',
        'lead_source',
        'lead_source_other',
      ],
    },
    {
      id: 'status',
      title: 'Status',
      fields: [
        {
          name: 'status',
          kind: 'radio-cards',
          options: [
            { value: 'active', label: 'Active' },
            { value: 'pending', label: 'Pending' },
            { value: 'closed', label: 'Closed' },
          ],
        },
      ],
      fieldNames: ['status'],
    },
  ],
  toPayload: (d) => d as Record<string, unknown>,
};
