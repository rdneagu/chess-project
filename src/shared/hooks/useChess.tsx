import { Chess, KING, Move } from 'chess.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChessMoveLinkedList } from '../types/chess/ChessMoveLinkedList';
import { TChessBoard } from '../types/chess/TChessBoard';
import { TChessMove } from '../types/chess/TChessMove';
import { TChessPgn } from '../types/chess/TChessPgn';
import { TChessPiece } from '../types/chess/TChessPiece';

export default function useChess() {
    const chess = useMemo(() => new Chess(), []);

    const [board, setBoard] = useState<TChessBoard>([]);
    const [moveList, setMoveList] = useState<ChessMoveLinkedList>(new ChessMoveLinkedList());
    const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);
    const [selectedPiece, setSelectedPiece] = useState<TChessPiece | null>(null);
    const [selectedMove, setSelectedMove] = useState<TChessMove | null>(null);

    const pieces = useMemo(() => board.flat().filter((piece) => piece !== null), [board]);

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

            const generatedMoveList = ChessMoveLinkedList.createMoveListFromPgn(chess, pgnConfig.moves);
            setMoveList(generatedMoveList);
            selectMove(generatedMoveList.lastMove);
        },
        [chess, selectMove],
    );

    const movePiece = useCallback(
        (move: Move) => {
            if (selectedMove) {
                let { parent } = selectedMove;
                if (selectedMove.nextMove) {
                    // Create new variation if move is not the last move
                    parent = new ChessMoveLinkedList();
                    if (!selectedMove.nextMove.ravs) {
                        selectedMove.nextMove.ravs = [];
                    }
                    selectedMove.nextMove.ravs = [...selectedMove.nextMove.ravs, parent];
                }
                const generatedMove = parent.generateMove(chess, move.san);
                selectedMove.parent.updateMoves();
                selectMove(generatedMove);
            }
        },
        [chess, selectMove, selectedMove],
    );

    const showPreviousMove = useCallback(() => {
        selectMove(selectedMove?.previousMove ?? selectedMove?.parent.lastMove ?? moveList.lastMove);
    }, [selectedMove, selectMove, moveList]);

    const showNextMove = useCallback(() => {
        selectMove(selectedMove?.nextMove ?? selectedMove?.parent.firstMove ?? moveList.firstMove);
    }, [selectedMove, selectMove, moveList]);

    const showFirstMove = useCallback(() => {
        selectMove(selectedMove?.parent.firstMove ?? moveList.firstMove);
    }, [moveList, selectMove, selectedMove]);

    const showLastMove = useCallback(() => {
        selectMove(selectedMove?.parent.lastMove ?? moveList.lastMove);
    }, [moveList, selectMove, selectedMove]);

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
