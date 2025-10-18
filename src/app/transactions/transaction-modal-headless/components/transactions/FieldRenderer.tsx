// src/components/transactions/FieldRenderer.tsx
'use client';
import { Label, RadioGroup, RadioButton, Select, ButtonGroup, Input, Button, ButtonGroupItem } from '@/components';
import React from 'react';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';

function parseCurrencyToCents(input: string): number | undefined {
  if (!input) return undefined;
  const raw = input.replace(/[^\d.,]/g, '').replace(',', '.');
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
  const num = Number(input.replace(/[^\d.]/g, ''));
  if (Number.isNaN(num)) return undefined;
  return num;
}

export function FieldRenderer({ spec }: { spec: Record<string, unknown> }) {
  const { control, setValue, watch } = useFormContext();

  const col = spec.width === '1/2' ? 'col-span-12 md:col-span-6'
    : spec.width === '1/3' ? 'col-span-12 md:col-span-4'
    : spec.width === '2/3' ? 'col-span-12 md:col-span-8'
    : 'col-span-12';

  if (spec.kind === 'radio-cards') {
    const value = watch(spec.name as string);
    return (
      <div className={col}>
        <Label className="sr-only">{spec.label as string ?? ''}</Label>
        <RadioGroup value={value} onChange={(v)=>setValue(spec.name as string, v)} variant="card" size="lg">
          {(spec.options as Array<{value: string, label: string}> || [])?.map((o) => (
            <RadioButton key={o.value} value={o.value}>{o.label}</RadioButton>
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
            <Select label={spec.label as string} placeholder={spec.placeholder as string || 'Select'} options={spec.options as Array<{value: string, label: string}> || []} value={field.value} onChange={field.onChange} error={fieldState.error?.message} />
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
              {(spec.label as string) && <Label className="mb-2 block">{spec.label as string}</Label>}
  
              <ButtonGroup
                variant="radio"          // or "segmented" if you want the segmented-control look
                value={field.value}
                onChange={field.onChange}
              >
                {(spec.options as Array<{value: string | number, label: React.ReactNode}> || []).map((opt) => (
                  <ButtonGroupItem key={opt.value} value={opt.value}>
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
    return (
      <div className={col}>
        <Controller
          name={spec.name as string}
          control={control}
          render={({ field, fieldState }) => (
            <Input type="date" label={spec.label as string} placeholder={spec.placeholder as string} {...field} error={fieldState.error?.message} />
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
          render={({ field, fieldState }) => (
            <Input
              label={spec.label as string}
              placeholder={spec.placeholder as string}
              value={
                spec.kind === 'currency' ? formatCentsToCurrency(field.value) :
                spec.kind === 'percent' ? (field.value ?? '') : field.value
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (spec.kind === 'currency') field.onChange(parseCurrencyToCents(e.target.value));
                else if (spec.kind === 'percent') field.onChange(parsePercent(e.target.value));
                else field.onChange(e);
              }}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>
    );
  }

  if (spec.kind === 'fees') {
    return <FeesRepeater name={spec.name as string} />;
  }

  return null;
}

// ---- Fees repeater (USD/% switch + Pre/Post Split) ----
function FeesRepeater({ name }:{ name:string }) {
  const { control, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="col-span-12 space-y-4">
      <Label className="block">Other fees</Label>
      {fields.map((f, idx) => {
        const unitPath = `${name}.${idx}.unit` as const;
        const unit = watch(unitPath);
        return (
          <div key={f.id} className="grid grid-cols-12 gap-3 items-end">
            <div className="col-span-12 md:col-span-4">
              <Controller
                name={`${name}.${idx}.label` as const}
                control={control}
                render={({ field, fieldState }) => (
                  <Input label="$ Other Fees" placeholder="$ Other Fees" {...field} error={fieldState.error?.message} />
                )}
              />
            </div>

            <div className="col-span-6 md:col-span-2">
              <Controller
                name={unitPath}
                control={control}
                render={({ field }) => (
                  <Select
                    label="Unit"
                    options={[{value:'usd',label:'USD'},{value:'percent',label:'%'}]}
                    value={field.value}
                    onChange={(v)=>{
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
                    <Label className="mb-2 block">Split</Label>
                    <ButtonGroup
                      variant="radio"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <ButtonGroupItem value="pre_split">Pre-Split</ButtonGroupItem>
                      <ButtonGroupItem value="post_split">Post-Split</ButtonGroupItem>
                    </ButtonGroup>
                  </div>
                )}
              />
            </div>

            <div className="col-span-10 md:col-span-2">
              {unit === 'usd' ? (
                <Controller
                  name={`${name}.${idx}.amount_cents` as const}
                  control={control}
                  render={({ field }) => (
                    <Input label="Amount" placeholder="$ 0.00" value={formatCentsToCurrency(field.value)} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>field.onChange(parseCurrencyToCents(e.target.value))} />
                  )}
                />
              ) : (
                <Controller
                  name={`${name}.${idx}.percent` as const}
                  control={control}
                  render={({ field }) => (
                    <Input label="Percent" placeholder="%" value={field.value ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>field.onChange(parsePercent(e.target.value))} />
                  )}
                />
              )}
            </div>

            <div className="col-span-2 md:col-span-1 flex justify-end">
              <Button hierarchy="tertiary-gray" onClick={()=>remove(idx)} icon="trash">
                <span className="sr-only">Remove fee</span>
              </Button>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        className="text-green-700 hover:text-green-800 text-sm"
        onClick={()=>append({ label:'', unit:'usd', basis:'pre_split', amount_cents:undefined, percent:undefined })}
      >
        + Add Fee
      </button>
    </div>
  );
}