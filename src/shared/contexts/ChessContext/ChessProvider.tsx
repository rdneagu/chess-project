import { useEffect } from 'react';
import { TReactWrapper } from '../../types/react/TReactWrapper';
import { ChessContext } from './ChessContext';
import useChess from '@/shared/hooks/useChess';
import { parsePgn } from '@/shared/util/PgnUtil';

type ChessProviderProps = {
  pgn: string;
  chess: ReturnType<typeof useChess>;
} & TReactWrapper;

export default function ChessProvider({ pgn, chess, children }: ChessProviderProps) {
  const { loadGame } = chess;

  useEffect(() => {
    loadGame(parsePgn(pgn));
  }, [pgn, loadGame]);

  return <ChessContext.Provider value={chess}>{children}</ChessContext.Provider>;
}
