import { CSSProperties, ReactNode, RefObject } from 'react';

export type TReactWrapper = {
    style?: CSSProperties;
    className?: string;
    ref?: RefObject<never>;
    children: ReactNode;
};
