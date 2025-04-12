import type { TChessMoveId } from './TChessMoveId';
import type { TChessMoveListId } from './TChessMoveListId';

export type TChessMoveList = {
    moveListId: TChessMoveListId;
    fromMoveId?: TChessMoveId;
    comment?: string;
    moves: TChessMoveId[];
    firstMoveId?: TChessMoveId;
    lastMoveId?: TChessMoveId;
};
