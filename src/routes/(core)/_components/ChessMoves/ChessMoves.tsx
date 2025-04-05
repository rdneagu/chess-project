import { useCallback, useContext, useMemo } from 'react';
import clsx from 'clsx';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { ChessContext } from '@/shared/contexts/ChessContext/ChessContext';
import { TChessMove } from '@/shared/types/chess/TChessMove';
import TablerIconAdapter from '@/shared/components/TablerIconAdapter/TablerIconAdapter';

export default function ChessMoves() {
  const { moveList, selectedMove, selectMove } = useContext(ChessContext);

  const groupedMoves = useMemo(() => {
    const moves = [];
    for (let i = 0; i < moveList.length; i++) {
      const plyMoves: (TChessMove | undefined)[] = [];
      const move = moveList.moves[i];

      if (move?.rav) {
        plyMoves.push(move, undefined);
      } else if (move.previousMove?.rav) {
        plyMoves.push(undefined, move);
      } else {
        plyMoves.push(move, move.nextMove);
        i++;
      }
      moves.push(plyMoves);
    }
    return moves;
  }, [moveList]);

  const isMoveSelected = useCallback((move?: TChessMove) => selectedMove === move, [selectedMove]);

  return (
    <div className="flex max-h-96 w-96 flex-col overflow-y-auto border border-indigo-400 p-4">
      {groupedMoves.map(([move1, move2], i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className={clsx('flex gap-x-2')} key={i}>
          <span>{move1?.ply ?? move2?.ply}</span>
          <div className="flex flex-1 gap-x-8">
            <span className={clsx('flex-1 cursor-pointer', { 'bg-indigo-400': isMoveSelected(move1) })} onClick={() => selectMove(move1)}>
              {move1?.san ?? <TablerIconAdapter icon={IconArrowUp} size={18} />}
            </span>
            <span className={clsx('flex-1 cursor-pointer', { 'bg-indigo-400': isMoveSelected(move2) })} onClick={() => selectMove(move2)}>
              {move2?.san ?? <TablerIconAdapter icon={IconArrowDown} size={18} />}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
