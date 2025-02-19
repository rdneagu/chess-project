import { Dispatch, SetStateAction } from 'react';

export type TReactState<T> = [T, Dispatch<SetStateAction<T>>];
