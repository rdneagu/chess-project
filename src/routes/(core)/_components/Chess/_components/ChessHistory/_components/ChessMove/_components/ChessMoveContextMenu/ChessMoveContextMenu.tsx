import { Stack, Menu } from '@mantine/core';
import { IconAdjustments, IconMessageFilled } from '@tabler/icons-react';
import { useMemo } from 'react';
import MenuItemAdapter from '../../../../../../../../../../shared/components/MenuItemAdapter/MenuItemAdapter';
import TablerIconAdapter from '../../../../../../../../../../shared/components/TablerIconAdapter/TablerIconAdapter';
import type { CChessMove } from '../../../../../../../../../../shared/types/chess/CChessMove';

type ChessMoveContextMenuProps = {
    move: CChessMove;
};

export default function ChessMoveContextMenu({ move }: ChessMoveContextMenuProps) {
    const commentButton = useMemo(() => {
        const text: string = move?.comment ? 'Remove comment' : 'Add comment';
        const action = move?.comment ? () => move.setComment(undefined) : () => move.setComment('New comment');
        return (
            <MenuItemAdapter leftSection={<TablerIconAdapter icon={IconMessageFilled} />} onClick={action}>
                {text}
            </MenuItemAdapter>
        );
    }, [move]);

    return (
        <Stack className="w-full" gap={0}>
            {commentButton}
            <Menu.Divider />
            <MenuItemAdapter leftSection={<TablerIconAdapter icon={IconAdjustments} />}>Set move state</MenuItemAdapter>
        </Stack>
    );
}
