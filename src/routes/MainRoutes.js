import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import RoleGuard from 'utils/route-guard/RoleGuard';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const RegistryAdd = Loadable(lazy(() => import('views/Registry/Onboarding')));
const RegistryEdit = Loadable(lazy(() => import('views/Registry/Onboarding/edit')));
const ProjectAdd = Loadable(lazy(() => import('views/Project/Onboarding')));
const ProjectEdit = Loadable(lazy(() => import('views/Project/Onboarding/edit')));
const ProjectList = Loadable(lazy(() => import('views/Project/List')));
const ProjectView = Loadable(lazy(() => import('views/Project/View')));

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
        {
            path: '/projects/add',
            element: (
                <RoleGuard role={['registry']}>
                    <ProjectAdd />
                </RoleGuard>
            )
        },
        {
            path: '/projects/edit/:id',
            element: (
                <RoleGuard role={['registry']}>
                    <ProjectEdit />
                </RoleGuard>
            )
        },
        {
            path: '/projects/list',
            element: (
                <RoleGuard role={['registry']}>
                    <ProjectList />
                </RoleGuard>
            )
        },
        {
            path: '/projects/view/:id',
            element: (
                <RoleGuard role={['registry']}>
                    <ProjectView />
                </RoleGuard>
            )
        },
        {
            path: '*',
            element: <PageNotFound />
        }
    ]
};

export default MainRoutes;
