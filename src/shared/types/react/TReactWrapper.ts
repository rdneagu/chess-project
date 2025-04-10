import { CSSProperties, ReactNode, type Ref } from 'react';

export type TReactWrapper = {
    style?: CSSProperties;
    className?: string;
    ref?: Ref<any>;
    children: ReactNode;
};
