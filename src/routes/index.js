import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// routes
import Loadable from 'ui-component/Loadable';
import AuthenticationRotes from './AuthenticationRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
const Projects = Loadable(lazy(() => import('views/pages/landing/ProjectListPage')));
const Registry = Loadable(lazy(() => import('views/pages/registry')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([
        { path: '/', element: <PagesLanding /> },
        {
            path: '/projects',
            element: <Projects />
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
