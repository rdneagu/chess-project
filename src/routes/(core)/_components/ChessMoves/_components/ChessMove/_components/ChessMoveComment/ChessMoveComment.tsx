import { Tooltip } from '@mantine/core';
import { IconMessageFilled } from '@tabler/icons-react';
import TablerIconAdapter from '@/shared/components/TablerIconAdapter/TablerIconAdapter';
import { TReactWrapper } from '@/shared/types/react/TReactWrapper';

export default function ChessMoveComment({ children }: TReactWrapper) {
    if (!children) {
        return null;
    }

    return (
        <Tooltip color="primary" label={children}>
            <TablerIconAdapter icon={IconMessageFilled} />
        </Tooltip>
    );
}
