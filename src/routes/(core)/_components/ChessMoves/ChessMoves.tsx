import { useCallback, useContext, useMemo } from 'react';
import clsx from 'clsx';
import { ChessContext } from '@/shared/contexts/ChessContext/ChessContext';
import { TChessMove } from '@/shared/types/chess/TChessMove';

export default function ChessMoves() {
  const { moves, currentMove } = useContext(ChessContext);

  const groupedMoves = useMemo(() => {
    const gmoves = [];
    for (let i = 0; i < moves.length; i++) {
      const plyMoves: (TChessMove | undefined)[] = [];
      const move = moves[i];
      const prevMove = moves[i - 1];
      const nextMove = moves[i + 1];

      if (move?.rav) {
        plyMoves.push(move, undefined);
      } else if (prevMove?.rav) {
        plyMoves.push(undefined, move);
      } else {
        plyMoves.push(move, nextMove);
        i++;
      }
      gmoves.push(plyMoves);
    }
    return gmoves;
  }, [moves]);

  const isCurrentMove = useCallback((move?: TChessMove) => move?.ply === currentMove?.ply && move?.san === currentMove?.san, [currentMove]);

  return (
    <div className="flex max-h-96 w-96 flex-col overflow-y-auto border border-indigo-400 p-4">
      {groupedMoves.map(([move1, move2], i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className={clsx('flex gap-x-2')} key={i}>
          <span>{move1?.ply ?? move2?.ply}</span>
          <div className="flex gap-x-8">
            <span className={clsx({ 'bg-indigo-400': isCurrentMove(move1) })}>{move1?.san ?? '...'}</span>
            <span className={clsx({ 'bg-indigo-400': isCurrentMove(move2) })}>{move2?.san ?? '...'}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
