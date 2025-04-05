export type TChessPgnMove = {
  ply: number;
  san: string;
  rav?: TChessPgnMove[][];
  beforeComment?: string;
  afterComment?: string;
  moveNag?: number;
  positionNag?: number;
  timeNag?: number;
  turn: number;
};
