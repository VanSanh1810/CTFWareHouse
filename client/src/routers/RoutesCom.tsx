import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/home';
import MainLayout from '../layouts/MainLayout';
import { NotFoundPage } from '../pages/404';
import { ChallPage } from '../pages/chall';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <MainLayout>
                <HomePage />
            </MainLayout>
        ),
    },
    {
        path: '/challenge',
        element: (
            <MainLayout>
                <ChallPage />
            </MainLayout>
        ),
    },
]);
