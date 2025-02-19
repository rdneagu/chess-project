import { Outlet } from 'react-router';

export default function CoreLayout() {
  // TODO: Load user session or redirect to auth if not logged (already have code ready for it)
  return <Outlet />;
}
