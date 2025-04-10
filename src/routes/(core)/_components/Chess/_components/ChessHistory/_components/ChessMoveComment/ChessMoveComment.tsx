import clsx from 'clsx';
import { useMemo, useRef } from 'react';
import { TReactWrapper } from '@/shared/types/react/TReactWrapper';
import './ChessMoveComment.css';

type ChessMoveCommentProps = {
    attachedMoveRef?: HTMLElement;
} & TReactWrapper;

export default function ChessMoveComment({ attachedMoveRef, children }: ChessMoveCommentProps) {
    const commentRef = useRef<HTMLDivElement | null>(null);

    const arrowOffset = useMemo(() => {
        const moveElement = attachedMoveRef;
        const commentElement = commentRef?.current;
        if (!moveElement || !commentElement) {
            return undefined;
        }
        return `${moveElement.offsetLeft - commentElement.offsetLeft + 6}px`;
    }, [attachedMoveRef, commentRef]);

    return (
        <div className={clsx('relative bg-slate-600 px-2 py-1 text-sm', { 'mt-2': attachedMoveRef })} ref={commentRef}>
            {attachedMoveRef && <div className="arrow absolute bg-gray-600" style={{ left: arrowOffset }} />}
            {children}
        </div>
    );
}
