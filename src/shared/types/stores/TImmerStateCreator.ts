import { StateCreator } from 'zustand';
import { TGameStore } from './TGameStore';

export type TImmerStateCreator<T> = StateCreator<TGameStore, [['zustand/immer', never], ['zustand/devtools', never]], [], T>;
