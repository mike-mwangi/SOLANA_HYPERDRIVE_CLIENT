/* eslint-disable react/no-unescaped-entities */
/* eslint-disable arrow-body-style */
/* eslint-disable no-nested-ternary */
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Avatar, Card, CardContent, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Stack } from '@mui/system';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';

import { Cancel } from '@mui/icons-material';
import FolderIcon from '@mui/icons-material/Folder';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ document, formik, acceptedFileTypes, name, multiple = false, maxFileSize = 5000000, maxFiles = 1 }) => {
    const theme = useTheme();
    const baseStyle = {
        padding: '20px',
        borderWidth: 2,
        borderColor: theme.palette.grey[700],
        borderStyle: 'dashed',
        backgroundColor: theme.palette.grey[50],
        transition: 'border .24s ease-in-out'
    };

    const focusedStyle = {
        borderColor: theme.palette.primary.main
    };

    const acceptStyle = {
        borderColor: theme.palette.success.main
    };

    const rejectStyle = {
        borderColor: theme.palette.error.main
    };

    const onDrop = useCallback((acceptedFiles) => {
        formik.setFieldValue(name, acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, acceptedFiles, fileRejections, isFocused, isDragAccept, isDragReject, isDragActive } = useDropzone(
        {
            onDrop,
            accept: acceptedFileTypes,
            multiple,
            maxFiles,
            maxSize: maxFileSize
        }
    );

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }),
        [isFocused, isDragAccept, isDragReject]
    );

    const acceptedFileItems = acceptedFiles.map((file) => (
        <ListItem key={file.path}>
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${file.path} - ${file.size} bytes`} />
        </ListItem>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <ListItem key={file.path}>
            <ListItemAvatar>
                <Avatar>
                    <Cancel />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${file.path} - ${file.size} bytes`} secondary={errors.map((e) => e.message)} />
        </ListItem>
    ));

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <CardContent>
                        <Stack spacing={2} alignItems="center">
                            <CloudUploadIcon sx={{ fontSize: 30 }} />
                            {isDragActive ? (
                                <Typography variant="h6" textAlign="center">
                                    Drop the files here ...
                                </Typography>
                            ) : (
                                <>
                                    {document && document[name] && (
                                        <Typography variant="error" textAlign="center">
                                            Kindly note that you have already uploaded a file. If you upload a new file, the previous file
                                            will be replaced.
                                        </Typography>
                                    )}
                                    <Typography variant="h6" textAlign="center">
                                        Drag drop some files here, or click to select files
                                    </Typography>
                                    <Typography variant="caption" textAlign="center">
                                        A maximum of {maxFiles} files can be uploaded. The maximum file size is {maxFileSize / 1000000} MB.
                                    </Typography>
                                </>
                            )}
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
            {acceptedFiles.length > 0 && (
                <Grid item xs={12}>
                    <Typography variant="h5">Accepted Files</Typography>
                    <List dense>{acceptedFileItems}</List>
                </Grid>
            )}
            {fileRejections.length > 0 && (
                <Grid item xs={12}>
                    <Typography variant="h5">Rejected Files</Typography>
                    <List dense>{fileRejectionItems}</List>
                </Grid>
            )}
        </Grid>
    );
};

FileUpload.propTypes = {
    formik: PropTypes.object,
    label: PropTypes.string,
    acceptedFileTypes: PropTypes.object,
    name: PropTypes.string,
    maxFileSize: PropTypes.number
};

export default FileUpload;
