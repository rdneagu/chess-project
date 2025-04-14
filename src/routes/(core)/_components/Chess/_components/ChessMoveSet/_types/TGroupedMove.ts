import { TChessMove } from '../../../../../../../shared/types/chess/TChessMove';
import { TChessMoveListId } from '../../../../../../../shared/types/chess/TChessMoveListId';

export type TGroupedMove = {
    ply: number;
    groupId: number;
    left?: TChessMove;
    right?: TChessMove;
    ravs?: TChessMoveListId[];
    comment?: string;
    commentRef?: HTMLElement;
};
