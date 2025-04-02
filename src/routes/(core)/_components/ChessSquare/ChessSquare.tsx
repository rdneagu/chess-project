import { clsx } from 'clsx';
import { useMemo } from 'react';
import { Square } from 'chess.js';
import { TChessSquarePosition } from './types/TChessSquarePosition';
import { EChessSquareType } from './types/EChessSquareType';
import { TReactWrapper } from '@/shared/types/react/TReactWrapper';
import { getChessSquarePosition } from '@/shared/util/ChessUtil';

type ChessSquareComponentProps = {
  square: Square;
  type?: EChessSquareType;
  onSquareClick?: (square: Square) => void;
} & Partial<TReactWrapper>;

export default function ChessSquare({ square, type, onSquareClick, className }: ChessSquareComponentProps) {
  const squarePosition: TChessSquarePosition = useMemo(() => getChessSquarePosition(square), [square]);

  const typeClass = useMemo(() => {
    switch (type) {
      case EChessSquareType.SELECTED:
        return 'bg-square-selected';
      case EChessSquareType.CHECKED:
        return 'bg-square-checked';
      case EChessSquareType.MOVE_FROM:
        return 'bg-square-move-from';
      case EChessSquareType.MOVE_TO:
        return 'bg-square-move-to';
      case EChessSquareType.CAPTURABLE:
        return 'bg-square-capturable';
      case EChessSquareType.PATH:
        return 'bg-square-move-path';
      case undefined:
      default:
        return '';
    }
  }, [type]);

  return (
    <div
      style={squarePosition}
      className={clsx('absolute h-[12.5%] w-[12.5%]', typeClass, className, { 'cursor-pointer': onSquareClick })}
      onMouseDown={() => onSquareClick?.(square)}
    />
  );
}
