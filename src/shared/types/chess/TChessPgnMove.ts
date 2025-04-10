import type { TChessPgnVariation } from './TChessPgnVariation';

export type TChessPgnMove = {
    ply: number;
    san: string;
    rav?: TChessPgnVariation[];
    comment?: string;
    moveNag?: number;
    positionNag?: number;
    timeNag?: number;
    turn: number;
};
