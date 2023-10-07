// this will be a component that recieves a field , if the field is not empty then it passes to FileDownloaded , otherise It returns not upload

import { Typography } from '@mui/material';
import FileDownload from 'ui-component/FileDownload';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

export const FilePreview = ({ field, label }) => {
    if (field) {
        return <FileDownload field={field} />;
    }
    return (
        <Typography variant="h5" color="secondary">
            Not Uploaded
        </Typography>
    );
};
