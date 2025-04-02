import { Chess, KING, Move } from 'chess.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TChessBoard } from '../types/chess/TChessBoard';
import { TChessPiece } from '../types/chess/TChessPiece';
import { clampNumberBetweenWrap } from '../util/NumberUtil';

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
  const [currentMoveId, setCurrentMoveId] = useState<number>(0);
  const [selectedPiece, setSelectedPiece] = useState<TChessPiece | null>(null);

  const pieces = useMemo(() => board.flat().filter((piece) => piece !== null), [board]);

  const loadGame = useCallback(
    (config: TChessLoadConfig) => {
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
    },
    [chess],
  );

  const movePiece = useCallback(
    (move: Move) => {
      chess.move(move);
      setBoard(chess.board());
      setMoves(chess.history({ verbose: true }));
      setCurrentMoveId(chess.history().length - 1);
    },
    [chess],
  );

  const selectPiece = useCallback(
    (piece: TChessPiece) => {
      const nextSelectedPiece = selectedPiece === null || selectedPiece.square !== piece.square ? piece : null;
      setSelectedPiece(nextSelectedPiece);

      const nextPossibleMoves = nextSelectedPiece ? chess.moves({ square: nextSelectedPiece.square, verbose: true }) : [];
      setPossibleMoves(nextPossibleMoves);
    },
    [chess, selectedPiece],
  );

  const loadMoveById = useCallback(
    (moveId: number) => {
      const { after } = moves[moveId] ?? {};
      if (after) {
        if (moveId === moves.length - 1) {
          chess.loadPgn(pgn);
        } else {
          chess.load(after);
        }
        setBoard(chess.board());
      }
      setCurrentMoveId(moveId);
    },
    [chess, moves, pgn],
  );

  const showPreviousMove = useCallback(() => {
    loadMoveById(clampNumberBetweenWrap(currentMoveId - 1, 0, moves.length - 1));
  }, [currentMoveId, loadMoveById, moves]);

  const showNextMove = useCallback(() => {
    loadMoveById(clampNumberBetweenWrap(currentMoveId + 1, 0, moves.length - 1));
  }, [currentMoveId, loadMoveById, moves]);

  const showFirstMove = useCallback(() => {
    loadMoveById(0);
  }, [loadMoveById]);

  const showLastMove = useCallback(() => {
    loadMoveById(moves.length - 1);
  }, [loadMoveById, moves]);

  const currentMove = useMemo(() => moves[currentMoveId] ?? null, [moves, currentMoveId]);
  const currentTurn = useMemo(() => chess.turn(), [chess, currentMove]); // eslint-disable-line react-hooks/exhaustive-deps
  const isCheck = useMemo(() => chess.inCheck(), [chess, currentMove]); // eslint-disable-line react-hooks/exhaustive-deps

  const checkedSquare = useMemo(() => {
    if (!isCheck) {
      return undefined;
    }
    const foundKing = pieces.find((piece) => piece.type === KING && piece.color === currentTurn);
    return foundKing?.square;
  }, [isCheck, currentTurn, pieces]);

  useEffect(() => {
    setSelectedPiece(null);
    setPossibleMoves([]);
  }, [currentMove]);

  return {
    board,
    pieces,
    moves,
    possibleMoves,
    selectedPiece,
    currentMove,
    currentTurn,
    checkedSquare,
    loadGame,
    movePiece,
    selectPiece,
    showFirstMove,
    showPreviousMove,
    showNextMove,
    showLastMove,
  };
}
