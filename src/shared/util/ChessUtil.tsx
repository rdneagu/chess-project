import { PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING, WHITE, BLACK, Square } from 'chess.js';
import { TChessPiece } from '../types/chess/TChessPiece';
import type { CChessMoveList } from '../types/chess/CChessMoveList';
import type { CChessMove } from '../types/chess/CChessMove';

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

export function getMoveListById(moveListMap: CChessMoveList[], moveListId: number) {
    const moveList = moveListMap.find((findMoveList) => findMoveList.moveListId === moveListId);
    if (!moveList) {
        throw new Error(`[ChessUtil][findMoveListById] Move list not found for move list id ${moveListId}`);
    }

    return moveList;
}

export function getMoveById(moveMap: CChessMove[], moveId: number) {
    const move = moveMap.find((findMove) => findMove.moveId === moveId);
    if (!move) {
        throw new Error(`[ChessUtil][findMoveById] Move not found for move id ${moveId}`);
    }

    return move;
}
