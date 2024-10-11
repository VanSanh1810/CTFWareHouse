import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/home';
import MainLayout from '../layouts/MainLayout';
import { ChallPage } from '../pages/chall';
import { ManagePage } from '../pages/manage';

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
    {
        path: '/manage',
        element: (
            <MainLayout>
                <ManagePage />
            </MainLayout>
        ),
    },
]);
