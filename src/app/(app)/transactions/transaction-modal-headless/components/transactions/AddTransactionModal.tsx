'use client';

import React from 'react';
import { Modal, ModalBody, ModalFooter } from '@/components/Modal';
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
import { NewTransactionInput, Fee } from '../../../types';

type TxnTypeAll = 'buyer' | 'seller' | 'tenant' | 'landlord';
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

  const activeVariant = (variantByType[type] ?? BuyerVariant) as unknown as VariantSpec<
    Record<string, unknown>
  >;

  const { methods, steps, step, stepIdx, setStepIdx, next, back, isLast, submitAll } =
    useTransactionForm(activeVariant);

  React.useEffect(() => {
    const base = activeVariant.defaults as FieldValues;
    const init = initialData ? { ...base, ...initialData } : base;
    methods.reset(init);
    setStepIdx(0);
  }, [activeVariant, initialData, methods, setStepIdx]);

  const onSubmit = submitAll(async (payload) => {
    const tx = payload as { type: TxnTypeAll } & Record<string, unknown>;

    const clean: NewTransactionInput = {
      type: tx.type as 'buyer' | 'seller' | 'tenant' | 'landlord',
      status:
        (['active', 'pending', 'closed'] as const).includes(tx.status as 'active' | 'pending' | 'closed')
          ? (tx.status as 'active' | 'pending' | 'closed')
          : 'active',
      listing: typeof tx.property_address === 'string' ? tx.property_address : null,
      list_date:
        typeof tx.list_date === 'string'
          ? tx.list_date
          : tx.list_date instanceof Date
          ? tx.list_date.toISOString().split('T')[0]
          : null,
      expiration_date:
        typeof tx.expiration_date === 'string'
          ? tx.expiration_date
          : tx.expiration_date instanceof Date
          ? tx.expiration_date.toISOString().split('T')[0]
          : null,
      list_price_cents:
        typeof tx.list_price_cents === 'number'
          ? tx.list_price_cents
          : typeof tx.list_price === 'number'
          ? Math.round(tx.list_price * 100)
          : null,
      gci_cents:
        typeof tx.gci_cents === 'number'
          ? tx.gci_cents
          : typeof tx.gci === 'number'
          ? Math.round(tx.gci * 100)
          : null,
      lead_source: typeof tx.lead_source === 'string' ? tx.lead_source : null,
      fees: Array.isArray(tx.fees) ? (tx.fees as Fee[]) : null,
    };

    await onSave?.(clean);
    onClose();
  });

  const stepper: Step[] = steps.map((s, i) => ({
    id: s.id,
    status: i < stepIdx ? 'completed' : i === stepIdx ? 'active' : 'pending',
  }));

  // optional description from schema (not typed) – used for the subtitle
  const stepDescription = (step as { description?: string })?.description;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Form"
      size="xl"
      contentClassName="p-0"
      subHeader={
        <div className="px-5 pt-2 pb-3">
          <Stepper steps={stepper} current={stepIdx} className="w-full" />
        </div>
      }
    >
      {/* scrollable content */}
      <div className="px-5">
        {/* Title + optional subtitle */}
        <div className="mt-6">
          <Text as="h3" size="xl" weight="bold" color="heading" className="leading-[30px]">
            {step.title}
          </Text>
          {stepDescription && (
            <Text as="p" size="md" weight="normal" color="heading" className="mt-1">
              {stepDescription}
            </Text>
          )}
        </div>

        <TransactionFormProvider methods={methods}>
          <ModalBody className="pt-6 pb-24">
            {step.id === 'type' ? (
              <section className="space-y-6">
                <RadioGroup
                  value={type}
                  onChange={(v) => setType(v as TransactionType)}
                  variant="card"
                  layout="grid"
                  columns={4}
                >
                  <RadioGroupItem value="buyer" label="Buyer" />
                  <RadioGroupItem value="seller" label="Seller" />
                  {/* <RadioGroupItem value="tenant" label="Tenant" />
                  <RadioGroupItem value="landlord" label="Landlord" /> */}
                </RadioGroup>
              </section>
            ) : (
              <div className="grid grid-cols-12 gap-x-6 gap-y-6">
                {step.fields.map((spec) => {
                  if (spec.name === 'lead_source_other') {
                    const ls = methods.watch('lead_source' as keyof FieldValues);
                    if (ls !== 'other') return null;
                  }
                  return (
                    <FieldRenderer
                      key={String(spec.name)}
                      spec={spec as Record<string, unknown>}
                    />
                  );
                })}
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <div className="flex items-center gap-2">
              <Button hierarchy="tertiary-gray">+ Checklist</Button>
            </div>
            <div className="flex items-center gap-2">
              <Button hierarchy="secondary-gray" disabled={stepIdx === 0} onClick={back}>
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
        </TransactionFormProvider>
      </div>
    </Modal>
  );
}
