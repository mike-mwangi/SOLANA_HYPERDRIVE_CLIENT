/* eslint-disable no-underscore-dangle */
function routeRegistry(user) {
    if (!user?.profile) {
        return '/registry/add';
    }

    if (user?.profile?.stage === 'draft') {
        return `/registry/edit/${user?.profile?._id}`;
    }

    return '/projects/list';
}

export function getLoginReroute(user) {
    switch (user?.role) {
        case 'admin':
            return '/admin/dashboard';
        case 'registry':
            return routeRegistry(user);
        default:
            return '/';
    }
}
