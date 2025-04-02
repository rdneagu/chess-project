import { Move, Square } from 'chess.js';
import { useMemo } from 'react';
import ChessSquare from './ChessSquare';
import { EChessSquareType } from './types/EChessSquareType';
import { TReactWrapper } from '@/shared/types/react/TReactWrapper';

type ChessSquareMovesProps = {
  square: Square;
  move: Move;
  moveType?: EChessSquareType.MOVE_FROM | EChessSquareType.MOVE_TO;
  onMoveClick?: (move: Move) => void;
} & Partial<TReactWrapper>;

export default function ChessSquareMove({ square, move, moveType, onMoveClick }: ChessSquareMovesProps) {
  const type = useMemo(() => moveType ?? (move.captured ? EChessSquareType.CAPTURABLE : EChessSquareType.PATH), [moveType, move]);

  return <ChessSquare square={square} type={type} onSquareClick={() => onMoveClick?.(move)} />;
}
