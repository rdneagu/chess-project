import clsx from 'clsx';
import { useMemo, useRef } from 'react';
import useGameStore from '../../../../../../../../shared/stores/gameStore';
import './ChessMoveComment.css';

type ChessMoveCommentProps = {
    moveId?: number;
    attachedMoveRef?: HTMLElement;
};

export default function ChessMoveComment({ moveId, attachedMoveRef }: ChessMoveCommentProps) {
    const commentRef = useRef<HTMLDivElement | null>(null);
    const move = useGameStore((state) => state.moveStore.getMove(moveId));

    const arrowOffset = useMemo(() => {
        const moveElement = attachedMoveRef;
        const commentElement = commentRef?.current;
        if (!moveElement || !commentElement) {
            return undefined;
        }
        return `${moveElement.offsetLeft - commentElement.offsetLeft + 6}px`;
    }, [attachedMoveRef, commentRef]);

    if (!move) {
        return null;
    }

    return (
        <div className={clsx('relative bg-slate-600 px-2 py-1 text-sm', { 'mt-2': attachedMoveRef })} ref={commentRef}>
            {attachedMoveRef && <div className="arrow absolute bg-gray-600" style={{ left: arrowOffset }} />}
            {move.comment}
        </div>
    );
}
