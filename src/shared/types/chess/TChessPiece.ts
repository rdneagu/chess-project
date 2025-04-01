import { TChessPieceColor } from './TChessPieceColor';
import { TChessPieceSymbol } from './TChessPieceSymbol';
import { TChessSquare } from './TChessSquare';

export type TChessPiece = {
  type: TChessPieceSymbol;
  color: TChessPieceColor;
  square: TChessSquare;
};
