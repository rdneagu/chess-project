import type { ChessMoveLinkedList } from '../../../../../../../shared/types/chess/ChessMoveLinkedList';
import type { TChessMove } from '../../../../../../../shared/types/chess/TChessMove';

export type TGroupedMove = {
    ply: number;
    groupId: number;
    left?: TChessMove;
    right?: TChessMove;
    ravs?: ChessMoveLinkedList[] | null;
    comment?: string;
};
