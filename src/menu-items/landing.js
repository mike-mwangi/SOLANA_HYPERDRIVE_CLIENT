// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconKey, IconReceipt2, IconBug, IconBellRinging, IconPhoneCall, IconQuestionMark, IconShieldLock } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconReceipt2,
    IconBug,
    IconBellRinging,
    IconPhoneCall,
    IconQuestionMark,
    IconShieldLock
};

// ==============================|| LANDING PAGE MENU ITEMS ||============================== //

const landing = {
    id: 'landing',
    title: <FormattedMessage id="landing" />,
    caption: <FormattedMessage id="landing-caption" />,
    icon: icons.IconKey,
    type: 'group',
    children: [
        {
            id: 'landing',
            title: <FormattedMessage id="landing" />,
            type: 'item',
            icon: icons.IconBellRinging,
            url: '/landing/landing',
            target: true
        },
        {
            id: 'contact-us',
            title: <FormattedMessage id="contact-us" />,
            type: 'item',
            icon: icons.IconPhoneCall,
            url: '/landing/contact-us',
            target: true
        },
        {
            id: 'faqs',
            title: <FormattedMessage id="faqs" />,
            type: 'item',
            icon: icons.IconQuestionMark,
            url: '/landing/faqs',
            target: true
        },
        {
            id: 'privacy-policy',
            title: <FormattedMessage id="privacy-policy" />,
            type: 'item',
            icon: icons.IconShieldLock,
            url: '/landing/privacy-policy',
            target: true
        }
    ]
};

export default landing;
