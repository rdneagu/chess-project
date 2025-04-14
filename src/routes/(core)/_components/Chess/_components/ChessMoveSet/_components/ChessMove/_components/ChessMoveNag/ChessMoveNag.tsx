import clsx from 'clsx';
import { TChessNag } from '@/shared/types/chess/TChessNag';

type ChessMoveNagProps = {
    moveNag: TChessNag;
};

export default function ChessMoveNag({ moveNag }: ChessMoveNagProps) {
    return <div className={clsx('ml-1 flex items-center justify-center text-xs font-bold')}>{moveNag.label}</div>;
}
