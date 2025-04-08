import { Chess } from 'chess.js';
import type { TChessMove } from './TChessMove';
import { TChessPgnMove } from './TChessPgnMove';

export class ChessMoveLinkedList {
    private static UNIQUE_MOVE_ID = 0;

    private _firstMove?: TChessMove;
    private _lastMove?: TChessMove;
    private _length: number;
    private _moves: TChessMove[];

    constructor(firstMove?: TChessMove, lastMove?: TChessMove, length?: number, moves?: TChessMove[]) {
        this._firstMove = firstMove;
        this._lastMove = lastMove;
        this._length = length ?? 0;
        this._moves = moves ?? [];
    }

    static createMoveListFromPgn(chess: Chess, pgnMoves: TChessPgnMove[]): ChessMoveLinkedList {
        const moves = new ChessMoveLinkedList();
        pgnMoves.forEach((move) => {
            const lastMove = moves.generateMove(chess, move.san);
            if (move.rav) {
                lastMove.ravs = move.rav.map((rav) => ChessMoveLinkedList.createMoveListFromPgn(new Chess(lastMove.beforeFen), rav));
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

    get length() {
        return this._length;
    }

    get moves() {
        return this._moves;
    }

    generateMove(chess: Chess, san: string): TChessMove {
        chess.move(san);
        const [lastMove] = chess.history({ verbose: true }).slice(-1);
        const [ply] = lastMove.before.match(/\d+$/) ?? [];
        if (!ply) {
            throw new Error(`Ply not found for move ${JSON.stringify(lastMove, null, 4)}`);
        }
        const moveId = ChessMoveLinkedList.UNIQUE_MOVE_ID++;

        const generatedMove: TChessMove = {
            parent: this,
            moveId,
            ply: +ply,
            san,
            beforeFen: lastMove.before,
            afterFen: lastMove.after,
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
        this._length++;

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
        this._length--;

        return this;
    }

    updateMoves(): void {
        this._moves = this._moves.slice();
    }

    clone() {
        return new ChessMoveLinkedList(this._firstMove, this._lastMove, this._length, this._moves.slice());
    }
}
