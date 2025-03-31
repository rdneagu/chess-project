import { clsx } from 'clsx';
import { TReactWrapper } from '@/shared/types/react/TReactWrapper';
import { useMemo } from 'react';

export enum EChessPiece {
  ROOK = 'rook',
  KNIGHT = 'knight',
  BISHOP = 'bishop',
  QUEEN = 'queen',
  KING = 'king',
  PAWN = 'pawn',
}

export enum EChessPieceColor {
  WHITE = 'white',
  BLACK = 'black',
}

const positionX = {
  a: '0',
  b: '12.5%',
  c: '25.0%',
  d: '37.5%',
  e: '50.0%',
  f: '62.5%',
  g: '75.0%',
  h: '87.5%',
};

const positionY = {
  '1': '0',
  '2': '12.5%',
  '3': '25.0%',
  '4': '37.5%',
  '5': '50.0%',
  '6': '62.5%',
  '7': '75.0%',
  '8': '87.5%',
};

type ChessPieceComponentProps = {
  piece: EChessPiece;
  color: EChessPieceColor;
  position: string;
} & Partial<TReactWrapper>;

export default function ChessPiece({ piece, color, position }: ChessPieceComponentProps) {
  const positionTransformation: { top: string; left: string } = useMemo(() => {
    const [x, y] = position.split('');
    const mappedPosition = [positionX[x as keyof typeof positionX], positionY[y as keyof typeof positionY]];
    return { top: mappedPosition[1], left: mappedPosition[0] };
  }, [position]);

  return <div style={positionTransformation} className={clsx('piece absolute h-[12.5%] w-[12.5%]', color, piece, position)} />;
}
