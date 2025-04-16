import { PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING, WHITE, BLACK, Square } from 'chess.js';
import { TChessPiece } from '../types/chess/TChessPiece';

const PIECE_SYMBOL_MAP = {
    [PAWN]: 'pawn',
    [KNIGHT]: 'knight',
    [BISHOP]: 'bishop',
    [ROOK]: 'rook',
    [QUEEN]: 'queen',
    [KING]: 'king',
};

const PIECE_COLOR_MAP = {
    [WHITE]: 'white',
    [BLACK]: 'black',
};

export const BOARD_FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const BOARD_RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

export function getChessPieceClass(piece?: TChessPiece) {
    if (!piece) {
        return '';
    }
    return `${PIECE_COLOR_MAP[piece.color]} ${PIECE_SYMBOL_MAP[piece.type]}`;
}

export function getRankPosition(rank: string) {
    const startCode = BOARD_RANKS[0].charCodeAt(0);
    const rankPosition = startCode - rank.charCodeAt(0);
    return `${rankPosition * 12.5}%`;
}

export function getFilePosition(file: string) {
    const startCode = BOARD_FILES[0].charCodeAt(0);
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
