import { useEffect } from 'react';
import { useHotkeys } from '@mantine/hooks';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';
import ChessSquare from '../ChessSquare/ChessSquare';
import { EChessSquareType } from '../ChessSquare/types/EChessSquareType';
import ChessSquarePiece from '../ChessSquare/ChessSquarePiece';
import ChessSquareMove from '../ChessSquare/ChessSquareMove';
import { TReactWrapper } from '@/shared/types/react/TReactWrapper';
import useChess from '@/shared/hooks/useChess';
import IconButtonAdapter from '@/shared/components/ButtonAdapter/IconButtonAdapter';
import TablerIconAdapter from '@/shared/components/TablerIconAdapter/TablerIconAdapter';

type ChessBoardComponentProps = {
  pgn: string;
} & Partial<TReactWrapper>;

export default function ChessBoard({ pgn }: ChessBoardComponentProps) {
  const {
    pieces,
    possibleMoves,
    currentMove,
    currentTurn,
    checkedSquare,
    selectedPiece,
    loadGame,
    selectPiece,
    movePiece,
    showNextMove,
    showPreviousMove,
    showFirstMove,
    showLastMove,
  } = useChess();

  useHotkeys([
    ['ArrowUp', () => showFirstMove()],
    ['ArrowLeft', () => showPreviousMove()],
    ['ArrowRight', () => showNextMove()],
    ['ArrowDown', () => showLastMove()],
  ]);

  useEffect(() => {
    loadGame({ pgn });
  }, [pgn, loadGame]);

  return (
    <div className="m-auto flex flex-col gap-y-2">
      <div className="bg-board-purple shadow-light/15 shadow-elevation-8 relative h-128 w-128 rounded">
        {currentMove && (
          <>
            <ChessSquareMove square={currentMove.from} move={currentMove} moveType={EChessSquareType.MOVE_FROM} />
            <ChessSquareMove square={currentMove.to} move={currentMove} moveType={EChessSquareType.MOVE_TO} />
          </>
        )}
        {selectedPiece && <ChessSquare square={selectedPiece?.square} type={EChessSquareType.SELECTED} />}
        {checkedSquare && <ChessSquare square={checkedSquare} type={EChessSquareType.CHECKED} />}
        {pieces.map((piece) => (
          <ChessSquarePiece key={piece.square} square={piece.square} piece={piece} turn={currentTurn} onPieceClick={selectPiece} />
        ))}
        {possibleMoves.map((move) => (
          <ChessSquareMove key={move.to} square={move.to} move={move} onMoveClick={() => movePiece(move)} />
        ))}
      </div>
      <div className="flex justify-end gap-x-2">
        <IconButtonAdapter variant="filled" radius="sm" color="primary" size="sm" onClick={() => showFirstMove()}>
          <TablerIconAdapter icon={IconChevronsLeft} size={18} />
        </IconButtonAdapter>
        <IconButtonAdapter variant="filled" radius="sm" color="primary" size="sm" onClick={() => showPreviousMove()}>
          <TablerIconAdapter icon={IconChevronLeft} size={18} />
        </IconButtonAdapter>
        <IconButtonAdapter variant="filled" radius="sm" color="primary" size="sm" onClick={() => showNextMove()}>
          <TablerIconAdapter icon={IconChevronRight} size={18} />
        </IconButtonAdapter>
        <IconButtonAdapter variant="filled" radius="sm" color="primary" size="sm" onClick={() => showLastMove()}>
          <TablerIconAdapter icon={IconChevronsRight} size={18} />
        </IconButtonAdapter>
      </div>
    </div>
  );
}
