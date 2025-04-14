import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useRef, useState, MouseEvent } from 'react';
import { Group, Menu } from '@mantine/core';
import { mergeRefs } from '@mantine/hooks';
import { getChessPieceClass } from '../../../../../../../../shared/util/ChessUtil';
import { TReactWrapper } from '../../../../../../../../shared/types/react/TReactWrapper';
import useGameStoreV2 from '../../../../../../../../shared/stores/gameStoreV2';
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
    const move = useGameStoreV2((state) => (moveId ? state.moves[moveId] : undefined));
    const selectMove = useGameStoreV2((state) => state.selectMove);
    const selectedMove = useGameStoreV2((state) => state.selectedMove());
    const scrolledMoveId = useGameStoreV2((state) => state.scrolledMoveId);
    const setScrolledMoveId = useGameStoreV2((state) => state.setScrolledMoveId);

    const [contextMenuOpened, setContextMenuOpened] = useState(false);
    const moveRef = useRef<HTMLDivElement>(null);

    const moveText = useMemo(() => {
        if (isContinuation) {
            return '...';
        }

        return move?.san;
    }, [isContinuation, move]);

    const piece = useMemo<TChessPiece | undefined>(() => {
        if (!move) {
            return undefined;
        }

        return {
            type: move.piece,
            color: move.color,
            square: move.from,
        };
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
        if (scrolledMoveId && scrolledMoveId === moveId) {
            moveRef.current?.scrollIntoView({ block: 'center' });
            setScrolledMoveId(undefined);
        }
    }, [scrolledMoveId, moveId, setScrolledMoveId]);

    return (
        <div className="move my-0.5 flex flex-1" ref={mergeRefs(ref, moveRef)}>
            <Menu opened={contextMenuOpened} onDismiss={() => setContextMenuOpened(false)}>
                <Menu.Target>
                    <Group
                        gap={0}
                        className={clsx('my-0.5 flex rounded py-0.5 pr-2 pl-0.5 text-center select-none', {
                            'cursor-pointer hover:bg-slate-400/15': move !== undefined,
                            '!bg-slate-400/30': selectedMove && selectedMove.moveId === moveId,
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
