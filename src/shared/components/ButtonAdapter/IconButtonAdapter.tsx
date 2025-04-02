import { ActionIcon, ActionIconProps, PolymorphicComponentProps } from '@mantine/core';
import { mergeRefs } from '@mantine/hooks';
import { clsx } from 'clsx';
import { useRef } from 'react';
import useRipple from '@/shared/hooks/useRipple';

export default function IconButtonAdapter(props: PolymorphicComponentProps<'button', ActionIconProps>) {
  const { className, children, disabled, ref: forwardedRef } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);
  useRipple(buttonRef, disabled);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ActionIcon color="primary" {...props} className={clsx('relative overflow-hidden', className)} ref={mergeRefs(forwardedRef, buttonRef)}>
      {children}
    </ActionIcon>
  );
}
