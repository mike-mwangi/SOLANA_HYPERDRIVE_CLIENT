/* eslint-disable import/no-extraneous-dependencies */
import DownloadIcon from '@mui/icons-material/Download';
import FolderOutlined from '@mui/icons-material/FolderOutlined';
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useConfig from 'hooks/useConfig';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'store';
import { getFile } from 'store/slices/file';
import Loader from './Loader';

const FileDownload = ({ field, label }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const fileStatus = useSelector((state) => state.file.status);
    const fileError = useSelector((state) => state.file.error);
    const handleDownload = async (key) => {
        dispatch(getFile(key));
    };

    useEffect(() => {
        if (fileStatus === 'failed') {
            toast.error(fileError);
        }
    }, [fileStatus]);

    if (!field) return null;
    return (
        <>
            {fileStatus === 'loading' && <Loader />}

            <List
                sx={{
                    width: '100%',
                    background: theme.palette.secondary.light,
                    borderRadius: '10px',
                    border: `1px solid ${theme.palette.secondary.main}`,
                    mt: 2
                }}
                component="nav"
                aria-labelledby="file-download-subheader"
            >
                <ListItem sx={{ height: 56 }}>
                    <ListItemIcon>
                        <FolderOutlined color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="h5" color="secondary">
                                {label}
                            </Typography>
                        }
                    />
                </ListItem>
                {Array.isArray(field) && field?.length > 0 ? (
                    field.map((file) => (
                        <ListItem
                            divider
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="download"
                                    onClick={() => {
                                        handleDownload(file.key);
                                    }}
                                >
                                    <DownloadIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={file.name} />
                        </ListItem>
                    ))
                ) : (
                    <ListItem
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label="download"
                                onClick={() => {
                                    handleDownload(field.key);
                                }}
                                sx={{ color: theme.palette.secondary.main }}
                            >
                                <DownloadIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={field.name} />
                    </ListItem>
                )}
            </List>
        </>
    );
};

export default FileDownload;
