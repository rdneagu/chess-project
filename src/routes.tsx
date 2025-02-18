import { lazy } from 'react';
import { Route, Routes } from 'react-router';

const AppLayout = lazy(() => import('@/routes/layout'));
const AppNotFound = lazy(() => import('@/routes/not-found'));
const AppError = lazy(() => import('@/routes/error'));
const CoreLayout = lazy(() => import('@/routes/(core)/layout'));
const CorePage = lazy(() => import('@/routes/(core)/page'));

export default (
  <Routes>
    <Route element={<AppLayout />} errorElement={<AppError />}>
      <Route element={<CoreLayout />}>
        <Route path="/" element={<CorePage />} handle={{ title: 'Home' }} />
      </Route>
    </Route>
    <Route path="*" element={<AppNotFound />} />
  </Routes>
);
