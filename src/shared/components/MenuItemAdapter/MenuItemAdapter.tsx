import { Menu, PolymorphicComponentProps, type MenuItemProps } from '@mantine/core';
import { mergeRefs } from '@mantine/hooks';
import clsx from 'clsx';
import { useRef } from 'react';
import useRipple from '@/shared/hooks/useRipple';

export default function MenuItemAdapter(props: PolymorphicComponentProps<'button', MenuItemProps>) {
    const { className, children, disabled, ref } = props;
    const buttonRef = useRef<HTMLButtonElement>(null);
    useRipple(buttonRef, disabled);

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Menu.Item {...props} className={clsx('relative overflow-hidden', className)} ref={mergeRefs(ref, buttonRef)}>
            {children}
        </Menu.Item>
    );
}
