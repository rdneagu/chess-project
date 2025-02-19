import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import Loader from '@/shared/components/Loader/Loader';

const AppLayout = lazy(() => import('@/routes/layout'));
const AppNotFound = lazy(() => import('@/routes/not-found'));
const AppError = lazy(() => import('@/routes/error'));
const CoreLayout = lazy(() => import('@/routes/(core)/layout'));
const CorePage = lazy(() => import('@/routes/(core)/page'));

export const browserRouter = createBrowserRouter([
  {
    element: (
      <Loader type="suspense" className="h-screen">
        <AppLayout />
      </Loader>
    ),
    children: [
      {
        errorElement: <AppError />,
        children: [
          {
            element: <CoreLayout />,
            children: [
              {
                path: '/',
                element: <CorePage />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <AppNotFound />,
      },
    ],
  },
]);
