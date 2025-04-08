import { Group, Stack } from '@mantine/core';
import { useMemo } from 'react';
import ChessMove from './_components/ChessMove/ChessMove';
import { TChessMove } from '@/shared/types/chess/TChessMove';
import { ChessMoveLinkedList } from '@/shared/types/chess/ChessMoveLinkedList';

type ChessMovesProps = {
    moves: TChessMove[];
};

type TGroupedMove = {
    ply: number;
    groupId: number;
    left?: TChessMove;
    right?: TChessMove;
    ravs?: ChessMoveLinkedList[] | null;
};

export default function ChessMoves({ moves }: ChessMovesProps) {
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

    return (
        <div className="chess-moves w-full overflow-x-hidden overflow-y-auto">
            {groupedMoves.map((groupedMove, i) => (
                <Stack key={i} gap={0} className="ml-1">
                    <Group className="rounded-sm">
                        <span className="w-4 text-right">{groupedMove.ply}</span>
                        <div className="flex flex-1">
                            <ChessMove move={groupedMove.left} isContinuation={!groupedMove.left} />
                            <ChessMove move={groupedMove.right} isContinuation={!groupedMove.right && groupedMove.left?.nextMove !== undefined} />
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
