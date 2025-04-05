import { useContext } from 'react';
import { useHotkeys } from '@mantine/hooks';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';
import ChessSquare from '../ChessSquare/ChessSquare';
import { EChessSquareType } from '../ChessSquare/types/EChessSquareType';
import ChessSquarePiece from '../ChessSquare/ChessSquarePiece';
import ChessSquareMove from '../ChessSquare/ChessSquareMove';
import ChessBoardRanks from './_components/ChessBoardRanks/ChessBoardRanks';
import ChessBoardFiles from './_components/ChessBoardFiles/ChessBoardFiles';
import IconButtonAdapter from '@/shared/components/ButtonAdapter/IconButtonAdapter';
import TablerIconAdapter from '@/shared/components/TablerIconAdapter/TablerIconAdapter';
import { ChessContext } from '@/shared/contexts/ChessContext/ChessContext';

export default function ChessBoard() {
  const {
    pieces,
    possibleMoves,
    selectedMove,
    currentTurn,
    checkedSquare,
    selectedPiece,
    selectPiece,
    movePiece,
    showNextMove,
    showPreviousMove,
    showFirstMove,
    showLastMove,
  } = useContext(ChessContext);

  useHotkeys([
    ['ArrowUp', () => showFirstMove()],
    ['ArrowLeft', () => showPreviousMove()],
    ['ArrowRight', () => showNextMove()],
    ['ArrowDown', () => showLastMove()],
  ]);

  return (
    <div className="m-auto flex flex-col gap-y-2">
      <div className="bg-board-purple shadow-light/15 shadow-elevation-8 relative h-128 w-128 rounded">
        <ChessBoardRanks />
        <ChessBoardFiles />
        {selectedMove && (
          <>
            <ChessSquareMove square={selectedMove.from} isCapturing={selectedMove.isCapture} moveType={EChessSquareType.MOVE_FROM} />
            <ChessSquareMove square={selectedMove.to} isCapturing={selectedMove.isCapture} moveType={EChessSquareType.MOVE_TO} />
          </>
        )}
        {selectedPiece && <ChessSquare square={selectedPiece?.square} type={EChessSquareType.SELECTED} />}
        {checkedSquare && <ChessSquare square={checkedSquare} type={EChessSquareType.CHECKED} />}
        {pieces.map((piece) => (
          <ChessSquarePiece key={piece.square} square={piece.square} piece={piece} turn={currentTurn} onPieceClick={() => selectPiece(piece)} />
        ))}
        {possibleMoves.map((move) => (
          <ChessSquareMove key={move.to} square={move.to} isCapturing={move.isCapture()} onMoveClick={() => movePiece(move)} />
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
