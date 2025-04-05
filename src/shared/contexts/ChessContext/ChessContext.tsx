import { createContext } from 'react';
import useChess from '../../hooks/useChess';

export const ChessContext = createContext<ReturnType<typeof useChess>>({} as ReturnType<typeof useChess>);
