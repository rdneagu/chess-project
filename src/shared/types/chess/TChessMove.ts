import { Color, PieceSymbol, Square } from 'chess.js';

export type TChessMove = {
  rav?: TChessMove[][];
  ply: number;
  san: string;
  beforeFen: string;
  afterFen: string;
  color: Color;
  from: Square;
  to: Square;
  piece: PieceSymbol;
  captured?: PieceSymbol;
  promotion?: PieceSymbol;
  isCapture: boolean;
  isPromotion: boolean;
  isEnPassant: boolean;
  isKingsideCastle: boolean;
  isQueensideCastle: boolean;
  isBigPawn: boolean;
};
