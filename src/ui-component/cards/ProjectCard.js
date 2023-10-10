/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Box, Button, CardMedia, Divider, Grid, Stack, Typography } from '@mui/material';

// project import
import SkeletonProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';
import Chip from 'ui-component/extended/Chip';
import MainCard from './MainCard';

// assets
import EastIcon from '@mui/icons-material/East';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useTheme } from '@mui/material/styles';
import { getNChars } from 'utils/helpers';
import SubCard from './ProjectSubCard';
import { styled } from '@mui/styles';
import useAuth from 'hooks/useAuth';
import DefaultProjectImage from 'assets/images/DefaultProjectImage.jpg';

// ==============================|| PROJECT CARD ||============================== //
// Define colors

const ProjectCard = ({ project, link }) => {
    const [isLoading, setLoading] = useState(true);
    const { user } = useAuth();
    const theme = useTheme();
    const Wrapper = styled(Button)({
        padding: 8,
        background: 'rgba(14, 118, 168, 0.12)',
        '& svg': {
            color: '#0E76A8'
        },
        '&:hover': {
            background: 'rgba(14, 118, 168, 0.12)',
            '& svg': {
                color: '#fff'
            }
        }
    });
    const MainWrapper = styled(Button)({
        padding: 8,
        background: theme.palette.purple.light,
        '& svg': {
            color: '#0E76A8'
        },
        '&:hover': {
            background: theme.palette.purple.light,
            '& svg': {
                color: '#fff'
            }
        }
    });
    useEffect(() => {
        setLoading(false);
    }, []);

    const getStageChip = (stage) => {
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
                    <Chip
                        size="large"
                        label="Sent Back for Correction"
                        sx={{
                            color: `white`,

                            bgcolor: theme.palette.warning.dark,
                            ml: `auto`
                        }}
                    />
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

    return (
        <>
            {isLoading ? (
                <SkeletonProductPlaceholder />
            ) : (
                <SubCard>
                    <Grid container spacing={1} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            <MainCard
                                content={false}
                                boxShadow
                                sx={{
                                    '&:hover': {
                                        transform: 'scale3d(1.02, 1.02, 1)',
                                        transition: 'all .4s ease-in-out'
                                    }
                                }}
                            >
                                <CardMedia
                                    sx={{ height: 300 }}
                                    image={DefaultProjectImage || project?.images?.[0]?.url}
                                    title={project.name}
                                    component={Link}
                                    to={link}
                                />
                            </MainCard>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-end"
                                sx={{
                                    position: 'relative',
                                    zIndex: 1,
                                    bottom: '20px'
                                }}
                            >
                                <Stack>
                                    <Chip
                                        size="small"
                                        label="Stage"
                                        color="success"
                                        sx={{
                                            color: `white`,
                                            width: '60px',
                                            ml: `auto`,
                                            mb: '-10px',
                                            zIndex: 2,
                                            backgroundColor: theme.palette.secondary.main
                                        }}
                                    />
                                    <Chip
                                        label={project?.thematicDetails?.projectStage ?? `NA`}
                                        sx={{
                                            borderTopRightRadius: 0,
                                            backgroundColor: 'white',
                                            border: `1px solid ${theme.palette.secondary.main}`,
                                            zIndex: 1
                                        }}
                                        color="success"
                                    />
                                </Stack>
                            </Stack>

                            {user?.role === 'owner' && (
                                <Stack direction="column" alignItems="center" justifyContent="center">
                                    {getStageChip(project?.stage)}
                                </Stack>
                            )}
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Stack direction="row" sx={{ mb: 1 }} spacing={2} alignItems="start">
                                        <Stack spacing={1}>
                                            <Typography variant="h3" sx={{ ml: 0.8 }}>
                                                {project.name}
                                            </Typography>
                                            <Stack direction="row">
                                                <LocationOnOutlinedIcon sx={{ color: theme.palette.grey[500] }} />
                                                <Typography variant="body2">
                                                    {project?.location?.address && getNChars(project?.location?.address, 30)}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Box sx={{ flexGrow: 1 }} />
                                        <Grid item>
                                            <Button component={Link} to={link} size="small" variant="contained">
                                                View More
                                                <EastIcon sx={{ ml: 1 }} />
                                            </Button>
                                        </Grid>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <Wrapper fullWidth>
                                                <Stack direction="column">
                                                    <Typography variant="h5" align="center" noWrap>
                                                        ${project?.totalProjectCost ?? `NA`}
                                                    </Typography>
                                                    <Typography variant="caption" align="center" noWrap>
                                                        Deal Size
                                                    </Typography>
                                                </Stack>
                                            </Wrapper>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Wrapper fullWidth>
                                                <Stack direction="column">
                                                    <Typography variant="h5" align="center">
                                                        {project?.dealType ?? `NA`}
                                                    </Typography>
                                                    <Typography variant="caption" align="center" noWrap>
                                                        Deal Type
                                                    </Typography>
                                                </Stack>
                                            </Wrapper>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Wrapper fullWidth>
                                                <Stack direction="column">
                                                    <Typography variant="h5" align="center">
                                                        {project?.fundingType ?? `NA`}
                                                    </Typography>
                                                    <Typography variant="caption" align="center">
                                                        {project?.dealType ? `${project?.dealType} type` : 'NA'}
                                                    </Typography>
                                                </Stack>
                                            </Wrapper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <MainWrapper fullWidth>
                                        <Stack direction="column">
                                            <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
                                                {project?.thematicGroup ?? `NA`}
                                            </Typography>
                                            <Typography variant="body1" align="center">
                                                Thematic Area
                                            </Typography>
                                        </Stack>
                                    </MainWrapper>
                                </Grid>
                                {/* <Grid item xs={12}>
                            <Stack
                                direction="row"
                                divider={<Divider orientation="vertical" flexItem sx={{ color: theme.palette.grey[500] }} />}
                                spacing={2}
                                justifyContent="space-between"
                                sx={{
                                    background: theme.palette.grey[300],
                                    borderRadius: 10,
                                    pr: 1.5,
                                    pl: 1.5,
                                    pt: 1,
                                    pb: 1
                                }}
                            >
                                <Stack direction="column">
                                    <Typography variant="h5" align="center" noWrap>
                                        ${project?.totalProjectCost ?? `NA`}
                                    </Typography>
                                    <Typography variant="h5" align="center" noWrap>
                                        Deal Size
                                    </Typography>
                                </Stack>
                                <Stack direction="column">
                                    <Typography variant="h5" align="center">
                                        {project?.fundingType ?? `NA`}
                                    </Typography>
                                    <Typography variant="caption" align="center" noWrap>
                                        Financing Type
                                    </Typography>
                                </Stack>
                                <Stack direction="column">
                                    <Typography variant="h5" align="center">
                                        {project?.thematicGroup ?? `NA`}
                                    </Typography>
                                    <Typography variant="caption" align="center">
                                        Sector
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid> */}
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            overflow: 'hidden',
                                            height: 45
                                        }}
                                    >
                                        {getNChars(project?.description, 50)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            )}
        </>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.object
};

export default ProjectCard;
