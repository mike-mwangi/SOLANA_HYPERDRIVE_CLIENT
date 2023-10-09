import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const RoleGuard = ({ children, role }) => {
    const { user, isLoggedIn } = useAuth();

    console.log('UU', user);
    const navigate = useNavigate();
    const defaultPaths = {
        admin: '/admin/dashboard',
        regsitry: '/registry/add',
        owner: '/owner/dashboard'
    };

    useEffect(() => {
        if (isLoggedIn && !role.includes(user?.role)) {
            navigate(defaultPaths[user?.role], { replace: true });
        }
    }, [user, isLoggedIn, navigate]);

    return children;
};

RoleGuard.propTypes = {
    children: PropTypes.node,
    role: PropTypes.arrayOf(PropTypes.string)
};

export default RoleGuard;
