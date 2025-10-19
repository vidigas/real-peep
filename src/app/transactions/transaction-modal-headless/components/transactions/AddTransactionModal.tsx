'use client';

import React from 'react';
import { Modal, ModalBody, ModalFooter } from '@/components/Modal';
import Stepper, { type Step } from '@/components/Stepper';
import { RadioGroup, RadioGroupItem } from '@/components/RadioGroup';
import { Button } from '@/components/Button';
import { Text } from '@/components/Typography';

import type { FieldValues } from 'react-hook-form';
import {
  useTransactionForm,
  TransactionFormProvider,
} from '../../domain/transactions/form-controller';
import type { VariantSpec } from '../../domain/transactions/schema';
import { BuyerVariant, SellerVariant } from '../../domain/transactions/variants';
import { FieldRenderer } from './FieldRenderer';

type TxnTypeAll = 'buyer' | 'seller' | 'tenant' | 'landlord';
type TransactionType = 'buyer' | 'seller';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: { type: TxnTypeAll } & Record<string, unknown>) => void;
};

const variantByType = {
  buyer: BuyerVariant,
  seller: SellerVariant,
} as const;

export default function AddTransactionModal({
  isOpen,
  onClose,
  onSave,
}: Props) {
  const [type, setType] = React.useState<TransactionType>('buyer');

  // cast through unknown to avoid invariance mismatch
  const activeVariant = (variantByType[type] ?? BuyerVariant) as unknown as VariantSpec<Record<string, unknown>>;

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
    methods.reset(activeVariant.defaults as FieldValues);
    setStepIdx(0);
  }, [activeVariant.type, activeVariant.defaults, methods, setStepIdx]);

  const onSubmit = submitAll((payload) => {
    onSave?.(payload as { type: TxnTypeAll } & Record<string, unknown>);
    onClose();
  });

  const stepper: Step[] = steps.map((s, i) => ({
    id: s.id,
    status: i < stepIdx ? 'completed' : i === stepIdx ? 'active' : 'pending',
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Form"
      size="xl"
      contentClassName="p-0"
    >
      {/* column container so footer pins; horizontal padding lives here */}
      <div className="flex flex-col min-h-[607px] px-5">
        {/* Stepper */}
        <div className="mt-3">
          <Stepper steps={stepper} current={stepIdx} className="w-full" />
        </div>

        {/* Section title */}
        <div className="mt-8">
          <Text
            as="h3"
            size="xl"
            weight="bold"
            color="heading"
            className="leading-[30px]"
          >
            {step.title}
          </Text>
        </div>

        <TransactionFormProvider methods={methods}>
          {/* Body grows and scrolls; zero bottom padding so divider sits closer */}
          <ModalBody className="flex-1 overflow-y-auto pt-6 pb-0">
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

          {/* Footer is now full-bleed + tighter via component defaults */}
          <ModalFooter>
            <div className="flex items-center gap-2">
              <Button hierarchy="tertiary-gray">+ Checklist</Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                hierarchy="secondary-gray"
                disabled={stepIdx === 0}
                onClick={back}
              >
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
