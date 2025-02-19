import { CSSProperties, ReactNode } from 'react';

export type TReactWrapper = {
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
};
