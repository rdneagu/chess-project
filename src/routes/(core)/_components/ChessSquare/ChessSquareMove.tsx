import { Square } from 'chess.js';
import { useMemo } from 'react';
import ChessSquare from './ChessSquare';
import { EChessSquareType } from './types/EChessSquareType';
import { TReactWrapper } from '@/shared/types/react/TReactWrapper';

type ChessSquareMovesProps = {
  square: Square;
  moveType?: EChessSquareType.MOVE_FROM | EChessSquareType.MOVE_TO;
  isCapturing?: boolean;
  onMoveClick?: () => void;
} & Partial<TReactWrapper>;

export default function ChessSquareMove({ square, isCapturing, moveType, onMoveClick }: ChessSquareMovesProps) {
  const type = useMemo(() => moveType ?? (isCapturing ? EChessSquareType.CAPTURABLE : EChessSquareType.PATH), [moveType, isCapturing]);

  return <ChessSquare square={square} type={type} onSquareClick={() => onMoveClick?.()} />;
}
