import { memo, useEffect, useState, useCallback } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography, useMediaQuery } from '@mui/material';

// project imports
import menuItem from 'menu-items';
import NavGroup from './NavGroup';
import LAYOUT_CONST from 'constant';
import { HORIZONTAL_MAX_ITEM } from 'config';
import useConfig from 'hooks/useConfig';
import useAuth from 'hooks/useAuth';
import { DashboardMenu } from 'menu-items/dashboard';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const handlerFilterMenuItems = (items, role) => {
    switch (role) {
        case 'admin':
            return items.filter((item) => item.id === 'admin');
        case 'registry':
            return items.filter((item) => item.id === 'originator');
        case 'proponent':
            return items.filter((item) => item.id === 'proponent');
        default:
            return items;
    }
};

const MenuList = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { layout } = useConfig();
    const { user } = useAuth();
    const [menuItems, setMenuItems] = useState([...menuItem.items]);
    const [isLoading, setIsLoading] = useState(true);

    const getDash = DashboardMenu();
    const handlerMenuItem = useCallback(() => {
        const isFound = menuItems.some((element) => element.id === 'dashboard');
        if (getDash?.id !== undefined && !isFound) {
            setMenuItems((prevItems) => [{ ...getDash }, ...prevItems]);
        }
    }, [getDash, menuItems]);

    useEffect(() => {
        handlerMenuItem();
    }, [handlerMenuItem]);

    useEffect(() => {
        const filteredMenuItems = handlerFilterMenuItems(menuItems, user?.role);
        setMenuItems(filteredMenuItems);
        setIsLoading(false);
    }, [user]);

    // last menu-item to show in horizontal menu bar
    const lastItem = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd ? HORIZONTAL_MAX_ITEM : null;

    let lastItemIndex = menuItem.items.length - 1;
    let remItems = [];
    let lastItemId;

    if (lastItem && lastItem < menuItem.items.length) {
        lastItemId = menuItem.items[lastItem - 1].id;
        lastItemIndex = lastItem - 1;
        remItems = menuItem.items.slice(lastItem - 1, menuItem.items.length).map((item) => ({
            title: item.title,
            elements: item.children
        }));
    }

    if (isLoading) {
        return (
            <Typography variant="h6" color="primary" align="center">
                Loading Menu Items
            </Typography>
        );
    }

    const navItems = menuItem.items.slice(0, lastItemIndex + 1).map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} lastItem={lastItem} remItems={remItems} lastItemId={lastItemId} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default memo(MenuList);
