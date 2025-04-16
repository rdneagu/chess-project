import { StrictMode } from 'react';
import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import theme from '@/theme/mantine/mantine';
import { browserRouter } from '@/routes';
import '@/theme/_index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider theme={theme} forceColorScheme="dark">
            <RouterProvider router={browserRouter} />
        </MantineProvider>
    </StrictMode>,
);
