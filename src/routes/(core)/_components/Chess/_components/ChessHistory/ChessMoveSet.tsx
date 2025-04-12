import { Group, Stack } from '@mantine/core';
import { useMemo } from 'react';
import useGameStore from '../../../../../../shared/stores/gameStore';
import { TChessMoveId } from '../../../../../../shared/types/chess/TChessMoveId';
import ChessMove from './_components/ChessMove/ChessMove';
import useMoveRefs from './_hooks/useMoveRefs';
import ChessMoveRavs from './_components/ChessMoveRavs/ChessMoveRavs';
import { TGroupedMove } from './_types/TGroupedMove';
import ChessMoveComment from './_components/ChessMoveComment/ChessMoveComment';

type ChessMovesProps = {
    moveListId: number;
};

export default function ChessMoveSet({ moveListId }: ChessMovesProps) {
    const { addToMoveRefs, getMoveRef } = useMoveRefs();
    const getMove = useGameStore((state) => state.moveStore.getMove);
    const moves = useGameStore((state) => state.moveListStore.moveLists[moveListId]?.moves ?? []);

    const groupedMoves = useMemo(() => {
        let groupId = 0;
        return moves.reduce((acc: TGroupedMove[], moveId: TChessMoveId) => {
            const move = getMove(moveId);
            if (!move) {
                return acc;
            }
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
    }, [moves, getMove]);

    return (
        <div className="chess-moves w-full overflow-x-hidden overflow-y-auto">
            {groupedMoves.map((groupedMove, i) => (
                <Stack key={groupedMove.groupId} gap={0}>
                    <Group className="ml-2.5 rounded-sm" gap="xs">
                        <span className="text-right font-bold text-slate-400">{groupedMove.ply}.</span>
                        <div className="flex flex-1">
                            <ChessMove
                                moveId={groupedMove.left?.moveId}
                                isContinuation={!groupedMove.left}
                                ref={addToMoveRefs(i, groupedMove.left)}
                            />
                            <ChessMove
                                moveId={groupedMove.right?.moveId}
                                isContinuation={!groupedMove.right && groupedMove.left?.nextMoveId !== undefined}
                                ref={addToMoveRefs(i, groupedMove.right)}
                            />
                        </div>
                    </Group>
                    {(groupedMove.right ?? groupedMove.left)?.comment && (
                        <ChessMoveComment
                            moveId={groupedMove.right?.moveId ?? groupedMove.left?.moveId}
                            attachedMoveRef={getMoveRef(i, groupedMove)}
                        />
                    )}
                    {groupedMove.ravs?.map((ravId) => <ChessMoveRavs ravId={ravId} key={ravId} />)}
                </Stack>
            ))}
        </div>
    );
}
