import { Color, PieceSymbol, Square } from 'chess.js';
import { TChessMoveId } from './TChessMoveId';
import { TChessMoveListId } from './TChessMoveListId';

export type TChessMove = {
    moveId: TChessMoveId;
    parentId: TChessMoveListId;
    ravs?: TChessMoveListId[];
    ply: number;
    san: string;
    beforeFen: string;
    afterFen: string;
    moveNag?: number;
    positionNag?: number;
    timeNag?: number;
    comment?: string;
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
    previousMoveId?: TChessMoveId;
    nextMoveId?: TChessMoveId;
};
