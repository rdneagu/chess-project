import { Chess, KING, type Color, type Move, type Square } from 'chess.js';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import type { TChessBoard } from '../types/chess/TChessBoard';
import type { TChessMove } from '../types/chess/TChessMove';
import type { TChessMoveList } from '../types/chess/TChessMoveList';
import type { TChessPiece } from '../types/chess/TChessPiece';
import type { TChessMoveId } from '../types/chess/TChessMoveId';
import type { TChessPgnMove } from '../types/chess/TChessPgnMove';
import type { TChessMoveListId } from '../types/chess/TChessMoveListId';
import { parsePgn } from '../util/PgnUtil';

let UNIQUE_MOVE_LIST_ID = 1;
let UNIQUE_MOVE_ID = 1;

export const useGameStoreV2 = create<TGameStoreV2, [['zustand/devtools', never]]>(
    devtools((set, get) => ({
        chess: new Chess(),

        moveLists: {},
        moves: {},

        firstMoveListId: undefined,
        board: undefined,
        selectedMoveId: undefined,
        scrolledMoveId: undefined,
        selectedPiece: undefined,
        possibleMoves: [],

        currentTurn: () => get().chess.turn(),

        selectedMove: () => {
            const moveId = get().selectedMoveId;
            if (!moveId) {
                return undefined;
            }
            return get().moves[moveId];
        },

        boardPieces: () => {
            const { board } = get();
            return board?.flat().filter((piece) => piece !== null) ?? [];
        },

        checkedSquare: () => {
            const isCheck = get().chess.inCheck();
            const boardPieces = get().boardPieces();
            if (isCheck) {
                const foundKing = boardPieces.find((piece) => piece.type === KING && piece.color === get().currentTurn());
                return foundKing?.square;
            }
            return undefined;
        },

        reset: () => {
            get().chess.reset();
            set(() => ({ moveLists: {}, moves: {}, firstMoveListId: undefined, scrolledMoveId: undefined }));
            get().updateChessBoard();
        },

        load: (pgn: string) => {
            const { moves } = parsePgn(pgn);
            get().reset();
            get().generateMoveList(get().chess, moves);
            set((state) => ({ firstMoveListId: Object.values(state.moveLists)[0].moveListId }));
            get().updateChessBoard();
            get().selectMove(get().getFirstMoveList().lastMoveId);
        },

        updateChessBoard: () => {
            set(() => ({ board: get().chess.board() }));
        },

        getFirstMoveList: () => {
            const { moveLists } = get();
            const firstMoveList = Object.values(moveLists)[0];
            if (!firstMoveList) {
                throw new Error('[useGameStoreV2][getFirstMoveList] No move list found');
            }
            return firstMoveList;
        },

        getMoveParentList: (moveId: TChessMoveId): TChessMoveList | undefined => {
            const move = get().moves[moveId];
            if (!move) {
                return undefined;
            }
            return get().moveLists[move.parentId];
        },

        generateMoveList: (chess: Chess, pgnMoves: TChessPgnMove[], fromMoveId?: TChessMoveId, comment?: string): TChessMoveList => {
            const moveList = get().addMoveList(fromMoveId, comment);
            pgnMoves.forEach((pgnMove) => {
                const move = get().generateMove(chess, pgnMove.san, moveList.moveListId, pgnMove);
                move.ravs = pgnMove.rav?.map(
                    (rav) => get().generateMoveList(new Chess(move.beforeFen), rav.moves, move.moveId, rav.comment).moveListId,
                );
            });
            return moveList;
        },

        generateMove: (chess: Chess, san: string, parentId: TChessMoveListId, pgnMove?: TChessPgnMove): TChessMove => {
            chess.move(san);
            const [chessMove] = chess.history({ verbose: true }).slice(-1);
            const [ply] = chessMove.before.match(/\d+$/) ?? [];
            if (!ply) {
                throw new Error(`Ply not found for move ${JSON.stringify(chessMove, null, 4)}`);
            }
            const generatedMove: TChessMove = {
                moveId: UNIQUE_MOVE_ID++,
                parentId,
                ply: +ply,
                san,
                beforeFen: chessMove.before,
                afterFen: chessMove.after,
                comment: pgnMove?.comment,
                moveNag: pgnMove?.moveNag,
                positionNag: pgnMove?.positionNag,
                timeNag: pgnMove?.timeNag,
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
            get().addMoveToList(generatedMove, parentId);
            return generatedMove;
        },

        addMoveList: (fromMoveId?: TChessMoveId, comment?: string): TChessMoveList => {
            const moveList: TChessMoveList = {
                moveListId: UNIQUE_MOVE_LIST_ID++,
                moves: [],
                fromMoveId,
                comment,
            };
            set((state) => ({ moveLists: { ...state.moveLists, [moveList.moveListId]: moveList } }));
            return moveList;
        },

        addMoveToList: (move: TChessMove, moveListId: TChessMoveListId): void => {
            set((state) => {
                const moveList = state.moveLists[moveListId];
                moveList.moves.push(move.moveId);
                if (!moveList.firstMoveId || !moveList.lastMoveId) {
                    moveList.firstMoveId = move.moveId;
                    moveList.lastMoveId = move.moveId;
                } else {
                    const previousMove = get().moves[moveList.lastMoveId];
                    move.previousMoveId = previousMove.moveId;
                    previousMove.nextMoveId = move.moveId;
                    moveList.lastMoveId = move.moveId;
                }
                return { moves: { ...state.moves, [move.moveId]: move }, moveLists: { ...state.moveLists, [moveListId]: moveList } };
            });
        },

        selectMove: (moveId?: TChessMoveId): void => {
            set(() => ({ selectedMoveId: moveId, scrolledMoveId: moveId }));
            if (!moveId) {
                return;
            }
            const move = get().moves[moveId];
            get().chess.load(move.afterFen);
            get().updateChessBoard();
        },

        showNextMove: (): void => {
            const selectedMove = get().selectedMove();
            if (!selectedMove || !selectedMove.nextMoveId) {
                return;
            }
            get().selectMove(selectedMove.nextMoveId);
        },

        showPreviousMove: (): void => {
            const selectedMove = get().selectedMove();
            if (!selectedMove || !selectedMove.previousMoveId) {
                return;
            }
            get().selectMove(selectedMove.previousMoveId);
        },

        showFirstMove: (): void => {
            const selectedMove = get().selectedMove();
            if (!selectedMove) {
                return;
            }
            const moveList = get().moveLists[selectedMove.parentId];
            if (!moveList || !moveList.firstMoveId) {
                return;
            }
            get().selectMove(moveList.firstMoveId);
        },

        showLastMove: (): void => {
            const selectedMove = get().selectedMove();
            if (!selectedMove) {
                return;
            }
            const moveList = get().moveLists[selectedMove.parentId];
            if (!moveList || !moveList.lastMoveId) {
                return;
            }
            get().selectMove(moveList.lastMoveId);
        },

        setMoveListComment: (moveListId: TChessMoveListId, comment?: string): void => {
            set((state) => ({ moveLists: { ...state.moveLists, [moveListId]: { ...state.moveLists[moveListId], comment } } }));
        },

        setMoveComment: (moveId: TChessMoveId, comment?: string): void => {
            set((state) => ({ moves: { ...state.moves, [moveId]: { ...state.moves[moveId], comment } } }));
        },

        setScrolledMoveId: (moveId?: TChessMoveId): void => {
            set(() => ({ scrolledMoveId: moveId }));
        },

        selectPiece: (piece: TChessPiece): void => {
            const selectedPiece = !get().selectedPiece || get().selectedPiece?.square !== piece.square ? piece : undefined;
            const possibleMoves = selectedPiece ? get().chess.moves({ square: selectedPiece.square, verbose: true }) : [];
            set(() => ({ selectedPiece, possibleMoves }));
        },

        deselectPiece: (): void => {
            set(() => ({ selectedPiece: undefined, possibleMoves: [] }));
        },

        movePiece: (move: Move): void => {
            const selectedMove = get().selectedMove();
            if (!selectedMove) {
                return;
            }

            let parent = get().getMoveParentList(selectedMove.moveId);
            if (!parent) {
                throw new Error('[ChessService][movePiece] Parent move list not found');
            }

            if (selectedMove.nextMoveId) {
                // Create new variation if move is not the last move
                const nextMove = get().moves[selectedMove.nextMoveId];
                parent = get().addMoveList(selectedMove.moveId);
                if (!nextMove.ravs) {
                    nextMove.ravs = [];
                }
                nextMove.ravs = [...nextMove.ravs, parent.moveListId];
                set((state) => ({ moves: { ...state.moves, [nextMove.moveId]: nextMove } }));
            }

            const generatedMove = get().generateMove(get().chess, move.san, parent.moveListId);
            get().selectMove(generatedMove.moveId);
        },
    })),
);

export const useShallowGameStoreV2: <T>(selector: (state: TGameStoreV2) => T) => T = (selector) => useGameStoreV2(useShallow(selector));

type TGameStoreV2 = {
    chess: Chess;

    moveLists: Record<number, TChessMoveList>;
    moves: Record<number, TChessMove>;

    board?: TChessBoard;
    selectedMoveId?: number;
    scrolledMoveId?: number;
    selectedPiece?: TChessPiece;
    possibleMoves: Move[];
    firstMoveListId?: number;

    currentTurn: () => Color;
    boardPieces: () => TChessPiece[];
    selectedMove: () => TChessMove | undefined;
    checkedSquare: () => Square | undefined;

    reset: () => void;
    load: (pgn: string) => void;
    updateChessBoard: () => void;
    getFirstMoveList: () => TChessMoveList;
    getMoveParentList: (moveId: TChessMoveId) => TChessMoveList | undefined;
    generateMoveList: (chess: Chess, pgnMoves: TChessPgnMove[], fromMoveId?: TChessMoveId, comment?: string) => TChessMoveList;
    generateMove: (chess: Chess, san: string, parentId: TChessMoveListId, pgnMove?: TChessPgnMove) => TChessMove;
    addMoveList: (fromMoveId?: TChessMoveId, comment?: string) => TChessMoveList;
    addMoveToList: (move: TChessMove, moveListId: TChessMoveListId) => void;
    selectMove: (moveId?: TChessMoveId) => void;
    showNextMove: () => void;
    showPreviousMove: () => void;
    showFirstMove: () => void;
    showLastMove: () => void;
    setMoveListComment: (moveListId: TChessMoveListId, comment?: string) => void;
    setMoveComment: (moveId: TChessMoveId, comment?: string) => void;
    setScrolledMoveId: (moveId?: TChessMoveId) => void;
    selectPiece: (piece: TChessPiece) => void;
    deselectPiece: () => void;
    movePiece: (move: Move) => void;
};
