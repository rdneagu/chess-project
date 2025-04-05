import { TChessPgnHeaders } from './TChessPgnHeaders';
import { TChessPgnMove } from './TChessPgnMove';

export type TChessPgn = {
  headers: TChessPgnHeaders;
  moves: TChessPgnMove[];
  moveText: string;
};
