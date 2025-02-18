import { EEnvironment } from '@/shared/types/env/EEnvironment';
import { TEnvironment } from '@/shared/types/env/TEnvironment';

export function getVars(): TEnvironment {
  const envMeta = import.meta.env;
  return {
    ENV: envMeta.VITE_ENV,
    CORE_API: envMeta.VITE_CORE_API,
  };
}

export function isProduction(): boolean {
  return getVars().ENV === EEnvironment.PRODUCTION;
}
