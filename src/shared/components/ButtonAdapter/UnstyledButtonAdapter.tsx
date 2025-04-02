import { PolymorphicComponentProps, UnstyledButton, UnstyledButtonProps } from '@mantine/core';
import { mergeRefs } from '@mantine/hooks';
import { clsx } from 'clsx';
import { useRef } from 'react';
import useRipple from '@/shared/hooks/useRipple';

export default function UnstyledButtonAdapter(props: PolymorphicComponentProps<'button', UnstyledButtonProps>) {
  const { className, children, disabled, ref: forwardedRef } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);
  useRipple(buttonRef, disabled);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <UnstyledButton {...props} className={clsx('relative overflow-hidden', className)} ref={mergeRefs(forwardedRef, buttonRef)}>
      {children}
    </UnstyledButton>
  );
}
