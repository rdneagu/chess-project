import { atom } from 'jotai';
import { Chess, Move } from 'chess.js';
import { atomWithImmer } from 'jotai-immer';
import { TChessBoard } from '../types/chess/TChessBoard';
import type { CChessMoveList } from '../types/chess/CChessMoveList';
import { TChessPiece } from '../types/chess/TChessPiece';
import type { CChessMove } from '../types/chess/CChessMove';

export const chessAtom = atom(new Chess());
export const boardAtom = atom<TChessBoard>([]);
export const possibleMovesAtom = atom<Move[]>([]);
export const selectedPieceAtom = atom<TChessPiece | null>(null);
export const selectedMoveIdAtom = atom<number>();
export const lastViewedVariationAtom = atom<CChessMoveList | null>(null);

export const moveListMapAtom = atomWithImmer<CChessMoveList[]>([]);
export const moveMapAtom = atomWithImmer<CChessMove[]>([]);
