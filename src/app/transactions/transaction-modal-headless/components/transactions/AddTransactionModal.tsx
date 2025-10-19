'use client';
import React from 'react';
import { Modal, ModalBody, ModalFooter } from '@/components/Modal';
import Stepper, { type Step } from '@/components/Stepper';
import { RadioGroup, RadioGroupItem } from '@/components/RadioGroup';
import { Button } from '@/components/Button';
import { Text } from '@/components/Typography';

type TransactionType = 'buyer' | 'seller' | 'tenant' | 'landlord';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: { type: TransactionType }) => void;
};

export default function AddTransactionModal({ isOpen, onClose, onSave }: Props) {
  const [current, setCurrent] = React.useState(0);
  const [type, setType] = React.useState<TransactionType>('buyer');

  const steps: Step[] = [
    { id: 'type', status: 'active' },
    { id: 'details', status: 'pending' },
    { id: 'fees', status: 'pending' },
    { id: 'status', status: 'pending' },
  ];

  const stepMeta = [
    { title: 'Transaction Type',  desc: 'Which type of transaction are you adding?' },
    { title: 'Details',           desc: 'Key info for the record' },
    { title: 'Commission & Fees', desc: 'Configure splits & fees' },
    { title: 'Status',            desc: 'Track status & lead source' },
  ] as const;

  const next = () => current < 3 && setCurrent((c) => c + 1);
  const back = () => current > 0 && setCurrent((c) => c - 1);
  const save = () => { onSave?.({ type }); onClose(); };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Form"
      size="xl"
      contentClassName="p-0"
    >
      {/* Shared gutter — flex so footer stays pinned */}
      <div className="flex-1 min-h-0 px-6">
        {/* Title → Stepper = 24px */}
        <div className="mt-6">
          <Stepper steps={steps} current={current} className="w-full" />
        </div>

        {/* Stepper → Section title = 32px (per Figma) */}
        <div className="mt-8">
          <Text as="h3" size="xl" weight="bold" color="heading" className="leading-[30px]">
            {stepMeta[current].title}
          </Text>
          {stepMeta[current].desc && (
            <Text as="p" size="md" weight="normal" color="muted" className="mt-1 leading-[24px]">
              {stepMeta[current].desc}
            </Text>
          )}
        </div>

        {/* Body — starts 24px below section header */}
        <ModalBody className="px-0 pt-6 pb-0">
          {current === 0 && (
            <section className="space-y-4">
              <RadioGroup
                value={type}
                onChange={(v) => setType(v as TransactionType)}
                variant="card"
                layout="grid"
                columns={4}
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
      </div>

      <ModalFooter>
        <div className="flex items-center gap-2">
          <Button hierarchy="tertiary-gray">+ Checklist</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button hierarchy="secondary-gray" disabled={current === 0} onClick={back}>
            Back
          </Button>
          {current < 3 ? (
            <Button hierarchy="primary" onClick={next}>Save</Button>
          ) : (
            <Button hierarchy="primary" onClick={save}>Save</Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
}
