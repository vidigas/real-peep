'use client';

import React from 'react';
import {
  useForm,
  FormProvider,
  type FieldValues,
  type DefaultValues,
  type Path,
  type Resolver,
  type UseFormReturn,
} from 'react-hook-form';
import { zodResolver as _zodResolver } from '@hookform/resolvers/zod';
import type { ZodTypeAny } from 'zod';
import type { VariantSpec } from './schema';

/**
 * Zod ↔ RHF shim
 */
function zodResolverShim(
  schema: ZodTypeAny
): Resolver<FieldValues, Record<string, unknown>, FieldValues> {
  return (_zodResolver as unknown as (s: ZodTypeAny) => Resolver<FieldValues, Record<string, unknown>, FieldValues>)(schema);
}

/**
 * Variant-agnostic controller: accepts any variant, runs Zod at runtime,
 * and manages step-scoped validation.
 */
export function useTransactionForm(variant: VariantSpec<Record<string, unknown>>) {
  const [stepIdx, setStepIdx] = React.useState(0);

  const resolver = zodResolverShim(variant.rootSchema as ZodTypeAny);

  const methods = useForm<FieldValues>({
    resolver,
    mode: 'onChange',
    defaultValues: variant.defaults as DefaultValues<FieldValues>,
  });

  const step = variant.steps[stepIdx];
  const canBack = stepIdx > 0;
  const isLast = stepIdx === variant.steps.length - 1;

  const next = async () => {
    const ok = await methods.trigger(step.fieldNames as Path<FieldValues>[]);
    if (!ok) return;
    if (!isLast) setStepIdx((i) => i + 1);
  };

  const back = () => {
    if (canBack) setStepIdx((i) => i - 1);
  };

  const submitAll = (onValid: (payload: Record<string, unknown>) => void) =>
    methods.handleSubmit((values) => onValid(variant.toPayload(values)));

  return {
    methods,
    stepIdx,
    setStepIdx,
    step,
    steps: variant.steps,
    next,
    back,
    isLast,
    submitAll,
  };
}

export function TransactionFormProvider({
  methods,
  children,
}: {
  methods: UseFormReturn<FieldValues>;
  children: React.ReactNode;
}) {
  return <FormProvider {...methods}>{children}</FormProvider>;
}
