import { IconX } from '@tabler/icons-react';
import colors from 'tailwindcss/colors';
import { EChessNag } from '../EChessNag';
import type { TChessNag } from '../TChessNag';
import TablerIconAdapter from '@/shared/components/TablerIconAdapter/TablerIconAdapter';

export const CHESS_NAG_MAP: Partial<Record<EChessNag, TChessNag>> = {
    [EChessNag.GOOD_MOVE]: {
        text: 'Good',
        label: '!',
        color: colors.sky[400],
    },
    [EChessNag.POOR_MOVE]: {
        text: 'Poor',
        label: '?',
        color: colors.orange[400],
    },
    [EChessNag.VERY_GOOD_MOVE]: {
        text: 'Very Good',
        label: '!!',
        color: colors.emerald[400],
    },
    [EChessNag.VERY_POOR_MOVE]: {
        text: 'Very Poor',
        label: '??',
        color: colors.rose[400],
    },
    [EChessNag.SPECULATIVE_MOVE]: {
        text: 'Speculative',
        label: '!?',
        color: colors.slate[400],
    },
    [EChessNag.QUESTIONABLE_MOVE]: {
        text: 'Questionable',
        label: '?!',
        color: colors.yellow[400],
    },
    [EChessNag.WORST_MOVE]: {
        text: 'Worst',
        label: <TablerIconAdapter icon={IconX} size={16} />,
        color: colors.red[600],
    },
};
