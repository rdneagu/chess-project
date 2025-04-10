import { Chess } from 'chess.js';
import type { TChessMove } from './TChessMove';
import { TChessPgnMove } from './TChessPgnMove';

type TMoveGenerate = {
    san: string;
    comment?: string;
    moveNag?: number;
    positionNag?: number;
    timeNag?: number;
};

export class ChessMoveLinkedList {
    private static UNIQUE_MOVE_ID = 0;

    private _firstMove?: TChessMove;
    private _lastMove?: TChessMove;
    private _moves: TChessMove[] = [];
    private _ravFrom?: TChessMove;
    private _comment?: string;

    static createMoveListFromPgn(chess: Chess, pgnMoves: TChessPgnMove[]): ChessMoveLinkedList {
        const moves = new ChessMoveLinkedList();
        pgnMoves.forEach((move) => {
            const lastMove = moves.generateMove(chess, {
                san: move.san,
                comment: move.comment,
                moveNag: move.moveNag,
                positionNag: move.positionNag,
                timeNag: move.timeNag,
            });
            if (move.rav) {
                lastMove.ravs = move.rav.map((rav) => {
                    const nextList = ChessMoveLinkedList.createMoveListFromPgn(new Chess(lastMove.beforeFen), rav.moves);
                    nextList._ravFrom = lastMove.previousMove;
                    nextList._comment = rav.comment;
                    return nextList;
                });
            }
        });
        return moves;
    }

    get firstMove() {
        return this._firstMove;
    }

    get lastMove() {
        return this._lastMove;
    }

    get variationFrom() {
        return this._ravFrom;
    }

    get length() {
        return this._moves.length;
    }

    get moves() {
        return this._moves;
    }

    get comment() {
        return this._comment;
    }

    setVariationFrom(variationFrom: TChessMove) {
        this._ravFrom = variationFrom;
        return this;
    }

    generateMove(chess: Chess, moveGenerate: TMoveGenerate): TChessMove {
        chess.move(moveGenerate.san);
        const [lastMove] = chess.history({ verbose: true }).slice(-1);
        const [ply] = lastMove.before.match(/\d+$/) ?? [];
        if (!ply) {
            throw new Error(`Ply not found for move ${JSON.stringify(lastMove, null, 4)}`);
        }
        const moveId = ChessMoveLinkedList.UNIQUE_MOVE_ID++;

        const generatedMove: TChessMove = {
            moveId,
            parent: this,
            ply: +ply,
            san: moveGenerate.san,
            beforeFen: lastMove.before,
            afterFen: lastMove.after,
            comment: moveGenerate.comment,
            moveNag: moveGenerate.moveNag,
            positionNag: moveGenerate.positionNag,
            timeNag: moveGenerate.timeNag,
            color: lastMove.color,
            from: lastMove.from,
            to: lastMove.to,
            piece: lastMove.piece,
            captured: lastMove.captured,
            promotion: lastMove.promotion,
            isCapture: lastMove.isCapture(),
            isPromotion: lastMove.isPromotion(),
            isEnPassant: lastMove.isEnPassant(),
            isKingsideCastle: lastMove.isKingsideCastle(),
            isQueensideCastle: lastMove.isQueensideCastle(),
            isBigPawn: lastMove.isBigPawn(),
        };
        this.addMove(generatedMove);
        return generatedMove;
    }

    addMove(move: TChessMove) {
        if (!this._firstMove || !this._lastMove) {
            this._firstMove = move;
            this._lastMove = move;
        } else {
            move.previousMove = this.lastMove;
            this._lastMove.nextMove = move;
            this._lastMove = move;
        }
        this._moves = [...this._moves, move];
        return this;
    }

    deleteMove(move: TChessMove) {
        const moveIndex = this.moves.findIndex((m) => move === m);
        if (moveIndex === -1) {
            return this;
        }

        // Update links
        if (move.previousMove) {
            move.previousMove.nextMove = move.nextMove;
        } else {
            this._firstMove = move.nextMove;
        }

        if (move.nextMove) {
            move.nextMove.previousMove = move.previousMove;
        } else {
            this._lastMove = move.previousMove;
        }

        // Remove from array
        this._moves = this._moves.filter((_, i) => i !== moveIndex);
        return this;
    }

    updateMoves() {
        this._moves = this._moves.slice();
        return this;
    }
}
