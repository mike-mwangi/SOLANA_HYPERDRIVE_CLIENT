/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';

// material-ui
import { Box, Grid, InputAdornment, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// project imports
import OwnerProjectCard from 'ui-component/cards/ProjectCard';
// import ProjectCard from 'ui-component/cards/OwnerProjectCard';
import useAuth from 'hooks/useAuth';
import { useDispatch, useSelector } from 'store';
import { appDrawerWidth } from 'store/constant';
import { getPublicProjects } from 'store/slices/project';
import EmptyListPage from 'ui-component/EmptyListPage';
import SkeletonProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';

// assets
import SearchIcon from '@mui/icons-material/Search';

// project list container
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter
    }),
    marginRight: -appDrawerWidth,
    [theme.breakpoints.down('xl')]: {
        paddingRight: 0,
        marginRight: 0
    },
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter
        }),
        marginRight: 0
    })
}));

// ==============================||  PROJECT GRID ||============================== //

const ProjectsList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { projects } = useSelector((state) => state.project);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
    const projectStatus = useSelector((state) => state.project.status);

    useEffect(() => {
        console.log('here');
        dispatch(getPublicProjects());
    }, []);

    // filter
    const initialState = {
        search: '',
        sort: 'low'
    };
    const [filter, setFilter] = useState(initialState);

    // search filter
    const handleSearch = async (event) => {
        const newString = event?.target.value;
    };

    let projectResult = <></>;
    if (projects && projectStatus?.length > 0) {
        projectResult = (
            <Grid container spacing={2}>
                {projects.map((project, index) => (
                    <Grid key={index} item xs={12} md={6}>
                        {project.stage === 'draft' ? (
                            <OwnerProjectCard project={project} link={`/projects/edit/${project._id}`} />
                        ) : (
                            <OwnerProjectCard project={project} link={`/projects/view/${project._id}`} />
                        )}
                    </Grid>
                ))}
            </Grid>
        );
    } else {
        projectResult = (
            <Grid item xs={12} sx={{ mt: 3 }}>
                <EmptyListPage
                    header="No Projects Found"
                    body={
                        user?.role === 'owner'
                            ? 'Welcome to the frontier of climate innovation. Currently, there are no projects listed here. Climate projects play a pivotal role in the global drive for sustainability, presenting unique investment opportunities that not only offer returns but also positively impact our environment.'
                            : 'Welcome to the frontier of climate innovation. Currently, there are no projects listed here. Climate projects play a pivotal role in the global drive for sustainability, presenting unique investment opportunities that not only offer returns but also positively impact our environment.'
                    }
                    {...(user?.role === 'owner' && {
                        callToAction: '✨ Add Your First Climate Project and Showcase to Investors!',
                        link: '/projects/add'
                    })}
                />
            </Grid>
        );
    }

    const spacingMD = matchDownMD ? 1 : 1.5;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack spacing={1}>
                    <Typography variant="h4">Projects Listed by Registries</Typography>
                    <Typography variant="caption">Projects on-boarded and approved by registries appear here</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', mt: 6 }}>
                        <strong>Please note:</strong>{' '}
                        <em>The onboarded projects listed here are fictional and intended for demonstration purposes only.</em>{' '}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={matchDownMD ? 0.5 : 2}>
                    <Grid item>
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={matchDownSM ? 0.5 : spacingMD}>
                            <TextField
                                sx={{ width: { xs: 140, md: 'auto' } }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    )
                                }}
                                value={filter.search}
                                placeholder="Search Projects"
                                size="small"
                                onChange={handleSearch}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Box sx={{ display: 'flex' }}>
                    <Main open={projectStatus === 'loading'}>
                        {projectStatus === 'loading' ? (
                            <Grid container spacing={2}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                    <Grid key={item} item xs={6} sm={6} md={6} lg={3}>
                                        <SkeletonProductPlaceholder />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            projectResult
                        )}
                    </Main>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ProjectsList;
