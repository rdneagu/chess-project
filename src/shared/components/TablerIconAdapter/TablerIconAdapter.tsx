import { TablerIcon } from '@tabler/icons-react';

type TablerIconAdapterComponent = {
  icon: TablerIcon;
  size?: number;
};

export default function TablerIconAdapter({ icon: Icon, size = 18 }: TablerIconAdapterComponent) {
  return <Icon size={size} />;
}
