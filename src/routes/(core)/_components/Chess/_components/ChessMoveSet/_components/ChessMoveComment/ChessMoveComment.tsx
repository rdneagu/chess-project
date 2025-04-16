import clsx from 'clsx';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import './ChessMoveComment.css';

type ChessMoveCommentProps = {
    attachedMoveRef?: HTMLElement;
    comment?: string;
};

export default function ChessMoveComment({ attachedMoveRef, comment }: ChessMoveCommentProps) {
    const commentRef = useRef<HTMLDivElement | null>(null);
    const [arrowOffset, setArrowOffset] = useState<string>();

    const [commentValue, setCommentValue] = useState(comment);
    const editableRef = useRef<HTMLDivElement | null>(null);

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

    useEffect(() => {
        if (editableRef.current) {
            editableRef.current.focus();
        }
    }, [editableRef]);

    useEffect(() => {
        if (comment && editableRef.current) {
            editableRef.current.innerText = comment;
        }
    }, [comment]);

    const onBlur = useCallback(() => {
        console.log(commentValue);
    }, [commentValue]);

    const onInput = useCallback((event: FormEvent<HTMLDivElement>) => {
        setCommentValue(event.currentTarget.innerText);
    }, []);

    return (
        <div className={clsx('chess-comment relative flex bg-slate-600 text-sm', { 'mt-2': attachedMoveRef })} ref={commentRef}>
            {attachedMoveRef && <div className="comment-arrow absolute bg-gray-600" style={{ left: arrowOffset }} />}
            <div
                contentEditable
                ref={editableRef}
                onBlur={() => onBlur()}
                onInput={(event) => onInput(event)}
                className="comment-textarea max-h-22 flex-1 overflow-y-auto px-2 py-1 outline-none"
            />
        </div>
    );
}
