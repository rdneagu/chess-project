import { useCounter, useTimeout } from '@mantine/hooks';
import { useEffect } from 'react';
import useNavigate from '@/shared/hooks/useNavigate';

type UseRedirectBackHook = {
  timeout?: number; // Amount of time in seconds before redirecting back, defaults to 10
  disabled?: boolean; // Whether the redirect is disabled or not
};

export default function useRedirectBack({ disabled, timeout }: UseRedirectBackHook = {}) {
  const { navigateBack } = useNavigate();

  const [countdown, handlers] = useCounter(timeout ?? 10, { min: 0 });
  const { start, clear } = useTimeout(() => handlers.decrement(), 1000);

  useEffect(() => {
    if (disabled) {
      handlers.set(timeout ?? 10);
      clear();
    } else if (countdown === 0 && !disabled) {
      navigateBack();
    } else {
      start();
    }
  }, [clear, countdown, disabled, handlers, navigateBack, start, timeout]);

  return { countdown };
}
