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
 * Internal shim to silence the Zod ↔ RHF generic mismatch.
 * Keeps runtime behavior identical.
 */
function zodResolverShim<FormT extends FieldValues>(
  schema: ZodTypeAny
): Resolver<FormT, Record<string, unknown>, FormT> {
  return (_zodResolver as unknown as (s: ZodTypeAny) => Resolver<FormT, Record<string, unknown>, FormT>)(schema);
}

export function useTransactionForm<FormT extends FieldValues>(
  variant: VariantSpec<FormT>
) {
  const [stepIdx, setStepIdx] = React.useState(0);

  // ✅ use our shim, not the direct zodResolver call
  const resolver = zodResolverShim<FormT>(variant.rootSchema);

  const methods = useForm<FormT>({
    resolver,
    mode: 'onChange',
    defaultValues: variant.defaults as DefaultValues<FormT>,
  });

  const step = variant.steps[stepIdx];
  const canBack = stepIdx > 0;
  const isLast = stepIdx === variant.steps.length - 1;

  const next = async () => {
    const ok = await methods.trigger(step.fieldNames as Path<FormT>[]);
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
