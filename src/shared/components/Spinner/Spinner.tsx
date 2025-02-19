import { clsx } from 'clsx';
import { useMemo } from 'react';
import { TReactWrapper } from '@/shared/types/react/TReactWrapper';

export type TSpinnerSize = 'large' | 'medium' | 'small' | 'tiny';

type SpinnerComponent = {
  size?: TSpinnerSize;
} & Partial<TReactWrapper>;

export default function Spinner({ size = 'large', className }: SpinnerComponent) {
  const sizeClass = useMemo(() => {
    switch (size) {
      case 'tiny':
        return 'h-4 w-4';
      case 'small':
        return 'h-8 w-8';
      case 'medium':
        return 'h-12 w-12';
      case 'large':
        return 'h-20 w-20';
      default:
        throw new Error(`[Spinner] Size '${size}' is not valid`);
    }
  }, [size]);

  return (
    <div
      className={clsx(
        sizeClass,
        'animate-spinner border-t-primary-600 inline-block rounded-full border-t-[3px] border-r-[3px] border-r-transparent',
        className,
      )}
    />
  );
}
