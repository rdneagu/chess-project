import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Chess, KING, Move } from 'chess.js';
import { TGameStore } from '../types/stores/TGameStore';
import { TChessBoard } from '../types/chess/TChessBoard';
import { parsePgn } from '../util/PgnUtil';
import { TChessPiece } from '../types/chess/TChessPiece';
import { createMoveSlice } from './moveSlice';
import { createMoveListSlice } from './moveListSlice';

const useGameStore = create<TGameStore, [['zustand/immer', never], ['zustand/devtools', never]]>(
    immer(
        devtools((...args) => ({
            moveStore: createMoveSlice(...args),
            moveListStore: createMoveListSlice(...args),
            chess: new Chess(),
            board: undefined,
            selectedPiece: undefined,
            possibleMoves: [],
            setBoard: (board: TChessBoard) => {
                const [set] = args;
                set((state) => {
                    state.board = board;
                });
            },
            getBoardPieces: () => {
                const [, get] = args;
                const { board } = get();
                return board?.flat().filter((piece) => piece !== null);
            },
            loadGame: (pgn: string) => {
                const [, get] = args;
                const { chess, resetGame, setBoard, selectMove } = get();
                const { generateMoveList } = get().moveListStore;
                const { moves } = parsePgn(pgn);

                resetGame();
                const moveList = generateMoveList(chess, moves);
                console.log(get().moveListStore.moveLists);
                console.log(get().moveStore.moves);
                setBoard(chess.board());
                selectMove(moveList.lastMoveId);
            },
            resetGame: () => {
                const [, get] = args;
                const { chess, setBoard, selectMove } = get();
                const { resetMoveLists } = get().moveListStore;
                const { resetMoves } = get().moveStore;

                resetMoveLists();
                resetMoves();

                chess.reset();
                setBoard(chess.board());
                selectMove(undefined);
            },
            selectMove: (moveId?: number) => {
                const [, get] = args;
                const { selectMove } = get().moveStore;
                selectMove(moveId);
            },
            showPreviousMove: () => {
                const [, get] = args;
                const { getSelectedMove, selectMove } = get().moveStore;
                selectMove(getSelectedMove()?.previousMoveId);
            },
            showNextMove: () => {
                const [, get] = args;
                const { getSelectedMove, selectMove } = get().moveStore;
                selectMove(getSelectedMove()?.nextMoveId);
            },
            showFirstMove: () => {
                const [, get] = args;
                const { getSelectedMove, selectMove } = get().moveStore;
                const { getMoveList } = get().moveListStore;
                const parentId = getSelectedMove()?.parentId;
                if (parentId) {
                    selectMove(getMoveList(parentId)?.firstMoveId);
                }
            },
            showLastMove: () => {
                const [, get] = args;
                const { getSelectedMove, selectMove } = get().moveStore;
                const { getMoveList } = get().moveListStore;
                const parentId = getSelectedMove()?.parentId;
                if (parentId) {
                    selectMove(getMoveList(parentId)?.lastMoveId);
                }
            },
            leaveVariation: () => {
                // if (selectedMove?.parent.variationFrom) {
                //     setLastViewedVariation(selectedMove.parent);
                //     selectMove(selectedMove.parent.variationFrom);
                // }
            },

            returnToVariation: () => {
                // if (lastViewedVariation) {
                //     selectMove(lastViewedVariation.firstMove);
                //     setLastViewedVariation(null);
                // }
            },

            movePiece: (move: Move) => {
                console.log(move);
                // if (selectedMove) {
                //     let { parent } = selectedMove;
                //     if (selectedMove.nextMove) {
                //         // Create new variation if move is not the last move
                //         parent = new ChessMoveLinkedList();
                //         if (!selectedMove.nextMove.ravs) {
                //             selectedMove.nextMove.ravs = [];
                //         }
                //         selectedMove.nextMove.ravs = [...selectedMove.nextMove.ravs, parent];
                //         parent.setVariationFrom(selectedMove);
                //     }
                //     const generatedMove = parent.generateMove(chess, { san: move.san });
                //     selectedMove.parent.updateMoves();
                //     selectMove(generatedMove);
                // }
            },

            selectPiece: (piece: TChessPiece) => {
                console.log(piece);
                // const nextSelectedPiece = selectedPiece === null || selectedPiece.square !== piece.square ? piece : null;
                // setSelectedPiece(nextSelectedPiece);
                // const nextPossibleMoves = nextSelectedPiece ? chess.moves({ square: nextSelectedPiece.square, verbose: true }) : [];
                // setPossibleMoves(nextPossibleMoves);
            },

            deselectPiece: () => {
                // setSelectedPiece(null);
                // setPossibleMoves([]);
            },

            currentTurn: () => {
                const [, get] = args;
                const { chess } = get();
                return chess.turn();
            },
            isCheck: () => {
                const [, get] = args;
                const { chess } = get();
                return chess.inCheck();
            },

            checkedSquare: () => {
                const [, get] = args;
                const { chess, getBoardPieces } = get();
                const isCheck = chess.inCheck();
                if (!isCheck) {
                    return undefined;
                }
                const foundKing = getBoardPieces()?.find((piece) => piece.type === KING && piece.color === get().currentTurn());
                return foundKing?.square;
            },
        })),
    ),
);

export default useGameStore;
