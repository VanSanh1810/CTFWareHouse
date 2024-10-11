import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers/RoutesCom.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/scss/_main.scss';
import AppProvider from './contexts/app/AppContext.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    //     <AppProvider>
    //         <RouterProvider router={router} />
    //         <ToastContainer newestOnTop={true} />
    //     </AppProvider>
    // </StrictMode>,
    <AppProvider>
        <RouterProvider router={router} />
        <ToastContainer newestOnTop={true} />
    </AppProvider>,
);
