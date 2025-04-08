import { Color, PieceSymbol, Square } from 'chess.js';

export type TChessPiece = {
    type: PieceSymbol;
    color: Color;
    square: Square;
};
