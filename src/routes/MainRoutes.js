import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import RoleGuard from 'utils/route-guard/RoleGuard';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const RegistryAdd = Loadable(lazy(() => import('views/Registries/Onboarding')));
const RegistryEdit = Loadable(lazy(() => import('views/Registries/Onboarding/edit')));

// 404 page
const PageNotFound = Loadable(lazy(() => import('views/pages/maintenance/Error')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        // TODO: REMOVE THESE COMMENTS
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <SamplePage />
        },
        // Registry routes
        {
            path: '/registry/add',
            element: (
                <RoleGuard role={['registry']}>
                    <RegistryAdd />
                </RoleGuard>
            )
        },
        {
            path: '/registry/edit/:id',
            element: (
                <RoleGuard role={['registry']}>
                    <RegistryEdit />
                </RoleGuard>
            )
        },
        // Page not found
        {
            path: '*',
            element: <PageNotFound />
        }
    ]
};

export default MainRoutes;
