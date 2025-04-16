import { Stack, Menu } from '@mantine/core';
import { IconAdjustments, IconMessageFilled } from '@tabler/icons-react';
import { useMemo } from 'react';
import MenuItemAdapter from '../../../../../../../../../../shared/components/MenuItemAdapter/MenuItemAdapter';
import TablerIconAdapter from '../../../../../../../../../../shared/components/TablerIconAdapter/TablerIconAdapter';
import type { TChessMove } from '../../../../../../../../../../shared/types/chess/TChessMove';
import { useShallowGameStoreV2 } from '@/shared/stores/gameStoreV2';

type ChessMoveContextMenuProps = {
    move?: TChessMove;
};

export default function ChessMoveContextMenu({ move }: ChessMoveContextMenuProps) {
    const setMoveComment = useShallowGameStoreV2((state) => state.setMoveComment);

    const commentButton = useMemo(() => {
        if (!move) {
            return null;
        }

        const text: string = move?.comment ? 'Remove comment' : 'Add comment';
        const action = () => setMoveComment(move.moveId, move.comment ? undefined : 'New comment');

        return (
            <MenuItemAdapter leftSection={<TablerIconAdapter icon={IconMessageFilled} />} onClick={() => action()}>
                {text}
            </MenuItemAdapter>
        );
    }, [move, setMoveComment]);

    if (!move) {
        return null;
    }

    return (
        <Stack className="w-full" gap={0}>
            {commentButton}
            <Menu.Divider />
            <MenuItemAdapter leftSection={<TablerIconAdapter icon={IconAdjustments} />}>Set move state</MenuItemAdapter>
        </Stack>
    );
}
