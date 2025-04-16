import { useHotkeys } from '@mantine/hooks';
import { useShallowGameStoreV2 } from '../../../../../../shared/stores/gameStoreV2';
import ChessBoardRanks from './_components/ChessBoardRanks/ChessBoardRanks';
import ChessBoardFiles from './_components/ChessBoardFiles/ChessBoardFiles';
import ChessSquarePiece from './_components/ChessSquare/ChessSquarePiece';
import ChessSquare from './_components/ChessSquare/ChessSquare';
import ChessSquareMove from './_components/ChessSquare/ChessSquareMove';
import ChessSquareNag from './_components/ChessSquare/ChessSquareNag';
import { EChessSquareType } from './_components/ChessSquare/types/EChessSquareType';
import useRerenderCount from '@/shared/hooks/useRerenderCount';

export default function ChessBoard() {
    const showFirstMove = useShallowGameStoreV2((state) => state.showFirstMove);
    const showPreviousMove = useShallowGameStoreV2((state) => state.showPreviousMove);
    const showNextMove = useShallowGameStoreV2((state) => state.showNextMove);
    const showLastMove = useShallowGameStoreV2((state) => state.showLastMove);
    const selectedMove = useShallowGameStoreV2((state) => state.selectedMove());
    const isSquareChecked = useShallowGameStoreV2((state) => state.checkedSquare());
    const boardPieces = useShallowGameStoreV2((state) => state.boardPieces());
    const possibleMoves = useShallowGameStoreV2((state) => state.possibleMoves);
    const currentTurn = useShallowGameStoreV2((state) => state.currentTurn());
    const selectedPiece = useShallowGameStoreV2((state) => state.selectedPiece);
    const selectPiece = useShallowGameStoreV2((state) => state.selectPiece);
    const movePiece = useShallowGameStoreV2((state) => state.movePiece);

    useRerenderCount(`ChessBoard`);

    useHotkeys([
        // ['ArrowUp', () => leaveVariation()],
        // ['ArrowDown', () => returnToVariation()],
        ['Home', () => showFirstMove()],
        ['ArrowLeft', () => showPreviousMove()],
        ['ArrowRight', () => showNextMove()],
        ['End', () => showLastMove()],
    ]);

    return (
        <div className="m-auto flex flex-col gap-y-2">
            <div className="bg-board-purple shadow-light/15 shadow-elevation-8 relative h-128 w-128 rounded">
                <ChessBoardRanks />
                <ChessBoardFiles />
                {selectedMove && (
                    <>
                        <ChessSquareMove square={selectedMove.from} isCapturing={selectedMove.isCapture} moveType={EChessSquareType.MOVE_FROM} />
                        <ChessSquareMove square={selectedMove.to} isCapturing={selectedMove.isCapture} moveType={EChessSquareType.MOVE_TO} />
                    </>
                )}
                {selectedPiece && <ChessSquare square={selectedPiece?.square} type={EChessSquareType.SELECTED} />}
                {isSquareChecked && <ChessSquare square={isSquareChecked} type={EChessSquareType.CHECKED} />}
                {selectedMove && <ChessSquareNag />}
                {boardPieces?.map((piece) => (
                    <ChessSquarePiece
                        key={piece.square}
                        square={piece.square}
                        piece={piece}
                        turn={currentTurn}
                        onPieceClick={() => selectPiece(piece)}
                    />
                ))}
                {possibleMoves.map((move) => (
                    <ChessSquareMove key={move.to} square={move.to} isCapturing={move.isCapture()} onMoveClick={() => movePiece(move)} />
                ))}
            </div>
        </div>
    );
}
