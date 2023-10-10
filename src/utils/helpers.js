/* eslint-disable no-plusplus */
import ArticleIcon from '@mui/icons-material/Article';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export const formatDate = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleDateString();
};

export const getDayName = (utcDate) => {
    try {
        const date = new Date(utcDate);
        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return weekday[date.getUTCDay()];
    } catch (error) {
        console.log(error);
        return utcDate;
    }
};

export const formatDateTime = (utcDate) => {
    try {
        const date = new Date(utcDate);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const suffix = ['th', 'st', 'nd', 'rd'][((day % 100) - 20) % 10] || ['th', 'st', 'nd', 'rd'][((day % 100) - 100) % 10] || 'th';
        return `${day}${suffix} ${month} ${year}, ${time}`;
    } catch (error) {
        console.log(error);
        return utcDate;
    }
};

export const formatDateNoTime = (utcDate) => {
    try {
        const date = new Date(utcDate);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const suffix = ['th', 'st', 'nd', 'rd'][((day % 100) - 20) % 10] || ['th', 'st', 'nd', 'rd'][((day % 100) - 100) % 10] || 'th';
        return `${day}${suffix} ${month} ${year}`;
    } catch (error) {
        console.log(error);
        return utcDate;
    }
};

export const getNChars = (str, n) => {
    if (typeof str === 'string') {
        const result = str ? str.slice(0, n) : '';
        return str.length > n ? `${result}...` : result;
    }
    return str;
};

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const generateString = (length) => {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const getRoleName = (str) => {
    let result = '';
    switch (str) {
        case 'owner':
            result = `Project Owner`;
            break;
        case 'admin':
            result = `Administrator`;
            break;
        case 'technicalAssistant':
            result = `Technical Assistance Provider`;
            break;
        case 'investor':
            result = `Investor`;
            break;
        case 'submittingOrganization':
            result = `Submitting Organization`;
            break;
        default:
            result = str;
            break;
    }
    return result;
};

export const getMimeTypeIcon = (mimeType) => {
    let icon = <ArticleIcon />;
    switch (mimeType) {
        case 'text/directory':
            // folder
            icon = <FolderOutlinedIcon sx={{ mr: 3 }} />;
            break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            // word doc
            icon = <DescriptionOutlinedIcon sx={{ mr: 3 }} />;
            break;
        case 'application/pdf':
            // pdf doc
            icon = <PictureAsPdfIcon sx={{ mr: 3 }} />;
            break;
        default:
            break;
    }
    return icon;
};
