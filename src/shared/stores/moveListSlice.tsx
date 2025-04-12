import { Chess } from 'chess.js';
import { TChessPgnMove } from '../types/chess/TChessPgnMove';
import { TMoveListSlice } from '../types/stores/TMoveListSlice';
import { TImmerStateCreator } from '../types/stores/TImmerStateCreator';
import { TChessMoveList } from '../types/chess/TChessMoveList';
import { TChessMove } from '../types/chess/TChessMove';
import { TChessMoveId } from '../types/chess/TChessMoveId';

let UNIQUE_MOVE_LIST_ID = 1;

export const createMoveListSlice: TImmerStateCreator<TMoveListSlice> = (set, get) => ({
    moveLists: {},
    getMoveList: (moveListId: number) => get().moveListStore.moveLists[moveListId],
    generateMoveList: (chess: Chess, pgnMoves: TChessPgnMove[], fromMoveId?: TChessMoveId, comment?: string) => {
        const moveList = {
            moveListId: UNIQUE_MOVE_LIST_ID++,
            moves: [],
            fromMoveId,
            comment,
        };
        get().moveListStore.addMoveList(moveList);
        pgnMoves.forEach((pgnMove) => {
            const move = get().moveStore.generateMove(chess, pgnMove.san, moveList.moveListId, pgnMove);
            if (pgnMove.rav) {
                get().moveStore.setRavs(
                    move.moveId,
                    pgnMove.rav.map((rav) => get().moveListStore.generateMoveList(new Chess(move.beforeFen), rav.moves, move.moveId, rav.comment)),
                );
            }
        });
        return moveList;
    },
    addMoveList: (moveList: TChessMoveList) =>
        set((state) => {
            state.moveListStore.moveLists[moveList.moveListId] = moveList;
        }),
    addMoveToList: (moveListId: number, move: TChessMove) =>
        set((state) => {
            const moveList = state.moveListStore.moveLists[moveListId];
            moveList.moves.push(move.moveId);
            if (!moveList.firstMoveId || !moveList.lastMoveId) {
                moveList.firstMoveId = move.moveId;
                moveList.lastMoveId = move.moveId;
            } else {
                state.moveStore.moves[move.moveId].previousMoveId = moveList.lastMoveId;
                state.moveStore.moves[moveList.lastMoveId].nextMoveId = move.moveId;
                moveList.lastMoveId = move.moveId;
            }
        }),
    addComment: (moveListId: number, comment?: string) =>
        set((state) => {
            state.moveListStore.moveLists[moveListId].comment = comment;
        }),
    resetMoveLists: () =>
        set((state) => {
            state.moveListStore.moveLists = {};
        }),
});
