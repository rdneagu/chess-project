import { Chess } from 'chess.js';
import { TChessPgnMove } from '../chess/TChessPgnMove';
import { TChessMove } from '../chess/TChessMove';
import { TChessMoveList } from '../chess/TChessMoveList';
import { TChessMoveListId } from '../chess/TChessMoveListId';
import { TChessMoveId } from '../chess/TChessMoveId';

export type TMoveSlice = TMoveSliceState & TMoveSliceActions;
export type TMoveSliceState = {
    moves: Record<TChessMoveId, TChessMove>;
    selectedMoveId: TChessMoveId | undefined;
};
export type TMoveSliceActions = {
    getMove: (moveId?: TChessMoveId) => TChessMove | undefined;
    getSelectedMove: () => TChessMove | undefined;
    getPreviousMove: (moveId?: TChessMoveId) => TChessMove | undefined;
    getNextMove: (moveId?: TChessMoveId) => TChessMove | undefined;
    generateMove: (chess: Chess, san: string, parentId: TChessMoveListId, pgnMove?: TChessPgnMove) => TChessMove;
    addMove: (move: TChessMove) => void;
    addComment: (moveId: TChessMoveId, comment?: string) => void;
    resetMoves: () => void;
    selectMove: (moveId?: TChessMoveId) => void;
    setRavs: (moveId: TChessMoveId, ravs: TChessMoveList[]) => void;
};
