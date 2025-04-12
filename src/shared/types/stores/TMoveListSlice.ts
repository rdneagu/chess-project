import { Chess } from 'chess.js';
import { TChessPgnMove } from '../chess/TChessPgnMove';
import { TChessMoveList } from '../chess/TChessMoveList';
import { TChessMove } from '../chess/TChessMove';
import { TChessMoveListId } from '../chess/TChessMoveListId';
import { TChessMoveId } from '../chess/TChessMoveId';

export type TMoveListSlice = TMoveListSliceState & TMoveListSliceActions;
export type TMoveListSliceState = {
    moveLists: Record<TChessMoveListId, TChessMoveList>;
};
export type TMoveListSliceActions = {
    getMoveList: (moveListId: TChessMoveListId) => TChessMoveList | undefined;
    generateMoveList: (chess: Chess, pgnMoves: TChessPgnMove[], fromMoveId?: TChessMoveId, comment?: string) => TChessMoveList;
    addMoveList: (moveList: TChessMoveList) => void;
    addMoveToList: (moveListId: TChessMoveListId, move: TChessMove) => void;
    addComment: (moveListId: TChessMoveListId, comment?: string) => void;
    resetMoveLists: () => void;
};
