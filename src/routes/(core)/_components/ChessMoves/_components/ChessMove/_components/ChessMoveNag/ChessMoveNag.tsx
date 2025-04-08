import clsx from 'clsx';
import { TChessNag } from '@/shared/types/chess/TChessNag';

type ChessMoveNagProps = {
    moveNag?: TChessNag;
};

export default function ChessMoveNag({ moveNag }: ChessMoveNagProps) {
    if (!moveNag) {
        return null;
    }

    return <div className={clsx('flex items-center justify-center text-xs font-bold')}>{moveNag.label}</div>;
}
