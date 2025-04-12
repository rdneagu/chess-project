export default function useChess() {
    // const [board, setBoard] = useAtom(boardAtom);
    // const [moveList, setMoveList] = useAtom(moveListAtom);
    // const [possibleMoves, setPossibleMoves] = useAtom(possibleMovesAtom);
    // const [selectedPiece, setSelectedPiece] = useAtom(selectedPieceAtom);
    // const [selectedMove, setSelectedMove] = useAtom(selectedMoveAtom);
    // const [lastViewedVariation, setLastViewedVariation] = useAtom(lastViewedVariationAtom);
    // const { chess, moveStore, moveListStore } = useGameStore();
    // const { moveLists, generateMoveList } = moveListStore;
    // const { moves } = moveStore;
    // const pieces = useMemo(() => board.flat().filter((piece) => piece !== null), [board]);
    // const selectPiece = useCallback(
    //     (piece: TChessPiece) => {
    //         const nextSelectedPiece = selectedPiece === null || selectedPiece.square !== piece.square ? piece : null;
    //         setSelectedPiece(nextSelectedPiece);
    //         const nextPossibleMoves = nextSelectedPiece ? chess.moves({ square: nextSelectedPiece.square, verbose: true }) : [];
    //         setPossibleMoves(nextPossibleMoves);
    //     },
    //     [selectedPiece, setPossibleMoves, setSelectedPiece],
    // );
    // const deselectPiece = useCallback(() => {
    //     setSelectedPiece(null);
    //     setPossibleMoves([]);
    // }, [setPossibleMoves, setSelectedPiece]);
    // const currentTurn = useMemo(() => chess.turn(), [selectedMove]); // eslint-disable-line react-hooks/exhaustive-deps
    // const isCheck = useMemo(() => chess.inCheck(), [selectedMove]); // eslint-disable-line react-hooks/exhaustive-deps
    // const checkedSquare = useMemo(() => {
    //     if (!isCheck) {
    //         return undefined;
    //     }
    //     const foundKing = pieces.find((piece) => piece.type === KING && piece.color === currentTurn);
    //     return foundKing?.square;
    // }, [isCheck, currentTurn, pieces]);
    // const addComment = useCallback(
    //     (move: TChessMove, comment?: string) => {
    //         move.comment = comment;
    //         const { parent } = move;
    //         const moveIndex = parent.moves.findIndex((findMove) => findMove.moveId === move.moveId);
    //         if (moveIndex !== -1) {
    //             parent.moves.splice(moveIndex, 1, { ...move });
    //         }
    //         let listParent: ChessMoveLinkedList | undefined = parent;
    //         while (listParent) {
    //             if (!listParent.parent) {
    //                 break;
    //             }
    //             listParent.updateMoves();
    //             listParent = listParent.parent;
    //         }
    //         setMoveList(produce(listParent, (draft) => draft));
    //     },
    //     [setMoveList],
    // );
    // useEffect(() => {
    //     deselectPiece();
    // }, [selectedMove, deselectPiece]);
    // return {
    //     board,
    //     pieces,
    //     moveList,
    //     possibleMoves,
    //     selectedPiece,
    //     selectedMove,
    //     currentTurn,
    //     checkedSquare,
    //     loadGame,
    //     movePiece,
    //     selectPiece,
    //     selectMove,
    //     showFirstMove,
    //     showPreviousMove,
    //     showNextMove,
    //     showLastMove,
    //     leaveVariation,
    //     returnToVariation,
    //     addComment,
    // };
}
