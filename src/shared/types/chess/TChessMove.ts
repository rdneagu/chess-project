import { Move } from 'chess.js';

export type TChessMove = {
  move: Move;
  variants: TChessMove[][];
};
