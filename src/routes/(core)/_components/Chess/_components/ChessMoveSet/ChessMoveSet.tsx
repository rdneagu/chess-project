import { Group, Stack } from '@mantine/core';
import { useMemo } from 'react';
import { TChessMoveId } from '../../../../../../shared/types/chess/TChessMoveId';
import useGameStoreV2 from '../../../../../../shared/stores/gameStoreV2';
import ChessMove from './_components/ChessMove/ChessMove';
import ChessMoveComment from './_components/ChessMoveComment/ChessMoveComment';
import { TGroupedMove } from './_types/TGroupedMove';
import ChessMoveRavs from './_components/ChessMoveRavs/ChessMoveRavs'; // eslint-disable-line import/no-cycle
import useMoveRefs from './_hooks/useMoveRefs';

type ChessMovesProps = {
    moveListId: number;
};

export default function ChessMoveSet({ moveListId }: ChessMovesProps) {
    const { addToMoveRefs, getMoveRef } = useMoveRefs();

    const moveList = useGameStoreV2((state) => state.moveLists[moveListId]);
    const moves = useGameStoreV2((state) => state.moves);

    const groupedMoves = useMemo(() => {
        if (!moveList?.moves) {
            return undefined;
        }

        let groupId = 0;
        return moveList.moves.reduce((acc: TGroupedMove[], moveId: TChessMoveId) => {
            const move = moves[moveId];
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
    }, [moveList, moves]);

    return (
        <div className="chess-moves w-full overflow-x-hidden overflow-y-auto">
            {groupedMoves?.map((groupedMove) => (
                <Stack key={groupedMove.groupId} gap={0}>
                    <Group className="ml-2.5 rounded-sm" gap="xs">
                        <span className="text-right font-bold text-slate-400">{groupedMove.ply}.</span>
                        <div className="flex flex-1">
                            <ChessMove moveId={groupedMove.left?.moveId} isContinuation={!groupedMove.left} ref={addToMoveRefs(groupedMove.left)} />
                            <ChessMove
                                moveId={groupedMove.right?.moveId}
                                isContinuation={!groupedMove.right && groupedMove.left?.nextMoveId !== undefined}
                                ref={addToMoveRefs(groupedMove.right)}
                            />
                        </div>
                    </Group>
                    {groupedMove.comment && <ChessMoveComment attachedMoveRef={getMoveRef(groupedMove)}>{groupedMove.comment}</ChessMoveComment>}
                    {groupedMove.ravs?.map((ravId) => <ChessMoveRavs ravId={ravId} key={ravId} />)}
                </Stack>
            ))}
        </div>
    );
}
