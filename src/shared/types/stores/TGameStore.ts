import { Chess, Color, Move, Square } from 'chess.js';
import { TChessBoard } from '../chess/TChessBoard';
import { TChessPiece } from '../chess/TChessPiece';
import { TMoveListSlice } from './TMoveListSlice';
import { TMoveSlice } from './TMoveSlice';

export type TGameStore = {
    moveListStore: TMoveListSlice;
    moveStore: TMoveSlice;
} & TGameStoreState &
    TGameStoreActions;

export type TGameStoreState = {
    chess: Chess;
    board?: TChessBoard;
    selectedPiece?: TChessPiece;
    possibleMoves: Move[];
};

export type TGameStoreActions = {
    setBoard: (board: TChessBoard) => void;
    loadGame: (pgn: string) => void;
    resetGame: () => void;
    selectMove: (moveId?: number) => void;
    getBoardPieces: () => TChessPiece[] | undefined;
    showFirstMove: () => void;
    showPreviousMove: () => void;
    showNextMove: () => void;
    showLastMove: () => void;
    leaveVariation: () => void;
    returnToVariation: () => void;
    movePiece: (move: Move) => void;
    selectPiece: (piece: TChessPiece) => void;
    deselectPiece: () => void;
    currentTurn: () => Color;
    isCheck: () => boolean;
    checkedSquare: () => Square | undefined;
};
