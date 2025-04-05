import { PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING, WHITE, BLACK, Square, Chess } from 'chess.js';
import { TChessPiece } from '../types/chess/TChessPiece';
import { TChessMove, CLinkedMoveList } from '../types/chess/TChessMove';
import { TChessPgnMove } from '../types/chess/TChessPgnMove';

const pieceSymbolMap = {
  [PAWN]: 'pawn',
  [KNIGHT]: 'knight',
  [BISHOP]: 'bishop',
  [ROOK]: 'rook',
  [QUEEN]: 'queen',
  [KING]: 'king',
};

const pieceColorMap = {
  [WHITE]: 'white',
  [BLACK]: 'black',
};

let uniqueMoveId = 0;

export function getChessPieceClass(piece?: TChessPiece) {
  if (!piece) {
    return '';
  }
  return `${pieceColorMap[piece.color]} ${pieceSymbolMap[piece.type]}`;
}

export function getRankPosition(rank: string) {
  const startCode = '8'.charCodeAt(0);
  const rankPosition = startCode - rank.charCodeAt(0);
  return `${rankPosition * 12.5}%`;
}

export function getFilePosition(file: string) {
  const startCode = 'a'.charCodeAt(0);
  const filePosition = file.charCodeAt(0) - startCode;
  return `${filePosition * 12.5}%`;
}

export function getChessSquarePosition(square?: Square) {
  if (!square) {
    throw new Error('[getChessSquarePosition] Square is required');
  }

  return {
    top: getRankPosition(square[1]),
    left: getFilePosition(square[0]),
  };
}

/**
 * Generate moves from pgn moves
 * @param chess - The chess instance
 * @param pgnMoves - The pgn moves
 * @param startAtFen - The fen to start at, required for variants to load the previous move
 * @returns The generated moves
 */
export function generateHistory(chess: Chess, pgnMoves: TChessPgnMove[]): CLinkedMoveList {
  const generatedMoves = new CLinkedMoveList();
  uniqueMoveId = 0;

  pgnMoves.forEach((move) => {
    const lastMove = generateMove(chess, move.san);
    if (move.rav) {
      lastMove.rav = move.rav.map((variant) => generateHistory(new Chess(lastMove.beforeFen), variant));
    }
    generatedMoves.addMove(lastMove);
  });
  return generatedMoves;
}

export function generateMove(chess: Chess, san: string): TChessMove {
  chess.move(san);
  const [chessMove] = chess.history({ verbose: true }).slice(-1);
  const [ply = 0] = chessMove.before.match(/\d+$/) ?? [];
  const lastMove: TChessMove = {
    moveId: uniqueMoveId++,
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
}
