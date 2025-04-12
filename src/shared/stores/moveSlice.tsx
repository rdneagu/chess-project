import type { Chess } from 'chess.js';
import type { TChessPgnMove } from '../types/chess/TChessPgnMove';
import type { TMoveSlice } from '../types/stores/TMoveSlice';
import { TImmerStateCreator } from '../types/stores/TImmerStateCreator';
import { TChessMove } from '../types/chess/TChessMove';
import { TChessMoveList } from '../types/chess/TChessMoveList';
import { TChessMoveListId } from '../types/chess/TChessMoveListId';
import { TChessMoveId } from '../types/chess/TChessMoveId';

let UNIQUE_MOVE_ID = 1;

export const createMoveSlice: TImmerStateCreator<TMoveSlice> = (set, get) => ({
    moves: {},
    selectedMoveId: undefined,
    getMove: (moveId?: TChessMoveId) => {
        if (!moveId) {
            return undefined;
        }
        return get().moveStore.moves[moveId];
    },
    getSelectedMove: () => get().moveStore.getMove(get().moveStore.selectedMoveId),
    getPreviousMove: (moveId?: TChessMoveId) => {
        const { getMove } = get().moveStore;
        return getMove(getMove(moveId)?.previousMoveId);
    },
    getNextMove: (moveId?: TChessMoveId) => {
        const { getMove } = get().moveStore;
        return getMove(getMove(moveId)?.nextMoveId);
    },
    generateMove: (chess: Chess, san: string, parentId: TChessMoveListId, pgnMove?: TChessPgnMove) => {
        chess.move(san);
        const [chessMove] = chess.history({ verbose: true }).slice(-1);
        const [ply] = chessMove.before.match(/\d+$/) ?? [];
        if (!ply) {
            throw new Error(`Ply not found for move ${JSON.stringify(chessMove, null, 4)}`);
        }
        const generatedMove: TChessMove = {
            moveId: UNIQUE_MOVE_ID++,
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
        };
        get().moveStore.addMove(generatedMove);
        get().moveListStore.addMoveToList(parentId, generatedMove);
        return generatedMove;
    },
    addMove: (move: TChessMove) =>
        set((state) => {
            state.moveStore.moves[move.moveId] = move;
        }),
    addComment: (moveId: TChessMoveId, comment?: string) =>
        set((state) => {
            state.moveStore.moves[moveId].comment = comment;
        }),
    resetMoves: () =>
        set((state) => {
            state.moveStore.moves = {};
        }),
    selectMove: (moveId?: TChessMoveId) => {
        const { getMove } = get().moveStore;
        const move = getMove(moveId);
        if (!move) {
            return;
        }

        const { chess, setBoard } = get();
        chess.load(move.afterFen);
        setBoard(chess.board());

        set((state) => {
            state.moveStore.selectedMoveId = moveId;
        });
    },
    setRavs: (moveId: TChessMoveId, ravs: TChessMoveList[]) =>
        set((state) => {
            state.moveStore.moves[moveId].ravs = ravs.map((rav) => rav.moveListId);
        }),
});
