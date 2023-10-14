import { memo, useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography, useMediaQuery } from '@mui/material';

// project imports
import menuItem from 'menu-items';
import NavGroup from './NavGroup';
import useConfig from 'hooks/useConfig';
import useAuth from 'hooks/useAuth';
import { DashboardMenu } from 'menu-items/dashboard';

import LAYOUT_CONST from 'constant';
import { HORIZONTAL_MAX_ITEM } from 'config';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const theme = useTheme();
    const { layout } = useConfig();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { user } = useAuth();
    const [menuItems, setMenuItems] = useState([...menuItem.items]);
    const [isLoading, setIsLoading] = useState(true);

    const getDash = DashboardMenu();
    const handlerMenuItem = () => {
        const isFound = menuItems.some((element) => {
            if (element.id === 'dashboard') {
                return true;
            }
            return false;
        });

        if (getDash?.id !== undefined && !isFound) {
            setMenuItems([{ ...getDash }, ...menuItems]);
        }
    };

    useEffect(() => {
        handlerMenuItem();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        let filteredMenuItems = [...menuItems];
        switch (user?.role) {
            case 'admin':
                filteredMenuItems = filteredMenuItems.filter((item) => item.id === 'admin');
                break;
            case 'registry':
                filteredMenuItems = filteredMenuItems.filter((item) => item.id === 'registry');
                break;
            case 'developer':
                filteredMenuItems = filteredMenuItems.filter((item) => item.id === 'developer');
                break;
            default:
                break;
        }
        setMenuItems(filteredMenuItems);
        setIsLoading(false);
    }, [user]);

    // last menu-item to show in horizontal menu bar
    const lastItem = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd ? HORIZONTAL_MAX_ITEM : null;

    let lastItemIndex = menuItems.length - 1;
    let remItems = [];
    let lastItemId;

    if (lastItem && lastItem < menuItems.length) {
        lastItemId = menuItems[lastItem - 1].id;
        lastItemIndex = lastItem - 1;
        remItems = menuItems.slice(lastItem - 1, menuItems.length).map((item) => ({
            title: item.title,
            elements: item.children
        }));
    }

    if (isLoading) {
        return <Typography>Loading menu items...</Typography>;
    }

    const navItems = menuItems.slice(0, lastItemIndex + 1).map((item) => {
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
