import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useRef, useState, MouseEvent } from 'react';
import { Group, Menu } from '@mantine/core';
import { mergeRefs } from '@mantine/hooks';
import { getChessPieceClass } from '../../../../../../../../shared/util/ChessUtil';
import { TReactWrapper } from '../../../../../../../../shared/types/react/TReactWrapper';
import useGameStore from '../../../../../../../../shared/stores/gameStore';
import ChessMoveNag from './_components/ChessMoveNag/ChessMoveNag';
import ChessMoveContextMenu from './_components/ChessMoveContextMenu/ChessMoveContextMenu';
import { TChessPiece } from '@/shared/types/chess/TChessPiece';
import './ChessMove.css';
import { CHESS_NAG_MAP } from '@/shared/types/chess/constants/Chess';
import { EChessNag } from '@/shared/types/chess/EChessNag';

type ChessMoveProps = {
    moveId?: number;
    isContinuation?: boolean;
} & Partial<TReactWrapper>;

export default function ChessMove({ moveId, isContinuation, ref }: ChessMoveProps) {
    const move = useGameStore((state) => state.moveStore.moves[moveId ?? 0]);
    const selectMove = useGameStore((state) => state.moveStore.selectMove);
    const selectedMoveId = useGameStore((state) => state.moveStore.selectedMoveId);

    const [contextMenuOpened, setContextMenuOpened] = useState(false);

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

    const onContextMenu = useCallback((ev: MouseEvent) => {
        setContextMenuOpened(true);
        ev.preventDefault();
    }, []);

    const moveNag = useMemo(() => {
        if (move && move.moveNag) {
            return CHESS_NAG_MAP[move.moveNag as EChessNag];
        }
        return undefined;
    }, [move]);

    useEffect(() => {
        if (selectedMoveId === moveId) {
            moveRef.current?.scrollIntoView({ block: 'center' });
        }
    }, [selectedMoveId, moveId, moveRef]);

    return (
        <div className="move my-0.5 flex flex-1" ref={mergeRefs(ref, moveRef)}>
            <Menu opened={contextMenuOpened} onDismiss={() => setContextMenuOpened(false)}>
                <Menu.Target>
                    <Group
                        gap={0}
                        className={clsx('my-0.5 flex rounded py-0.5 pr-2 pl-0.5 text-center select-none', {
                            'cursor-pointer hover:bg-slate-400/15': move !== undefined,
                            '!bg-slate-400/30': selectedMoveId && selectedMoveId === moveId,
                            'font-bold': moveNag,
                        })}
                        style={{ color: moveNag?.color ?? 'inherit' }}
                        onContextMenu={onContextMenu}
                        onClick={() => selectMove(moveId)}>
                        {move && <div className={clsx('mr-1 h-5 w-5', getChessPieceClass(piece))} />}
                        <span className="flex-1">{moveText}</span>
                        {moveNag && <ChessMoveNag moveNag={moveNag} />}
                    </Group>
                </Menu.Target>
                {move && (
                    <Menu.Dropdown>
                        <ChessMoveContextMenu move={move} />
                    </Menu.Dropdown>
                )}
            </Menu>
        </div>
    );
}
