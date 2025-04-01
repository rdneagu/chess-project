import { useEffect } from 'react';
import { useHotkeys } from '@mantine/hooks';
import ChessSquare from '../ChessSquare/ChessSquare';
import { TReactWrapper } from '@/shared/types/react/TReactWrapper';
import useChess from '@/shared/hooks/useChess';

type ChessBoardComponentProps = {
  pgn: string;
} & Partial<TReactWrapper>;

export default function ChessBoard({ pgn }: ChessBoardComponentProps) {
  const { pieces, possibleMoves, selectedPiece, loadGame, selectPiece, nextMove, previousMove } = useChess();

  useHotkeys([
    ['ArrowLeft', () => previousMove()],
    ['ArrowRight', () => nextMove()],
  ]);

  useEffect(() => {
    loadGame({ pgn });
  }, [pgn]);

  return (
    <div className="bg-board-purple shadow-light/15 shadow-elevation-8 relative m-auto h-128 w-128 rounded">
      {possibleMoves.map((move) => (
        <ChessSquare key={move.to} square={move.to} move={move} />
      ))}
      {selectedPiece && <ChessSquare square={selectedPiece?.square} isSelected />}
      {pieces.map((piece) => (
        <ChessSquare key={piece.square} square={piece.square} piece={piece} onPieceClick={selectPiece} />
      ))}
    </div>
  );
}
