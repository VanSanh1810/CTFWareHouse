import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers/RoutesCom.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/scss/_main.scss';
import AppProvider from './contexts/app/AppContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
    </StrictMode>,
);
