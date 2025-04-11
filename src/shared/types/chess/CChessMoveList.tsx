import { Chess } from 'chess.js';
import { getMoveListById } from '../../util/ChessUtil';
import { TChessPgnMove } from './TChessPgnMove';
import { CChessMove } from './CChessMove';

export class CChessMoveList {
    // [immerable] = true;

    static UNIQUE_MOVE_LIST_ID = 1;
    static moveListMap: CChessMoveList[] = [];

    moveListId: number;
    fromMoveId?: number;
    comment?: string;
    moves: number[];

    constructor() {
        this.moveListId = CChessMoveList.UNIQUE_MOVE_LIST_ID++;
        this.moves = [];
    }

    static generateMoveListMapFromPgn(chess: Chess, pgnMoves: TChessPgnMove[]) {
        const moveList = new CChessMoveList();
        CChessMoveList.moveListMap = [...CChessMoveList.moveListMap, moveList];

        pgnMoves.forEach((pgnMove) => {
            const move = moveList.generateMove(chess, pgnMove.san, pgnMove);

            if (pgnMove.rav) {
                move.ravs = pgnMove.rav.map((rav) => {
                    const ravMoveList = CChessMoveList.generateMoveListMapFromPgn(new Chess(move.beforeFen), rav.moves);
                    ravMoveList.fromMoveId = move.moveId;
                    ravMoveList.comment = rav.comment;
                    return ravMoveList.moveListId;
                });
            }
        });
        return moveList;
    }

    static getMoveListById(moveListId: number) {
        return getMoveListById(CChessMoveList.moveListMap, moveListId);
    }

    static reset() {
        CChessMoveList.UNIQUE_MOVE_LIST_ID = 1;
        CChessMoveList.moveListMap = [];
    }

    get firstMoveId() {
        return this.moves[0];
    }

    get lastMoveId() {
        return this.moves[this.moves.length - 1];
    }

    generateMove(chess: Chess, san: string, pgnMove?: TChessPgnMove) {
        const move = CChessMove.generateMove(chess, san, this.moveListId, pgnMove);
        this.addMove(move);
        return move;
    }

    addMove(move: CChessMove) {
        if (this.firstMoveId && this.lastMoveId) {
            const lastMove = CChessMove.getMoveById(this.lastMoveId);
            move.previousMoveId = this.lastMoveId;
            lastMove.nextMoveId = move.moveId;
        }
        this.moves.push(move.moveId);
        return this;
    }

    // addMove(move: CChessMove) {
    //     return produce(this, (draft) => {
    //         if (!draft.firstMove || !draft.lastMove) {
    //             draft.firstMove = move;
    //             draft.lastMove = move;
    //         } else {
    //             move.setPreviousMove(draft.lastMove);
    //             draft.lastMove.setNextMove(move);
    //             draft.lastMove = move;
    //         }
    //         draft.moves.push(move);
    //         return draft;
    //     });
    // }

    // deleteMove(move: CChessMove) {
    //     return produce(this, (draft) => {
    //         const moveIndex = draft.moves.findIndex((m) => move === m);
    //         if (moveIndex === -1) {
    //             return draft;
    //         }

    //         // Update links
    //         if (move.previousMove) {
    //             move.previousMove.setNextMove(move.nextMove);
    //         } else {
    //             draft.firstMove = move.nextMove;
    //         }

    //         if (move.nextMove) {
    //             move.nextMove.setPreviousMove(move.previousMove);
    //         } else {
    //             draft.lastMove = move.previousMove;
    //         }

    //         // Remove from array
    //         draft.moves = draft.moves.splice(moveIndex, 1);
    //         return draft;
    //     });
    // }

    // setVariationFrom(variationFrom?: CChessMove) {
    //     return produce(this, (draft) => {
    //         draft.ravFrom = variationFrom;
    //         return draft;
    //     });
    // }

    // setVariationComment(comment?: string) {
    //     return produce(this, (draft) => {
    //         draft.comment = comment;
    //         return draft;
    //     });
    // }
}
