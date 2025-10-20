'use client';

import React from 'react';
import {
  Text,
  RadioGroup,
  RadioGroupItem,
  Select,
  ButtonGroup,
  ButtonGroupItem,
  Input,
  Button,
} from '@/components';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import DatePicker from '@/components/DatePicker';

function parseCurrencyToCents(input: string): number | undefined {
  if (!input) return undefined;
  const raw = input.replace(/[^\d.,-]/g, '').replace(',', '.');
  const num = Number(raw);
  if (Number.isNaN(num)) return undefined;
  return Math.round(num * 100);
}
function formatCentsToCurrency(cents?: number): string {
  if (cents == null) return '';
  return (cents / 100).toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}
function parsePercent(input: string): number | undefined {
  if (!input) return undefined;
  const num = Number(input.replace(/[^\d.-]/g, ''));
  if (Number.isNaN(num)) return undefined;
  return num;
}
function toCols(n: number): 2 | 3 | 4 | 5 | 6 {
  if (n <= 2) return 2;
  if (n === 3) return 3;
  if (n === 4) return 4;
  if (n === 5) return 5;
  return 6;
}

export function FieldRenderer({ spec }: { spec: Record<string, unknown> }) {
  const { control, setValue, watch } = useFormContext();

  const col =
    spec.width === '1/2'
      ? 'col-span-12 md:col-span-6'
      : spec.width === '1/3'
      ? 'col-span-12 md:col-span-4'
      : spec.width === '2/3'
      ? 'col-span-12 md:col-span-8'
      : 'col-span-12';

  // Section title w/ optional description
  if (spec.kind === 'section-title') {
    const { title, description } = spec as { title?: string; description?: string };
    return (
      <div className="col-span-12 mt-12">
        <Text as="h4" size="xl" weight="bold" color="heading" className="leading-[30px]">
          {String(title ?? '')}
        </Text>
        {description ? (
          <Text as="p" size="md" weight="normal" color="heading" className="mt-1 leading-[24px] mb-4">
            {description}
          </Text>
        ) : (
          <div className="mb-4" />
        )}
      </div>
    );
  }

  if (spec.kind === 'radio-cards') {
    const value = watch(spec.name as string);
    const opts = (spec as { options?: Array<{ value: string; label: string }> }).options || [];
    const requested = (spec as { columns?: number }).columns ?? opts.length;
    const cols = toCols(requested);

    return (
      <div className={col}>
        {(spec as { label?: string }).label ? (
          <Text as="label" size="sm" className="sr-only">
            {(spec as { label?: string }).label as string}
          </Text>
        ) : null}

        <RadioGroup
          value={value}
          onChange={(v) => setValue(spec.name as string, v)}
          variant="card"
          size="lg"
          layout="grid"
          columns={cols}
        >
          {opts.map((o) => (
            <RadioGroupItem key={o.value} value={o.value} label={o.label} />
          ))}
        </RadioGroup>
      </div>
    );
  }

  if (spec.kind === 'select') {
    return (
      <div className={col}>
        <Controller
          name={spec.name as string}
          control={control}
          render={({ field, fieldState }) => (
            <Select
              // keep menu above modal
              className="relative z-[201]"
              options={(spec as { options?: Array<{ value: string; label: string }> }).options || []}
              label={(spec as { label?: string }).label as string}
              placeholder={(spec as { placeholder?: string }).placeholder || 'Select'}
              value={field.value ?? ''}
              onChange={(v) => field.onChange(v)}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>
    );
  }

  if (spec.kind === 'segmented') {
    return (
      <div className={col}>
        <Controller
          name={spec.name as string}
          control={control}
          render={({ field }) => (
            <div>
              {(spec as { label?: string }).label && (
                <Text as="label" size="sm" className="mb-2 block">
                  {(spec as { label?: string }).label as string}
                </Text>
              )}
              <ButtonGroup variant="radio" value={field.value} onChange={field.onChange}>
                {(
                  (spec as {
                    options?: Array<{ value: string | number; label: React.ReactNode }>;
                  }).options || []
                ).map((opt) => (
                  <ButtonGroupItem key={String(opt.value)} value={opt.value}>
                    {opt.label}
                  </ButtonGroupItem>
                ))}
              </ButtonGroup>
            </div>
          )}
        />
      </div>
    );
  }

  if (spec.kind === 'date') {
    const label = (spec as { label?: string }).label as string;
    const placeholder = (spec as { placeholder?: string }).placeholder as string;
    const min = (spec as { min?: string }).min;
    const max = (spec as { max?: string }).max;
    const id = (spec as { id?: string }).id as string | undefined;

    return (
      <div className={col}>
        <Controller
          name={spec.name as string}
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              id={id}
              label={label}
              placeholder={placeholder}
              value={field.value ?? null}
              onChange={(v) => field.onChange(v)}
              min={min}
              max={max}
              error={fieldState.error?.message}
              displayLocale="en-US"
              displayOptions={{ month: 'short', day: 'numeric', year: 'numeric' }}
              width={136} // design-spec fixed chip
            />
          )}
        />
      </div>
    );
  }

  if (spec.kind === 'currency' || spec.kind === 'percent' || spec.kind === 'text') {
    return (
      <div className={col}>
        <Controller
          name={spec.name as string}
          control={control}
          render={({ field, fieldState }) => {
            const valueStr =
              spec.kind === 'currency'
                ? field.value == null
                  ? ''
                  : formatCentsToCurrency(field.value)
                : spec.kind === 'percent'
                ? field.value == null
                  ? ''
                  : String(field.value)
                : field.value ?? '';

            return (
              <Input
                label={(spec as { label?: string }).label as string}
                placeholder={(spec as { placeholder?: string }).placeholder as string}
                value={valueStr}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const raw = e.target.value;
                  if (spec.kind === 'currency') field.onChange(parseCurrencyToCents(raw));
                  else if (spec.kind === 'percent') field.onChange(parsePercent(raw));
                  else field.onChange(raw);
                }}
                onBlur={(e) => {
                  if (spec.kind === 'currency') {
                    field.onChange(parseCurrencyToCents(e.target.value));
                  }
                }}
                error={fieldState.error?.message}
              />
            );
          }}
        />
      </div>
    );
  }

  if (spec.kind === 'fees') {
    return <FeesRepeater name={spec.name as string} />;
  }

  return null;
}

