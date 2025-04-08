import { Color, PieceSymbol, Square } from 'chess.js';
import { ChessMoveLinkedList } from './ChessMoveLinkedList';

export type TChessMove = {
    parent: ChessMoveLinkedList;
    moveId: number;
    ravs?: ChessMoveLinkedList[];
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
    previousMove?: TChessMove;
    nextMove?: TChessMove;
};
