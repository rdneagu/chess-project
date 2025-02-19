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

  if (type === 'switch') {
    if (pending) {
      return loaderComponent;
    }

    return children;
  }

  if (type === 'overlay' && pending) {
    return loaderComponent;
  }

  if (type === 'suspense') {
    return <Suspense fallback={loaderComponent}>{children}</Suspense>;
  }
}
