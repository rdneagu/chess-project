import { TablerIcon } from '@tabler/icons-react';

type TablerIconAdapterComponent = {
  icon: TablerIcon;
  size?: number;
};

export default function TablerIconAdapter({ icon: Icon, size }: TablerIconAdapterComponent) {
  return <Icon size={size} />;
}

TablerIconAdapter.defaultProps = {
  size: 18,
};
