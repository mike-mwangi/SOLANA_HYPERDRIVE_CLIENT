import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const RegistryAdd = Loadable(lazy(() => import('views/Registries/Onboarding/edit')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        // TODO: REMOVE THESE COMMENTS
        // <AuthGuard>
        <MainLayout />
        // </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <SamplePage />
        },
        {
            path: '/registry/add',
            element: <RegistryAdd />
        }
    ]
};

export default MainRoutes;
