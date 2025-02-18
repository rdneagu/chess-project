import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Outlet } from 'react-router';

export default function AppLayout() {
  return (
    <ModalsProvider>
      <Notifications position="top-right" />
      <Outlet />
    </ModalsProvider>
  );
}
