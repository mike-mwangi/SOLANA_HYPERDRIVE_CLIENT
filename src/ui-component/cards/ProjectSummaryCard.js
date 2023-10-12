// material-ui
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports

// assets
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import useAuth from 'hooks/useAuth';

// ===========================|| WIDGET STATISTICS - ICON GRID CARD ||=========================== //

const ProjectSummaryCard = ({ project }) => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

    const blockSX = {
        p: 2.5
    };

    return (
        <Grid container alignItems="center" spacing={0}>
            <Grid item xs={12} sm={6} sx={blockSX}>
                <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'start'}>
                    <Grid item>
                        <LibraryBooksOutlinedIcon sx={{ color: theme.palette.secondary.main }} fontSize="large" />
                    </Grid>
                    <Grid item sx={{ maxWidth: '60%' }}>
                        <Typography variant="h5" align="start">
                            Project Stage
                        </Typography>
                        <Typography variant="subtitle2" align="start">
                            {project?.thematicDetails?.projectStage}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} sx={blockSX}>
                <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'start'}>
                    <Grid item>
                        <CalendarMonthOutlinedIcon sx={{ color: theme.palette.secondary.main }} fontSize="large" />
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" align="start">
                            Project Start Date
                        </Typography>
                        <Typography variant="subtitle2" align="start">
                            {`${new Date(project?.startDate).getUTCFullYear()}-${String(
                                new Date('2023-08-16T00:00:00.000Z').getUTCMonth() + 1
                            ).padStart(2, '0')}-${String(new Date('2023-08-16T00:00:00.000Z').getUTCDate()).padStart(2, '0')}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} sx={blockSX}>
                <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'start'}>
                    <Grid item>
                        <CalendarMonthOutlinedIcon sx={{ color: theme.palette.secondary.main }} fontSize="large" />
                    </Grid>
                    <Grid item sx={{ maxWidth: '60%' }}>
                        <Typography variant="h5" align="start">
                            Project End Date
                        </Typography>
                        <Typography variant="subtitle2" align="start">
                            {`${new Date(project?.endDate).getUTCFullYear()}-${String(
                                new Date('2023-08-16T00:00:00.000Z').getUTCMonth() + 1
                            ).padStart(2, '0')}-${String(new Date('2023-08-16T00:00:00.000Z').getUTCDate()).padStart(2, '0')}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProjectSummaryCard;
