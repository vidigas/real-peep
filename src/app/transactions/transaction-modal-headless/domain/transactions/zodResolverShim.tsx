import type { FieldValues, Resolver } from 'react-hook-form';
import { zodResolver as _zodResolver } from '@hookform/resolvers/zod';
import type { ZodTypeAny } from 'zod';

/** Force-align generics so RHF gets Resolver<FormT, any, FormT>. */
export function zodResolverShim<FormT extends FieldValues>(
  schema: ZodTypeAny
): Resolver<FormT, any, FormT> {
  return (_zodResolver as unknown as (s: ZodTypeAny) => Resolver<FormT, any, FormT>)(schema);
}
