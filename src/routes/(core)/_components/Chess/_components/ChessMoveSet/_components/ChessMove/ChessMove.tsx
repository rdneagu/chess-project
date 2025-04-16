import clsx from 'clsx';
import { useCallback, useMemo, useRef, useState, MouseEvent } from 'react';
import { Group, Menu } from '@mantine/core';
import { mergeRefs } from '@mantine/hooks';
import { getChessPieceClass } from '../../../../../../../../shared/util/ChessUtil';
import { TReactWrapper } from '../../../../../../../../shared/types/react/TReactWrapper';
import ChessMoveNag from './_components/ChessMoveNag/ChessMoveNag';
import ChessMoveContextMenu from './_components/ChessMoveContextMenu/ChessMoveContextMenu';
import { useShallowGameStoreV2 } from '@/shared/stores/gameStoreV2';
import { TChessPiece } from '@/shared/types/chess/TChessPiece';
import './ChessMove.css';
import { CHESS_NAG_MAP } from '@/shared/types/chess/constants/Chess';
import { EChessNag } from '@/shared/types/chess/EChessNag';

type ChessMoveProps = {
    moveId?: number;
    isContinuation?: boolean;
} & Partial<TReactWrapper>;

export default function ChessMove({ moveId, isContinuation, ref }: ChessMoveProps) {
    const move = useShallowGameStoreV2((state) => (moveId ? state.moves[moveId] : undefined));
    const selectMove = useShallowGameStoreV2((state) => state.selectMove);
    const selectedMove = useShallowGameStoreV2((state) => state.selectedMove());

    // useRerenderCount(`ChessMove ${moveId}`);

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

    // FIXME: This is causing a re-render, creating UI lag, need a way to scroll to current move without the world ending
    // useEffect(() => {
    //     if (selectedMove && selectedMove?.moveId !== scrolledMoveId) {
    //         setScrolledMoveId(selectedMove.moveId);
    //         moveRef.current?.scrollIntoView({ block: 'center' });
    //     }
    // }, [selectedMove]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="move my-0.5 flex flex-1" ref={mergeRefs(ref, moveRef)}>
            <Menu opened={contextMenuOpened} onClose={() => setContextMenuOpened(false)}>
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
