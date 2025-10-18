'use client';
import React from 'react';
import { Modal, ModalBody, ModalFooter } from '@/components/Modal';
import Stepper, { type Step } from '@/components/Stepper';
import { RadioGroup, RadioGroupItem } from '@/components/RadioGroup';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';

type TransactionType = 'buyer' | 'seller' | 'tenant' | 'landlord';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: { type: TransactionType }) => void;
};

export default function AddTransactionModal({ isOpen, onClose, onSave }: Props) {
  const [current, setCurrent] = React.useState(0);

  // rail-only stepper data (labels live in content header)
  const steps: Step[] = [
    { id: 'type', status: 'active' },
    { id: 'details', status: 'pending' },
    { id: 'fees', status: 'pending' },
    { id: 'status', status: 'pending' },
  ];

  const stepMeta = [
    { title: 'Transaction Type', desc: 'Which type of transaction are you adding?' },
    { title: 'Details',          desc: 'Key info for the record' },
    { title: 'Commission & Fees',desc: 'Configure splits & fees' },
    { title: 'Status',           desc: 'Track status & lead source' },
  ] as const;

  const [type, setType] = React.useState<TransactionType>('buyer');

  const next = () => { if (current < 3) setCurrent((c) => c + 1); };
  const back = () => { if (current > 0) setCurrent((c) => c - 1); };
  const save = () => { onSave?.({ type }); onClose(); };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Transaction"
      size="xl"
      contentClassName="p-0"
    >
      {/* Stepper rail */}
      <div className="px-6 pt-6">
        <Stepper steps={steps} current={current} size="md" className="w-full" showHalo />
      </div>

      {/* Step header */}
      <div className="px-6 pt-6">
        <h3 className="text-[20px] leading-[28px] font-semibold text-[#1A1A1A]">
          {stepMeta[current].title}
        </h3>
        {stepMeta[current].desc && (
          <p className="text-sm text-gray-500 mt-1">{stepMeta[current].desc}</p>
        )}
      </div>

      {/* Content body (now flexible, scrollable) */}
      <ModalBody className="pt-4 pb-0">
        {current === 0 && (
          <section className="space-y-4">
            <RadioGroup
              value={type}
              onChange={(v) => setType(v as TransactionType)}
              orientation="horizontal"
              variant="card"
              className="gap-4 flex-wrap"
            >
              <RadioGroupItem value="buyer" label="Buyer" />
              <RadioGroupItem value="seller" label="Seller" />
              <RadioGroupItem value="tenant" label="Tenant" />
              <RadioGroupItem value="landlord" label="Landlord" />
            </RadioGroup>
          </section>
        )}

        {current === 1 && <div className="text-gray-500">Details step…</div>}
        {current === 2 && <div className="text-gray-500">Commission & Fees…</div>}
        {current === 3 && <div className="text-gray-500">Status & Lead Source…</div>}
      </ModalBody>

      {/* Footer (pinned) */}
      <ModalFooter>
        <div className="flex items-center gap-2">
          <Button hierarchy="tertiary-gray">+ Checklist</Button>
        </div>

        <div className="flex items-center gap-2">
          <Button hierarchy="secondary-gray" disabled={current === 0} onClick={back}>
            Back
          </Button>
          {current < 3 ? (
            <Button hierarchy="primary" onClick={next}>
              Continue
            </Button>
          ) : (
            <Button hierarchy="primary" onClick={save}>
              Save
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
}
