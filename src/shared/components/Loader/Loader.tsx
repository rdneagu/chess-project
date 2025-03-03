import { clsx } from 'clsx';
import { Suspense, useMemo } from 'react';
import Spinner from '@/shared/components/Spinner/Spinner';
import { TReactWrapper } from '@/shared/types/react/TReactWrapper';

type LoaderComponent = {
  pending?: boolean;
  type: 'switch' | 'overlay' | 'suspense';
} & Partial<TReactWrapper>;

export default function Loader({ pending, type, className, children }: LoaderComponent) {
  const overlayClass = 'bg-secondary/10 absolute top-0 right-0 bottom-0 left-0';

  const loaderComponent = useMemo(
    () => (
      <div className={clsx('flex items-center justify-center', { [overlayClass]: type === 'overlay' }, className)}>
        <Spinner size="large" />
      </div>
    ),
    [className, type],
  );

  switch (type) {
    case 'switch':
      if (pending) {
        return loaderComponent;
      }
      break;
    case 'overlay':
      if (pending) {
        return loaderComponent;
      }
      break;
    case 'suspense':
      return <Suspense fallback={loaderComponent}>{children}</Suspense>;
    default:
      throw new Error(`[Loader] Type '${type}' is not valid`);
  }

  return children;
}
