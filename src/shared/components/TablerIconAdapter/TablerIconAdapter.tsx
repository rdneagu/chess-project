import { TablerIcon } from '@tabler/icons-react';
import { TReactWrapper } from '@/shared/types/react/TReactWrapper';

type TablerIconAdapterComponent = {
    icon: TablerIcon;
    size?: number;
} & Partial<TReactWrapper>;

export default function TablerIconAdapter({ icon: Icon, size = 18, ref }: TablerIconAdapterComponent) {
    return <Icon size={size} ref={ref} />;
}
