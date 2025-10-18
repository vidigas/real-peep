// src/domain/transactions/variants/buyer.ts
import { z } from 'zod';
import { VariantSpec, TxnStatus, FeeRow } from '../schema';

const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DC','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV'] as const;

const B0 = z.object({ type: z.literal('buyer') });
const B1 = z.object({
  buyer_full_name: z.string().min(1, 'Required'),
  budget_cents: z.number().int().nonnegative().optional(),
  agreement_start: z.string().optional(),
  agreement_end: z.string().optional(),
});
const B2 = z.object({
  buyer_agent_pct: z.number().min(0).max(100).optional(),
  broker_share_pct: z.number().min(0).max(100).optional(),
  fees: z.array(FeeRow).default([]),
  lead_source: z.string().optional(),
  lead_source_other: z.string().optional(),
});
const B3 = z.object({ status: TxnStatus });

export const BuyerSchema = B0.and(B1).and(B2).and(B3);
export type BuyerForm = z.infer<typeof BuyerSchema>;

export const BuyerVariant: VariantSpec<BuyerForm> = {
  type: 'buyer',
  defaults: { type:'buyer', status:'active', fees:[] },
  steps: [
    {
      id:'type', title:'Transaction Type',
      fields:[{ name:'type', kind:'radio-cards', options:[
        { value:'buyer', label:'Buyer' },
        { value:'seller', label:'Seller' },
        { value:'tenant', label:'Tenant' },
        { value:'landlord', label:'Landlord' },
      ]}], schema: B0
    },
    {
      id:'buyer', title:'Buyer Details',
      fields:[
        { name:'buyer_full_name', label:'Full Name', kind:'text', width:'1/2', placeholder:'Full Name' },
        { name:'budget_cents', label:`Buyer's Budget`, kind:'currency', width:'1/2', placeholder:'$ 1,000.00' },
        { name:'agreement_start', label:'Start Date', kind:'date', width:'1/2' },
        { name:'agreement_end', label:'Expiration Date', kind:'date', width:'1/2' },
      ],
      schema: B1,
    },
    {
      id:'commission', title:'Commission Details',
      fields:[
        { name:'buyer_agent_pct', label:'Buyer Agent %', kind:'percent', width:'1/2' },
        { name:'broker_share_pct', label:'% to Broker', kind:'percent', width:'1/2' },
        { name:'fees', label:'Other fees', kind:'fees', width:'full' },
        { name:'lead_source', label:'Source', kind:'select', width:'1/2', options:[
          { value:'expired_cancelled', label:'Expired/Cancelled' },
          { value:'open_house', label:'Open House' },
          { value:'soi', label:'SOI (Sphere of influence)' },
          { value:'other', label:'Other' },
        ]},
        { name:'lead_source_other', label:'', kind:'text', width:'1/2', placeholder:'If Other, type here' },
      ],
      schema: B2,
    },
    {
      id:'status', title:'Status',
      fields:[{ name:'status', kind:'radio-cards', options:[
        { value:'active', label:'Active' },
        { value:'pending', label:'Pending' },
        { value:'closed', label:'Closed' },
      ]}], schema: B3
    }
  ],
  toPayload: (d) => d,
};