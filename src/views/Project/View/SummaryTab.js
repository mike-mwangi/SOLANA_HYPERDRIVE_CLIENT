/* eslint-disable no-underscore-dangle */
import { Button, Card, CardContent, CardMedia, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';

import { useTheme } from '@mui/system';
import DefaultProjectImage from 'assets/images/DefaultProjectImage.jpg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'store';
import Loader from 'ui-component/Loader';
import ProjectImages from './ProjectImages';

const getChip = (stage, theme, project = {}) => {
    switch (stage) {
        case 'draft':
            return (
                <Chip
                    size="small"
                    label="Draft"
                    width="100%"
                    sx={{
                        color: `white`,

                        bgcolor: theme.palette.orange.main,
                        ml: `auto`
                    }}
                />
            );
        case 'submitted':
            return (
                <Chip
                    size="small"
                    label="Waiting for approval"
                    sx={{
                        color: `white`,

                        bgcolor: theme.palette.purple.dark,
                        ml: `auto`
                    }}
                />
            );
        case 'correction':
            return (
                <Stack direction="column" spacing={1}>
                    <Chip
                        size="large"
                        label="Sent Back for Correction"
                        sx={{
                            color: `white`,

                            bgcolor: theme.palette.warning.dark,
                            ml: `auto`
                        }}
                    />
                    <Button variant="outlined" component={Link} to={`/projects/add/${project?._id}`}>
                        Edit Project
                    </Button>
                </Stack>
            );
        case 'approved':
            return (
                <Chip
                    size="small"
                    label="Approved"
                    sx={{
                        color: `white`,

                        bgcolor: theme.palette.success.main,
                        ml: `auto`
                    }}
                />
            );
        case 'rejected':
            return (
                <Chip
                    size="small"
                    label="Rejected"
                    sx={{
                        color: `white`,

                        bgcolor: theme.palette.error.main,
                        ml: `auto`
                    }}
                />
            );
        default:
            return <></>;
    }
};

const SummaryTab = () => {
    const theme = useTheme();
    const project = useSelector((state) => state.project.project);
    const dispatch = useDispatch();
    const gridSpacing = 3;
    const mediaSX = {
        width: '100%',
        borderRadius: '12px'
    };

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProject, setSelectedProject] = useState({ name: '', stage: '', score: '' });
    const { user } = useAuth();

    const getInvestorChip = (status, theme) => {
        if (status === 'approved') {
            return (
                <Chip
                    label="approved"
                    size="large"
                    sx={{
                        fontsize: '1.2rem',
                        bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : 'success.light',
                        color: 'success.dark'
                    }}
                />
            );
        }
        if (status === 'rejected') {
            return (
                <Chip
                    label="Rejected"
                    size="large"
                    sx={{
                        fontsize: '1.2rem',
                        bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : 'error.light',
                        color: 'error.dark'
                    }}
                />
            );
        }
        if (status === 'pending') {
            return (
                <Chip
                    label="Pending"
                    size="large"
                    sx={{
                        fontsize: '1.2rem',
                        bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : 'warning.light',
                        color: 'warning.dark'
                    }}
                />
            );
        }
        if (status === 'revoked') {
            return (
                <Chip
                    label="Revoked"
                    size="large"
                    sx={{
                        fontSize: '1.2rem',
                        bgcolor: theme.palette.error.dark,
                        color: 'primary.light'
                    }}
                />
            );
        }
        if (status === 'submitted') {
            return (
                <Chip
                    label="Submitted"
                    size="large"
                    sx={{
                        fontSize: '1.2rem',
                        bgcolor: theme.palette.orange.dark,
                        color: 'primary.light'
                    }}
                />
            );
        }
        return <></>;
    };
    return (
        <Stack spacing={gridSpacing}>
            {isLoading && <Loader />}
            <Card sx={{ boxShadow: 3 }}>
                <CardMedia>
                    <ProjectImages images={project?.images} />
                </CardMedia>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs zeroMinWidth>
                            <Typography align="left" variant="h3">
                                {project?.name}
                            </Typography>
                        </Grid>

                        <Grid item>{getChip(project?.stage, theme, project)}</Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Typography sx={{ mb: 2, fontWeight: 'bold' }} gutterBottom>
                        Project Description
                    </Typography>
                    <Typography>{project?.description}</Typography>
                    <Divider sx={{ my: 2 }} />
                </CardContent>
            </Card>
        </Stack>
    );
};

export default SummaryTab;
