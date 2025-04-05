import { useEffect } from 'react';
import { TReactWrapper } from '../../types/react/TReactWrapper';
import { ChessContext } from './ChessContext';
import useChess from '@/shared/hooks/useChess';
import { parsePgn } from '@/shared/util/PgnUtil';

type ChessProviderProps = {
  pgn: string;
} & TReactWrapper;

export default function ChessProvider({ pgn, children }: ChessProviderProps) {
  const chess = useChess();
  const { loadGame } = chess;

  useEffect(() => {
    loadGame(parsePgn(pgn));
  }, [pgn, loadGame]);

  return <ChessContext.Provider value={chess}>{children}</ChessContext.Provider>;
}
