import { Chess, KING, Move } from 'chess.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TChessBoard } from '../types/chess/TChessBoard';
import { TChessPiece } from '../types/chess/TChessPiece';
import { TChessPgn } from '../types/chess/TChessPgn';
import { TChessPgnMove } from '../types/chess/TChessPgnMove';
import { CLinkedMoveList, TChessMove } from '../types/chess/TChessMove';

export default function useChess() {
  const [chess] = useState<Chess>(new Chess());
  const [board, setBoard] = useState<TChessBoard>([]);
  const [moveList, setMoveList] = useState<CLinkedMoveList>(new CLinkedMoveList());
  const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<TChessPiece | null>(null);
  const [selectedMove, setSelectedMove] = useState<TChessMove | null>(null);

  const pieces = useMemo(() => board.flat().filter((piece) => piece !== null), [board]);

  const generateMove = useCallback((chessInstance: Chess, san: string): TChessMove => {
    chessInstance.move(san);
    const [chessMove] = chessInstance.history({ verbose: true }).slice(-1);
    const [ply = 0] = chessMove.before.match(/\d+$/) ?? [];
    const lastMove: TChessMove = {
      ply: +ply,
      san: chessMove.san,
      beforeFen: chessMove.before,
      afterFen: chessMove.after,
      color: chessMove.color,
      from: chessMove.from,
      to: chessMove.to,
      piece: chessMove.piece,
      captured: chessMove.captured,
      promotion: chessMove.promotion,
      isCapture: chessMove.isCapture(),
      isPromotion: chessMove.isPromotion(),
      isEnPassant: chessMove.isEnPassant(),
      isKingsideCastle: chessMove.isKingsideCastle(),
      isQueensideCastle: chessMove.isQueensideCastle(),
      isBigPawn: chessMove.isBigPawn(),
    };
    return lastMove;
  }, []);

  const generateHistory = useCallback(
    (chessInstance: Chess, pgnMoves: TChessPgnMove[]): CLinkedMoveList => {
      const generatedMoves = new CLinkedMoveList();
      pgnMoves.forEach((move) => {
        const lastMove = generateMove(chessInstance, move.san);
        if (move.rav) {
          lastMove.rav = move.rav.map((rav) => generateHistory(new Chess(lastMove.beforeFen), rav));
        }
        generatedMoves.addMove(lastMove);
      });
      return generatedMoves;
    },
    [generateMove],
  );

  const selectMove = useCallback(
    (move?: TChessMove | null) => {
      if (move) {
        chess.load(move.afterFen);
        setBoard(chess.board());
        setSelectedMove(move);
      }
    },
    [chess],
  );

  const loadGame = useCallback(
    (pgnConfig: TChessPgn) => {
      chess.reset();

      const generatedHistory = generateHistory(chess, pgnConfig.moves);
      setBoard(chess.board());
      setMoveList(generatedHistory);
      selectMove(generatedHistory.lastMove);
      console.log(generatedHistory);
    },
    [chess, generateHistory, selectMove],
  );

  const movePiece = useCallback(
    (move: Move) => {
      const newMove = generateMove(chess, move.san);
      setBoard(chess.board());
      setMoveList((prevMoves) => prevMoves.addMove(newMove));
      selectMove(newMove);
    },
    [chess, selectMove, generateMove],
  );

  const showPreviousMove = useCallback(() => {
    const move = selectedMove?.previousMove;
    selectMove(move);
  }, [selectedMove, selectMove]);

  const showNextMove = useCallback(() => {
    const move = selectedMove?.nextMove;
    selectMove(move);
  }, [selectedMove, selectMove]);

  const showFirstMove = useCallback(() => {
    selectMove(moveList.firstMove);
  }, [moveList, selectMove]);

  const showLastMove = useCallback(() => {
    selectMove(moveList.lastMove);
  }, [moveList, selectMove]);

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

  const currentTurn = useMemo(() => chess.turn(), [chess, selectedMove]); // eslint-disable-line react-hooks/exhaustive-deps
  const isCheck = useMemo(() => chess.inCheck(), [chess, selectedMove]); // eslint-disable-line react-hooks/exhaustive-deps

  const checkedSquare = useMemo(() => {
    if (!isCheck) {
      return undefined;
    }
    const foundKing = pieces.find((piece) => piece.type === KING && piece.color === currentTurn);
    return foundKing?.square;
  }, [isCheck, currentTurn, pieces]);

  useEffect(() => {
    deselectPiece();
  }, [selectedMove, deselectPiece]);

  return {
    board,
    pieces,
    moveList,
    possibleMoves,
    selectedPiece,
    selectedMove,
    currentTurn,
    checkedSquare,
    loadGame,
    movePiece,
    selectPiece,
    selectMove,
    showFirstMove,
    showPreviousMove,
    showNextMove,
    showLastMove,
  };
}
