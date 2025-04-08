import clsx from 'clsx';
import { useContext, useMemo } from 'react';
import { ChessContext } from '@/shared/contexts/ChessContext/ChessContext';

type ChessMoveProps = {
    id?: number;
    san?: string;
    isContinuation?: boolean;
    onMoveSelect: (id?: number) => void;
};

export default function ChessMove({ id, san, isContinuation, onMoveSelect }: ChessMoveProps) {
    const { selectedMove } = useContext(ChessContext);

    const selected = useMemo(() => selectedMove?.moveId === id, [selectedMove, id]);
    const moveText = useMemo(() => {
        if (isContinuation) {
            return '...';
        }

        return san;
    }, [isContinuation, san]);

    return (
        <div className="flex-1">
            <span
                className={clsx('rounded px-1 py-px select-none', {
                    'cursor-pointer hover:bg-indigo-400/20': id !== undefined,
                    'bg-indigo-400': selected,
                })}
                onClick={() => onMoveSelect(id)}>
                {moveText}
            </span>
        </div>
    );
}
