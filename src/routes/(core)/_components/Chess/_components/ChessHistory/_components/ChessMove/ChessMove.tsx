import clsx from 'clsx';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { Group } from '@mantine/core';
import { mergeRefs } from '@mantine/hooks';
import { getChessPieceClass } from '../../../../../../../../shared/util/ChessUtil';
import type { TReactWrapper } from '../../../../../../../../shared/types/react/TReactWrapper';
import ChessMoveNag from './_components/ChessMoveNag/ChessMoveNag';
import { ChessContext } from '@/shared/contexts/ChessContext/ChessContext';
import { TChessMove } from '@/shared/types/chess/TChessMove';
import { TChessPiece } from '@/shared/types/chess/TChessPiece';
import './ChessMove.css';
import { CHESS_NAG_MAP } from '@/shared/types/chess/constants/Chess';
import type { EChessNag } from '@/shared/types/chess/EChessNag';

type ChessMoveProps = {
    move?: TChessMove;
    isContinuation?: boolean;
} & Partial<TReactWrapper>;

export default function ChessMove({ move, isContinuation, ref }: ChessMoveProps) {
    const { selectMove, selectedMove } = useContext(ChessContext);

    const moveRef = useRef<HTMLDivElement>(null);

    const moveText = useMemo(() => {
        if (isContinuation) {
            return '...';
        }

        return move?.san;
    }, [isContinuation, move]);

    const piece = useMemo<TChessPiece | undefined>(() => {
        if (move) {
            return {
                type: move.piece,
                color: move.color,
                square: move.from,
            };
        }
        return undefined;
    }, [move]);

    const moveNag = useMemo(() => {
        if (move && move.moveNag) {
            return CHESS_NAG_MAP[move.moveNag as EChessNag];
        }
        return undefined;
    }, [move]);

    useEffect(() => {
        if (selectedMove === move) {
            moveRef.current?.scrollIntoView({ block: 'center' });
        }
    }, [selectedMove, move, moveRef]);

    return (
        <div className="move my-px mt-1 flex flex-1" ref={mergeRefs(ref, moveRef)}>
            <Group
                gap={0}
                className={clsx('my-0.5 flex rounded py-0.5 pr-2 pl-0.5 text-center select-none', {
                    'cursor-pointer hover:bg-slate-400/15': move !== undefined,
                    '!bg-slate-400/30': selectedMove === move,
                    'font-bold': moveNag,
                })}
                style={{ color: moveNag?.color ?? 'inherit' }}
                onClick={() => selectMove(move)}>
                {move && <div className={clsx('mr-1 h-5 w-5', getChessPieceClass(piece))} />}
                <span className="flex-1">{moveText}</span>
                <ChessMoveNag moveNag={moveNag} />
            </Group>
        </div>
    );
}
