import { Group, Stack } from '@mantine/core';
import { useCallback, useContext, useMemo } from 'react';
import ChessMove from './_components/ChessMove/ChessMove';
import { TChessMove } from '@/shared/types/chess/TChessMove';
import { ChessMoveLinkedList } from '@/shared/types/chess/ChessMoveLinkedList';
import { ChessContext } from '@/shared/contexts/ChessContext/ChessContext';

type ChessMovesProps = {
    moves: TChessMove[];
};

type TGroupedMove = {
    ply: number;
    groupId: number;
    left?: TChessMove | null;
    right?: TChessMove | null;
    ravs?: ChessMoveLinkedList[] | null;
};

export default function ChessMoves({ moves }: ChessMovesProps) {
    const { selectMove } = useContext(ChessContext);

    /** Groups moves into left (white) and right (black) with '...' for variations  */
    const groupedMoves = useMemo(() => {
        let groupId = 0;
        return moves.reduce((acc: TGroupedMove[], move: TChessMove) => {
            const { ply } = move;
            if (!acc[groupId]) {
                acc[groupId] = {
                    ply,
                    groupId,
                };
            }

            const groupedMove = acc[groupId];
            if (move.color === 'w') {
                groupedMove.left = move;
                // If left move has variations, add the next black move to a different group (to display <square> <...> in the UI)
                if (move.ravs) {
                    groupId++;
                }
            } else if (move.color === 'b') {
                groupedMove.right = move;
                groupId++;
            }

            if (move.ravs) {
                groupedMove.ravs = move.ravs;
            }

            return acc;
        }, []);
    }, [moves]);

    const onMoveSelect = useCallback(
        (moveId?: number) => {
            if (moveId === undefined) {
                return;
            }

            const move = moves.find((m) => m.moveId === moveId);
            if (move) {
                selectMove(move);
            }
        },
        [moves, selectMove],
    );

    return (
        <div className="chess-moves flex h-full max-h-[512px] w-full flex-col overflow-x-hidden overflow-y-auto">
            {groupedMoves.map((groupedMove, i) => (
                <Stack key={i} gap={0} className="ml-1">
                    <Group className="rounded-sm">
                        <span className="w-4 text-right">{groupedMove.ply}</span>
                        <div className="flex flex-1">
                            <ChessMove
                                id={groupedMove.left?.moveId}
                                san={groupedMove.left?.san}
                                isContinuation={!groupedMove.left}
                                onMoveSelect={(moveId) => onMoveSelect(moveId)}
                            />
                            <ChessMove
                                id={groupedMove.right?.moveId}
                                san={groupedMove.right?.san}
                                isContinuation={!groupedMove.right && groupedMove.left?.nextMove !== undefined}
                                onMoveSelect={(moveId) => onMoveSelect(moveId)}
                            />
                        </div>
                    </Group>
                    {groupedMove.ravs?.map((rav, ravIndex) => (
                        <div className="my-2 ml-2 border-l border-indigo-400 bg-indigo-400/10 py-2 pl-2" key={ravIndex}>
                            <ChessMoves moves={rav.moves} />
                        </div>
                    ))}
                </Stack>
            ))}
        </div>
    );
}
