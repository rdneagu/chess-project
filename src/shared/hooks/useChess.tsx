import { Chess, Move } from 'chess.js';
import { useMemo, useState } from 'react';
import { TChessBoard } from '../types/chess/TChessBoard';
import { TChessPiece } from '../types/chess/TChessPiece';

type TChessLoadConfig = {
  pgn?: string;
  fen?: string;
};

export default function useChess() {
  const [pgn, setPgn] = useState<string>('');
  const [chess] = useState<Chess>(new Chess());
  const [board, setBoard] = useState<TChessBoard>([]);
  const [moves, setMoves] = useState<Move[]>([]);
  const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<TChessPiece | null>(null);
  const [currentMoveId, setCurrentMoveId] = useState<number>(0);

  const pieces = useMemo(() => board.flat().filter((piece) => piece !== null), [board]);

  const loadGame = (config: TChessLoadConfig) => {
    if (config.pgn) {
      chess.loadPgn(config.pgn);
    } else if (config.fen) {
      chess.load(config.fen);
    } else {
      throw new Error('[useChess][chessLoad] No config provided');
    }

    setPgn(chess.pgn());
    setBoard(chess.board());
    setMoves(chess.history({ verbose: true }));
    setCurrentMoveId(chess.history().length - 1);
  };

  const movePiece = (move: Move) => {
    chess.move(move);
    setBoard(chess.board());
    setMoves(chess.history({ verbose: true }));
    setCurrentMoveId(chess.history().length - 1);
  };

  const selectPiece = (piece: TChessPiece) => {
    const nextSelectedPiece = selectedPiece === null || selectedPiece.square !== piece.square ? piece : null;
    setSelectedPiece(nextSelectedPiece);

    const nextPossibleMoves = nextSelectedPiece ? chess.moves({ square: nextSelectedPiece.square, verbose: true }) : [];
    setPossibleMoves(nextPossibleMoves);
  };

  const previousMove = () => {
    console.log(moves);
    const { before } = moves[currentMoveId] ?? {};
    if (before) {
      chess.load(before);
      setCurrentMoveId(currentMoveId - 1);
    } else {
      setCurrentMoveId(chess.history().length - 1);
      chess.load(moves[chess.history().length - 1].after);
    }
    setBoard(chess.board());
  };

  const nextMove = () => {
    console.log(moves);
    const { after } = moves[currentMoveId] ?? {};
    if (after) {
      chess.load(after);
      setCurrentMoveId(currentMoveId + 1);
    } else {
      chess.load(moves[0].before);
      setCurrentMoveId(0);
    }
    setBoard(chess.board());
  };

  return {
    board,
    pieces,
    moves,
    possibleMoves,
    selectedPiece,
    loadGame,
    movePiece,
    selectPiece,
    previousMove,
    nextMove,
  };
}
