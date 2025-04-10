import { Group, Stack } from '@mantine/core';
import { useMemo } from 'react';
import ChessMove from './_components/ChessMove/ChessMove';
import ChessMoveComment from './_components/ChessMoveComment/ChessMoveComment';
import useMoveRefs from './_hooks/useMoveRefs';
import type { TGroupedMove } from './_types/TGroupedMove';
import { TChessMove } from '@/shared/types/chess/TChessMove';

type ChessMovesProps = {
    moves: TChessMove[];
};

export default function ChessMoveSet({ moves }: ChessMovesProps) {
    const { addToMoveRefs, getMoveRef } = useMoveRefs();

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
                // If left move has comment or variations, add the next black move to a different group (to display <...> in the UI)
                if (move.ravs || move.comment) {
                    groupId++;
                }
            } else if (move.color === 'b') {
                groupedMove.right = move;
                groupId++;
            }

            groupedMove.comment = move.comment;
            groupedMove.ravs = move.ravs;

            return acc;
        }, []);
    }, [moves]);

    return (
        <div className="chess-moves w-full overflow-x-hidden overflow-y-auto">
            {groupedMoves.map((groupedMove, i) => (
                <Stack key={i} gap={0}>
                    <Group className="ml-2.5 rounded-sm" gap="xs">
                        <span className="text-right font-bold text-slate-400">{groupedMove.ply}.</span>
                        <div className="flex flex-1">
                            <ChessMove move={groupedMove.left} isContinuation={!groupedMove.left} ref={addToMoveRefs(i, groupedMove.left)} />
                            <ChessMove
                                move={groupedMove.right}
                                isContinuation={!groupedMove.right && groupedMove.left?.nextMove !== undefined}
                                ref={addToMoveRefs(i, groupedMove.right)}
                            />
                        </div>
                    </Group>
                    {groupedMove.comment && <ChessMoveComment attachedMoveRef={getMoveRef(i, groupedMove)}>{groupedMove.comment}</ChessMoveComment>}
                    {groupedMove.ravs?.map((rav, ravIndex) => (
                        <div className="my-2 ml-4 border-l border-slate-400 bg-slate-700" key={ravIndex}>
                            {rav.comment && <ChessMoveComment>{rav.comment}</ChessMoveComment>}
                            <ChessMoveSet moves={rav.moves} />
                        </div>
                    ))}
                </Stack>
            ))}
        </div>
    );
}