/* ----------------------------- Fees repeater ----------------------------- */

function FeesRepeater({ name }: { name: string }) {
  const { control, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="col-span-12 space-y-6">
      <Text as="label" size="sm" className="block">
        Other fees
      </Text>

      {fields.map((f, idx) => {
        const unitPath = `${name}.${idx}.unit` as const;

        return (
          <div key={f.id} className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-4">
              <Controller
                name={`${name}.${idx}.label` as const}
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    label="$ Other Fees"
                    placeholder="$ Other Fees"
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>

            <div className="col-span-6 md:col-span-2">
              <Controller
                name={unitPath}
                control={control}
                render={({ field }) => (
                  <Select
                    className="relative z-[201]"
                    label="Unit"
                    options={[
                      { value: 'usd', label: 'USD' },
                      { value: 'percent', label: '%' },
                    ]}
                    value={field.value ?? ''}
                    onChange={(v) => {
                      if (v === 'usd') setValue(`${name}.${idx}.percent` as const, undefined);
                      else setValue(`${name}.${idx}.amount_cents` as const, undefined);
                      field.onChange(v);
                    }}
                  />
                )}
              />
            </div>

            <div className="col-span-6 md:col-span-3">
              <Controller
                name={`${name}.${idx}.basis` as const}
                control={control}
                render={({ field }) => (
                  <div>
                    <Text as="label" size="sm" className="mb-2 block">
                      Split
                    </Text>
                    <ButtonGroup variant="radio" value={field.value} onChange={field.onChange}>
                      <ButtonGroupItem value="pre_split">Pre-Split</ButtonGroupItem>
                      <ButtonGroupItem value="post_split">Post-Split</ButtonGroupItem>
                    </ButtonGroup>
                  </div>
                )}
              />
            </div>

            <div className="col-span-10 md:col-span-2">
              <Controller
                name={`${name}.${idx}.unit` as const}
                control={control}
                render={({ field: unitField }) =>
                  unitField.value === 'usd' ? (
                    <Controller
                      name={`${name}.${idx}.amount_cents` as const}
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Amount"
                          placeholder="$ 0.00"
                          value={field.value == null ? '' : formatCentsToCurrency(field.value)}
                          onChange={(e) => field.onChange(parseCurrencyToCents(e.target.value))}
                        />
                      )}
                    />
                  ) : (
                    <Controller
                      name={`${name}.${idx}.percent` as const}
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Percent"
                          placeholder="%"
                          value={field.value == null ? '' : String(field.value)}
                          onChange={(e) => field.onChange(parsePercent(e.target.value))}
                        />
                      )}
                    />
                  )
                }
              />
            </div>

            <div className="col-span-2 md:col-span-1 flex justify-end">
              <Button hierarchy="tertiary-gray" onClick={() => remove(idx)} icon="trash">
                <span className="sr-only">Remove fee</span>
              </Button>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        className="text-green-700 hover:text-green-800 text-sm"
        onClick={() =>
          append({ label: '', unit: 'usd', basis: 'pre_split', amount_cents: undefined, percent: undefined })
        }
      >
        + Add Fee
      </button>
    </div>
  );
}
