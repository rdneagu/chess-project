import { PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING, WHITE, BLACK, Square } from 'chess.js';
import { TChessPiece } from '../types/chess/TChessPiece';

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

export function getChessPieceClass(piece: TChessPiece) {
  return `${pieceColorMap[piece.color]} ${pieceSymbolMap[piece.type]}`;
}

export function getRankPosition(rank: string) {
  const startCode = '1'.charCodeAt(0);
  const rankPosition = rank.charCodeAt(0) - startCode;
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
