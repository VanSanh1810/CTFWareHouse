import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/home';
import MainLayout from '../layouts/MainLayout';
import { ChallPage } from '../pages/chall';
import { ManagePage } from '../pages/manage';
import { NotFoundPage } from '../pages/404';
import { WriteupPage } from '../pages/writeup';

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
        path: '/challenge/writeup/:id?',
        element: (
            <MainLayout>
                <WriteupPage />
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
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
