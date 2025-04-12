import { useMemo } from 'react';
import clsx from 'clsx';
import useGameStore from '../../../../../../../../shared/stores/gameStore';
import ChessSquare from './ChessSquare';
import { EChessNag } from '@/shared/types/chess/EChessNag';
import { CHESS_NAG_MAP } from '@/shared/types/chess/constants/Chess';

export default function ChessSquareNag() {
    const selectedMove = useGameStore((state) => state.moveStore.selectedMove);

    const moveNag = useMemo(() => {
        if (selectedMove) {
            return CHESS_NAG_MAP[selectedMove.moveNag as EChessNag];
        }
        return undefined;
    }, [selectedMove]);

    if (!selectedMove || !moveNag) {
        return null;
    }

    return (
        <ChessSquare square={selectedMove?.to}>
            <div
                className={clsx(
                    'shadow-elevation-2 absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full p-1 text-sm font-bold text-white shadow-black/20',
                )}
                style={{ backgroundColor: moveNag.color }}>
                {moveNag.label}
            </div>
        </ChessSquare>
    );
}
