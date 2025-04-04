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

type MoveString = string | MoveString[];

export function getChessPieceClass(piece?: TChessPiece) {
  if (!piece) {
    return '';
  }
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

export function parsePGN(pgn: string): MoveString[] {
  const cleanedPgn = pgn
    .replace(/\[.*\]\n\n?/g, '') // Remove headers
    .replace(/[ ]{2,}/g, '') // Remove extra spaces
    .replace(/\d+\.+ /g, '') // Remove move numbers
    .replace(/\n/g, ' '); // Replace newlines with spaces

  const result: MoveString[] = [];
  let currentMove = '';
  let depth = 0;
  let isComment = false;

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < cleanedPgn.length; i++) {
    const char = cleanedPgn[i];

    if (char === '{') {
      isComment = true;
    } else if (char === '}') {
      isComment = false;
    } else if (!isComment) {
      if (char === '(') {
        if (depth === 0 && currentMove.trim()) {
          result.push(currentMove.trim());
          currentMove = '';
        }
        depth += 1;
        currentMove += char;
      } else if (char === ')') {
        depth -= 1;
        currentMove += char;
        if (depth === 0) {
          const variant = currentMove.slice(1, -1);
          result.push(parsePGN(variant));
          currentMove = '';
        }
      } else if (char === ' ' && depth === 0) {
        if (currentMove.trim()) {
          result.push(currentMove.trim());
          currentMove = '';
        }
      } else {
        currentMove += char;
      }
    }
  }

  if (currentMove.trim()) {
    result.push(currentMove.trim());
  }

  console.log(result);

  return result;
}
