'use client';

import React from 'react';
import Stepper, { type Step } from '@/components/Stepper';
import { RadioGroup, RadioGroupItem } from '@/components/RadioGroup';
import { Button } from '@/components/Button';
import { Text } from '@/components/Typography';
import { BuyerVariant, SellerVariant } from '../../domain/transactions/variants';
import type { FieldValues } from 'react-hook-form';
import {
  useTransactionForm,
  TransactionFormProvider,
} from '../../domain/transactions/form-controller';
import type { VariantSpec } from '../../domain/transactions/schema';
import { FieldRenderer } from './FieldRenderer';
import type { NewTransactionInput, TransactionStatus } from '../../../types';
import { TRANSACTION_STATUSES } from '../../../types';
import { Modal, ModalBody, ModalFooter } from '@/components';

/* ---------------------- helpers ---------------------- */
const isFiniteNumber = (n: unknown): n is number =>
  typeof n === 'number' && Number.isFinite(n);

const toCents = (n: unknown): number | null => {
  if (isFiniteNumber(n)) return Math.round(n * 100);
  return null;
};

// date parsing helper removed (unused)

const cleanString = (v: unknown): string | null => {
  if (typeof v !== 'string') return null;
  const s = v.trim();
  return s.length ? s : null;
};

const betterSerialize = (e: unknown) => {
  if (e instanceof Error) return `${e.name}: ${e.message}`;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
};
/* ----------------------------------------------------- */

/* ---------------------- fixed design metrics ---------------------- */
const PANEL_H = 647;
const TITLE_ROW_H = 56; // header (px-6 pt-6 pb-0)
const SUBHEADER_H = 48; // Stepper wrapper
const FOOTER_H = 64; // footer visual height (py-3 + button height)
const SCROLL_H = `calc(${PANEL_H}px - ${TITLE_ROW_H}px - ${SUBHEADER_H}px - ${FOOTER_H}px)`;
/* ------------------------------------------------------------------ */

type TransactionType = 'buyer' | 'seller';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (payload: NewTransactionInput) => void | Promise<void>;
  initialData?: Partial<NewTransactionInput>;
};

const variantByType = {
  buyer: BuyerVariant,
  seller: SellerVariant,
} as const;

export default function AddTransactionModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [type, setType] = React.useState<TransactionType>(
    (initialData?.type as TransactionType) ?? 'buyer'
  );

  const activeVariant = (variantByType[type] ??
    BuyerVariant) as unknown as VariantSpec<Record<string, unknown>>;

  const {
    methods,
    steps,
    step,
    stepIdx,
    setStepIdx,
    next,
    back,
    isLast,
    submitAll,
  } = useTransactionForm(activeVariant);

  React.useEffect(() => {
    const base = activeVariant.defaults as FieldValues;
    const init = initialData ? { ...base, ...initialData } : base;
    methods.reset(init);
    setStepIdx(0);
  }, [activeVariant, initialData, methods, setStepIdx]);

  const onSubmit = submitAll(async (payload) => {
    const tx = payload as Record<string, unknown>;
  
    const leadSource =
      tx.lead_source === 'other'
        ? cleanString(tx.lead_source_other)
        : cleanString(tx.lead_source);
  
    // keep numeric normalization helpers around, but we are not sending these fields yet
  
    // fees omitted from payload for now (table does not consume it yet)
  
    // 👉 Only include fields we’re confident the table has right now.
    const clean: Partial<NewTransactionInput> = {
      type: tx.type === 'seller' || tx.type === 'buyer' ? (tx.type as 'buyer' | 'seller') : 'buyer',
      status: (TRANSACTION_STATUSES.includes(tx.status as TransactionStatus)
        ? (tx.status as TransactionStatus)
        : 'active') as TransactionStatus,
      lead_source: leadSource,
    };
  
    try {
      await onSave?.(clean as NewTransactionInput);
      onClose();
    } catch (err) {
      console.error('Save transaction failed:', err);
      alert(`Could not save transaction: ${betterSerialize(err)}`);
    }
  });
  

  const stepper: Step[] = steps.map((s, i) => ({
    id: s.id,
    status: i < stepIdx ? 'completed' : i === stepIdx ? 'active' : 'pending',
  }));

  const stepDescription = (step as { description?: string })?.description;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Form"
      size="xl"
      // ❗ Use literal classes so Tailwind generates them
      panelClassName="w-[888px] h-[647px] max-h-[85vh]"
      contentClassName="p-0 flex h-full flex-col"
      headerClassName="px-6 pt-6 pb-0 h-[56px]"
      subHeader={
        <div className="px-6 h-[48px] flex items-center">
          <Stepper steps={stepper} current={stepIdx} className="w-full" />
        </div>
      }
    >
      {/* Scrollable middle: no side padding here to avoid double gutters */}
      <div className="overflow-y-auto" style={{ height: SCROLL_H }}>
        <TransactionFormProvider methods={methods}>
          {/* Single padded body = 24px sides, aligned with header/stepper */}
          <ModalBody className="pt-6 pb-8">
            <div className="mb-6">
              <Text as="h3" size="md" className="text-[20px] leading-[30px] font-bold text-[#1A1A1A]">
                {step.title}
              </Text>
              {stepDescription && (
                <Text as="p" size="sm" className="mt-1 text-[14px] leading-[22px] text-[#1A1A1A]">
                  {stepDescription}
                </Text>
              )}
            </div>

            {step.id === 'type' ? (
              <section className="mt-6">
                <RadioGroup
                  value={type}
                  onChange={(v) => setType(v as TransactionType)}
                  variant="card"
                  layout="grid"
                  columns={4}
                >
                  <RadioGroupItem value="buyer" label="Buyer" />
                  <RadioGroupItem value="seller" label="Seller" />
                </RadioGroup>
              </section>
            ) : (
              <div className="grid grid-cols-12 gap-x-6 gap-y-6">
                {step.fields.map((spec) => {
                  if (spec.name === 'lead_source_other') {
                    const ls = methods.watch('lead_source' as keyof FieldValues);
                    if (ls !== 'other') return null;
                  }
                  return <FieldRenderer key={String(spec.name)} spec={spec as Record<string, unknown>} />;
                })}
              </div>
            )}
          </ModalBody>
        </TransactionFormProvider>
      </div>

      {/* Fixed footer — gutters come from ModalFooter (px-6 py-3); 8px between buttons */}
      <ModalFooter className="sticky bottom-0 z-10">
        <div className="flex items-center gap-2">
          <Button hierarchy="tertiary-gray">+ Checklist</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button hierarchy="secondary-gray" onClick={back} disabled={stepIdx === 0}>
            Back
          </Button>
          {!isLast ? (
            <Button hierarchy="primary" onClick={next}>
              Next
            </Button>
          ) : (
            <Button hierarchy="primary" onClick={onSubmit}>
              Save
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
}
