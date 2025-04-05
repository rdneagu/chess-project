import { Chess, KING, Move } from 'chess.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TChessBoard } from '../types/chess/TChessBoard';
import { TChessPiece } from '../types/chess/TChessPiece';
import { clampNumberWithWrap } from '../util/NumberUtil';
import { TChessPgn } from '../types/chess/TChessPgn';
import { TChessMove } from '../types/chess/TChessMove';
import { generateHistory, generateMove } from '../util/ChessUtil';

export default function useChess() {
  const [chess] = useState<Chess>(new Chess());
  const [board, setBoard] = useState<TChessBoard>([]);
  const [moves, setMoves] = useState<TChessMove[]>([]);
  const [history, setHistory] = useState<TChessMove[]>([]);
  const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);
  const [currentMoveId, setCurrentMoveId] = useState<number>(0);
  const [selectedPiece, setSelectedPiece] = useState<TChessPiece | null>(null);

  const pieces = useMemo(() => board.flat().filter((piece) => piece !== null), [board]);

  const loadGame = useCallback(
    (pgnConfig: TChessPgn) => {
      chess.reset();

      const generatedHistory = generateHistory(chess, pgnConfig.moves);
      console.log(generatedHistory);
      setBoard(chess.board());
      setHistory(generatedHistory);
      setMoves(generatedHistory);
      setCurrentMoveId(generatedHistory.length - 1);
    },
    [chess],
  );

  const movePiece = useCallback(
    (move: Move) => {
      const newMove = generateMove(chess, move.san);
      setBoard(chess.board());
      setMoves((prevMoves) => [...prevMoves, newMove]);
      setCurrentMoveId((prevMoveId) => prevMoveId + 1);
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

  const deselectPiece = useCallback(() => {
    setSelectedPiece(null);
    setPossibleMoves([]);
  }, []);

  const loadMoveById = useCallback(
    (moveId: number) => {
      const { afterFen } = history[moveId] ?? {};
      if (afterFen) {
        chess.load(afterFen);
        setBoard(chess.board());
      }
      setCurrentMoveId(moveId);
    },
    [chess, history],
  );

  const showPreviousMove = useCallback(() => {
    loadMoveById(clampNumberWithWrap(currentMoveId - 1, 0, history.length - 1));
  }, [currentMoveId, loadMoveById, history]);

  const showNextMove = useCallback(() => {
    loadMoveById(clampNumberWithWrap(currentMoveId + 1, 0, history.length - 1));
  }, [currentMoveId, loadMoveById, history]);

  const showFirstMove = useCallback(() => {
    loadMoveById(0);
  }, [loadMoveById]);

  const showLastMove = useCallback(() => {
    loadMoveById(history.length - 1);
  }, [loadMoveById, history]);

  const currentMove = useMemo(() => history[currentMoveId] ?? null, [history, currentMoveId]);
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
    deselectPiece();
  }, [currentMove, deselectPiece]);

  return {
    board,
    pieces,
    moves: history,
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
