import { useCallback, useContext, useMemo } from 'react';
import clsx from 'clsx';
import { Group, Stack } from '@mantine/core';
import { ChessContext } from '@/shared/contexts/ChessContext/ChessContext';
import { TChessMove } from '@/shared/types/chess/TChessMove';

type ChessMovesProps = {
  moveList: TChessMove[];
};

type TGroupedMove = {
  left?: TChessMove | null;
  right?: TChessMove | null;
};

export default function ChessMoves({ moveList }: ChessMovesProps) {
  const { selectedMove, selectMove } = useContext(ChessContext);

  const groupedMoves = useMemo(() => {
    const moves: Record<number, TGroupedMove> = {};
    let curMove = 0;
    for (let i = 0; i < moveList.length; i++) {
      if (!moves[curMove]) {
        moves[curMove] = {};
      }

      const move = moveList[i];
      if (move.color === 'w') {
        moves[curMove].left = move;
        if (!move.nextMove) {
          moves[curMove].right = null;
        }
        if (move.rav) {
          curMove++;
        }
      } else if (move.color === 'b') {
        moves[curMove].right = move;
        curMove++;
      }
    }
    return moves;
  }, [moveList]);

  const isMoveSelected = useCallback((move?: TChessMove | null) => selectedMove === move, [selectedMove]);
  const getRavMoves = useCallback((move?: TChessMove | null) => {
    if (move?.rav) {
      return move.rav;
    }
    return [];
  }, []);
  const getMoveSan = useCallback((move?: TChessMove | null) => {
    if (move === null) {
      return '';
    }

    if (move?.san) {
      return move.san;
    }

    return '...';
  }, []);

  return (
    <div className="flex h-full max-h-[512px] w-full flex-col overflow-x-hidden overflow-y-auto">
      {Object.values(groupedMoves).map((groupedMove, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Stack key={i} gap={0} className="ml-1">
          <Group className="rounded-sm">
            <span className="w-4 text-right">{groupedMove.left?.ply ?? groupedMove.right?.ply}</span>
            <div className="flex flex-1">
              <div className="flex-1">
                <span
                  className={clsx('rounded px-1 py-px select-none', {
                    'cursor-pointer hover:bg-indigo-400/20': groupedMove.left,
                    'bg-indigo-400': isMoveSelected(groupedMove.left),
                  })}
                  onClick={() => selectMove(groupedMove.left)}>
                  {getMoveSan(groupedMove.left)}
                </span>
              </div>
              <div className="flex-1">
                <span
                  className={clsx('rounded px-1 py-px select-none', {
                    'cursor-pointer hover:bg-indigo-400/20': groupedMove.right,
                    'bg-indigo-400': isMoveSelected(groupedMove.right),
                  })}
                  onClick={() => selectMove(groupedMove.right)}>
                  {getMoveSan(groupedMove.right)}
                </span>
              </div>
            </div>
          </Group>
          {getRavMoves(groupedMove.left).length !== 0 && (
            <div className="my-2 ml-2 border-l border-indigo-400 bg-indigo-400/10 py-2 pl-2">
              {getRavMoves(groupedMove.left).map((rav) => (
                <ChessMoves moveList={rav.moves} />
              ))}
            </div>
          )}
          {getRavMoves(groupedMove.right).length !== 0 && (
            <div className="my-2 ml-2 border-l border-indigo-400 bg-indigo-400/10 py-2 pl-2">
              {getRavMoves(groupedMove.right).map((rav) => (
                <ChessMoves moveList={rav.moves} />
              ))}
            </div>
          )}
        </Stack>
      ))}
    </div>
  );
}
