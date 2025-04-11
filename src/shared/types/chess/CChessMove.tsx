import type { Color, Square, PieceSymbol, Chess } from 'chess.js';
import { getMoveById } from '../../util/ChessUtil';
import type { TChessPgnMove } from './TChessPgnMove';

type TChessMoveConfig = {
    parentId: number;
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
};

export class CChessMove {
    // [immerable] = true;

    static UNIQUE_MOVE_ID = 1;
    static moveMap: CChessMove[] = [];

    moveId: number;
    parentId: number;
    ravs?: number[];
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
    previousMoveId?: number;
    nextMoveId?: number;

    constructor(config: TChessMoveConfig) {
        this.moveId = CChessMove.UNIQUE_MOVE_ID++;
        this.parentId = config.parentId;
        this.ply = config.ply;
        this.san = config.san;
        this.beforeFen = config.beforeFen;
        this.afterFen = config.afterFen;
        this.moveNag = config.moveNag;
        this.positionNag = config.positionNag;
        this.timeNag = config.timeNag;
        this.comment = config.comment;
        this.color = config.color;
        this.from = config.from;
        this.to = config.to;
        this.piece = config.piece;
        this.captured = config.captured;
        this.promotion = config.promotion;
        this.isCapture = config.isCapture;
        this.isPromotion = config.isPromotion;
        this.isEnPassant = config.isEnPassant;
        this.isKingsideCastle = config.isKingsideCastle;
        this.isQueensideCastle = config.isQueensideCastle;
        this.isBigPawn = config.isBigPawn;
    }

    static generateMove(chess: Chess, san: string, parentId: number, pgnMove?: TChessPgnMove) {
        chess.move(san);
        const [chessMove] = chess.history({ verbose: true }).slice(-1);
        const [ply] = chessMove.before.match(/\d+$/) ?? [];
        if (!ply) {
            throw new Error(`Ply not found for move ${JSON.stringify(chessMove, null, 4)}`);
        }
        const generatedMove = new CChessMove({
            parentId,
            ply: +ply,
            san,
            beforeFen: chessMove.before,
            afterFen: chessMove.after,
            comment: pgnMove?.comment,
            moveNag: pgnMove?.moveNag,
            positionNag: pgnMove?.positionNag,
            timeNag: pgnMove?.timeNag,
            color: chessMove.color,
            from: chessMove.from,
            to: chessMove.to,
            piece: chessMove.piece,
            captured: chessMove.captured,
            promotion: chessMove.promotion,
            isCapture: chessMove.isCapture(),
            isPromotion: chessMove.isPromotion(),
            isEnPassant: chessMove.isEnPassant(),
            isKingsideCastle: chessMove.isKingsideCastle(),
            isQueensideCastle: chessMove.isQueensideCastle(),
            isBigPawn: chessMove.isBigPawn(),
        });
        CChessMove.moveMap = [...CChessMove.moveMap, generatedMove];
        return generatedMove;
    }

    static getMoveById(moveId: number) {
        return getMoveById(CChessMove.moveMap, moveId);
    }

    static reset() {
        CChessMove.UNIQUE_MOVE_ID = 1;
        CChessMove.moveMap = [];
    }

    getNextMove() {
        if (!this.nextMoveId) {
            return undefined;
        }
        return CChessMove.getMoveById(this.nextMoveId);
    }

    getPreviousMove() {
        if (!this.previousMoveId) {
            return undefined;
        }
        return CChessMove.getMoveById(this.previousMoveId);
    }
}
