import clsx from 'clsx';
import { ReactNode, useEffect, useRef, useState } from 'react';
import './ChessMoveComment.css';
import { TReactWrapper } from '../../../../../../../../shared/types/react/TReactWrapper';

type ChessMoveCommentProps = {
    attachedMoveRef?: HTMLElement;
    children: ReactNode;
} & TReactWrapper;

export default function ChessMoveComment({ attachedMoveRef, children }: ChessMoveCommentProps) {
    const commentRef = useRef<HTMLDivElement | null>(null);
    const [arrowOffset, setArrowOffset] = useState<string>();

    useEffect(() => {
        const moveElement = attachedMoveRef;
        const commentElement = commentRef.current;
        if (moveElement && commentElement) {
            const moveRect = moveElement.getBoundingClientRect();
            const commentRect = commentElement.getBoundingClientRect();
            const offset = moveRect.left - commentRect.left + 6;
            setArrowOffset(`${offset}px`);
        }
    }, [attachedMoveRef]);

    return (
        <div className={clsx('relative bg-slate-600 px-2 py-1 text-sm', { 'mt-2': attachedMoveRef })} ref={commentRef}>
            {attachedMoveRef && <div className="arrow absolute bg-gray-600" style={{ left: arrowOffset }} />}
            {children}
        </div>
    );
}
