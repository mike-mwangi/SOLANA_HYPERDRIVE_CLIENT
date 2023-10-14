import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';

// routes
import AuthenticationRotes from './AuthenticationRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
const Projects = Loadable(lazy(() => import('views/pages/landing/projectList')));
const Registry = Loadable(lazy(() => import('views/pages/registry')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([
        { path: '/', element: <PagesLanding /> },
        {
            path: '/projects',
            element: (
                <MinimalLayout>
                    <Projects />
                </MinimalLayout>
            )
        },
        {
            path: '/registries',
            element: <Registry />
        },
        LoginRoutes,
        AuthenticationRotes,
        MainRoutes
    ]);
}
