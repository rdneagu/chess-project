import { Color, Square, PieceSymbol } from 'chess.js';

export type TChessMove = {
  ply: number;
  rav?: CLinkedMoveList[];
  san: string;
  beforeFen: string;
  afterFen: string;
  color: Color;
  from: Square;
  to: Square;
  piece: PieceSymbol;
  captured?: PieceSymbol;
  promotion?: PieceSymbol;
  isCapture: boolean;
  isPromotion: boolean;
  isEnPassant: boolean;
  isKingsideCastle: boolean;
  isQueensideCastle: boolean;
  isBigPawn: boolean;
  previousMove?: TChessMove;
  nextMove?: TChessMove;
};

export class CLinkedMoveList {
  private _firstMove?: TChessMove;
  private _lastMove?: TChessMove;
  private _length: number;
  private _moves: TChessMove[];

  constructor() {
    this._length = 0;
    this._moves = [];
  }

  get firstMove() {
    return this._firstMove;
  }

  get lastMove() {
    return this._lastMove;
  }

  get length() {
    return this._length;
  }

  get moves() {
    return this._moves;
  }

  addMove(move: TChessMove) {
    if (!this._firstMove || !this._lastMove) {
      this._firstMove = move;
      this._lastMove = move;
    } else {
      move.previousMove = this.lastMove;
      this._lastMove.nextMove = move;
      this._lastMove = move;
    }
    this._moves.push(move);
    this._length++;

    return this;
  }

  deleteMove(moveId: number) {
    const moveIndex = this.moves.findIndex((m) => m.moveId === moveId);
    if (moveIndex === -1) {
      return this;
    }

    const move = this.moves[moveIndex];

    // Update links
    if (move.previousMove) {
      move.previousMove.nextMove = move.nextMove;
    } else {
      this._firstMove = move.nextMove;
    }

    if (move.nextMove) {
      move.nextMove.previousMove = move.previousMove;
    } else {
      this._lastMove = move.previousMove;
    }

    // Remove from array
    this._moves.splice(moveIndex, 1);
    this._length--;

    return this;
  }
}
