import { ChessBoard } from './_components/ChessBoard/ChessBoard';
import ChessPiece, { EChessPiece, EChessPieceColor } from './_components/ChessPiece/ChessPiece';

export default function CorePage() {
  return (
    <div>
      <ChessBoard>
        <ChessPiece piece={EChessPiece.ROOK} color={EChessPieceColor.WHITE} position="a1" />
        <ChessPiece piece={EChessPiece.KNIGHT} color={EChessPieceColor.WHITE} position="b1" />
        <ChessPiece piece={EChessPiece.BISHOP} color={EChessPieceColor.WHITE} position="c1" />
        <ChessPiece piece={EChessPiece.QUEEN} color={EChessPieceColor.WHITE} position="d1" />
        <ChessPiece piece={EChessPiece.KING} color={EChessPieceColor.WHITE} position="e1" />
        <ChessPiece piece={EChessPiece.BISHOP} color={EChessPieceColor.WHITE} position="f1" />
        <ChessPiece piece={EChessPiece.KNIGHT} color={EChessPieceColor.WHITE} position="g1" />
        <ChessPiece piece={EChessPiece.ROOK} color={EChessPieceColor.WHITE} position="h1" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.WHITE} position="a2" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.WHITE} position="b2" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.WHITE} position="c2" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.WHITE} position="d2" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.WHITE} position="e2" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.WHITE} position="f2" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.WHITE} position="g2" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.WHITE} position="h2" />
        <ChessPiece piece={EChessPiece.ROOK} color={EChessPieceColor.BLACK} position="a8" />
        <ChessPiece piece={EChessPiece.KNIGHT} color={EChessPieceColor.BLACK} position="b8" />
        <ChessPiece piece={EChessPiece.BISHOP} color={EChessPieceColor.BLACK} position="c8" />
        <ChessPiece piece={EChessPiece.QUEEN} color={EChessPieceColor.BLACK} position="d8" />
        <ChessPiece piece={EChessPiece.KING} color={EChessPieceColor.BLACK} position="e8" />
        <ChessPiece piece={EChessPiece.BISHOP} color={EChessPieceColor.BLACK} position="f8" />
        <ChessPiece piece={EChessPiece.KNIGHT} color={EChessPieceColor.BLACK} position="g8" />
        <ChessPiece piece={EChessPiece.ROOK} color={EChessPieceColor.BLACK} position="h8" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.BLACK} position="a7" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.BLACK} position="b7" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.BLACK} position="c7" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.BLACK} position="d7" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.BLACK} position="e7" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.BLACK} position="f7" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.BLACK} position="g7" />
        <ChessPiece piece={EChessPiece.PAWN} color={EChessPieceColor.BLACK} position="h7" />
      </ChessBoard>
    </div>
  );
}
