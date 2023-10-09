// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconApps,
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc,
    IconClipboardList,
    IconTrees,
    IconHeartHandshake,
    IconDashboard,
    IconUsers,
    IconAlignBoxLeftMiddle,
    IconBoxMultiple,
    IconWallet,
    IconPremiumRights,
    IconCreditCard,
    IconFilePencil
} from '@tabler/icons';

// constant
const icons = {
    IconApps,
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc,
    IconClipboardList,
    IconTrees,
    IconHeartHandshake,
    IconDashboard,
    IconUsers,
    IconAlignBoxLeftMiddle,
    IconBoxMultiple,
    IconWallet,
    IconPremiumRights,
    IconCreditCard,
    IconFilePencil
};

// ==============================|| developer MENU ITEMS ||============================== //

const developer = {
    id: 'developer',
    title: <FormattedMessage id="developer" defaultMessage="Project developer" />,
    icon: icons.IconApps,
    type: 'group',
    children: [
        {
            id: 'developer_dashboard',
            title: <FormattedMessage id="Dashboard" defaultMessage="Dashboard" />,
            type: 'item',
            url: '/developer/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'developer_projects',
            title: <FormattedMessage id="Projects" defaultMessage="Projects" />,
            type: 'collapse',
            breadcrumbs: false,
            icon: icons.IconTrees,
            children: [
                {
                    id: 'onboarding',
                    title: <FormattedMessage id="Add Project" defaultMessage="Add Project" />,
                    type: 'item',
                    icon: icons.IconHeartHandshake,
                    url: '/developer/projects/add',
                    breadcrumbs: false,
                    external: true
                },
                {
                    id: 'project_list',
                    title: <FormattedMessage id="Projects List" defaultMessage="Projects List" />,
                    type: 'item',
                    url: '/developer/projects/list',
                    icon: icons.IconClipboardList,
                    breadcrumbs: false,
                    external: true
                }
            ]
        }
    ]
};

export default developer;
