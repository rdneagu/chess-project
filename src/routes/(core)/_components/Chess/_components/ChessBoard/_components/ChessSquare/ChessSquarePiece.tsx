import { Color, Square } from 'chess.js';
import { useCallback, useMemo } from 'react';
import ChessSquare from './ChessSquare';

import { TChessPiece } from '@/shared/types/chess/TChessPiece';
import { TReactWrapper } from '@/shared/types/react/TReactWrapper';
import { getChessPieceClass } from '@/shared/util/ChessUtil';

type ChessSquarePieceProps = {
    square: Square;
    piece: TChessPiece;
    turn: Color;
    onPieceClick?: () => void;
} & Partial<TReactWrapper>;

export default function ChessSquarePiece({ square, piece, turn, onPieceClick }: ChessSquarePieceProps) {
    const pieceClass = useMemo(() => getChessPieceClass(piece), [piece]);

    const onSquareClick = useCallback(() => {
        if (turn === piece.color) {
            onPieceClick?.();
        }
    }, [onPieceClick, piece, turn]);

    return <ChessSquare square={square} className={pieceClass} onSquareClick={onSquareClick} />;
}
