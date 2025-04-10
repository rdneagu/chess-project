import type { TChessPgnMove } from './TChessPgnMove';

export type TChessPgnVariation = {
    comment?: string;
    moves: TChessPgnMove[];
};
