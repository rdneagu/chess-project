import { clsx } from 'clsx';
import { useMemo } from 'react';
import { Square, Move } from 'chess.js';
import { TChessSquarePosition } from './types/TChessSquarePosition';
import { TChessPiece } from '@/shared/types/chess/TChessPiece';
import { TReactWrapper } from '@/shared/types/react/TReactWrapper';
import { getChessPieceClass, getChessSquarePosition } from '@/shared/util/ChessUtil';

type ChessSquareComponentProps = {
  square: Square;
  move?: Move;
  piece?: TChessPiece;
  isSelected?: boolean;
  onPieceClick?: (piece: TChessPiece) => void;
} & Partial<TReactWrapper>;

export default function ChessSquare({ square, piece, move, isSelected, onPieceClick }: ChessSquareComponentProps) {
  const squarePosition: TChessSquarePosition = useMemo(() => getChessSquarePosition(square), [square]);

  const moveClass = useMemo(() => {
    if (!move) {
      return '';
    }

    if (move.captured) {
      return 'bg-square-capture';
    }

    return 'bg-square-move';
  }, [move]);

  const pieceClass = useMemo(() => {
    if (!piece) {
      return '';
    }

    return getChessPieceClass(piece);
  }, [piece]);

  const onSquareClick = () => {
    if (piece) {
      onPieceClick?.(piece);
    }
  };

  return (
    <div
      style={squarePosition}
      className={clsx('piece absolute h-[12.5%] w-[12.5%] cursor-pointer', moveClass, pieceClass, { 'bg-square-selected': isSelected })}
      onMouseDown={() => onSquareClick()}
    />
  );
}
