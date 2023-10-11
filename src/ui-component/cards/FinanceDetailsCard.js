import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SubCard from './SubCard';

const FinanceDetailsCard = ({ project }) => {
    const theme = useTheme();
    return (
        <Grid container spacing={1}>
            <Grid item direction="column" spacing={1} xs={11} md={6}>
                <SubCard contentSX={{ transition: 'background-color 0.15s ease-out' }} sx={{ bgcolor: theme.palette.grey[100] }}>
                    <Typography variant="h4">Deal Type</Typography>
                    <Typography variant="body1">{project?.dealType}</Typography>
                </SubCard>
            </Grid>
            <Grid item direction="column" spacing={1} xs={11} md={6}>
                <SubCard contentSX={{ transition: 'background-color 0.15s ease-out' }} sx={{ bgcolor: theme.palette.grey[100] }}>
                    <Typography variant="h4">Funding Type</Typography>
                    <Typography variant="body1">{project?.fundingType}</Typography>
                </SubCard>
            </Grid>
            <Grid item direction="column" spacing={1} xs={11} md={6}>
                <SubCard contentSX={{ transition: 'background-color 0.15s ease-out' }} sx={{ bgcolor: theme.palette.grey[100] }}>
                    <Typography variant="h4">Total Project Cost</Typography>
                    <Typography variant="body1">USD {project?.totalProjectCost?.toLocaleString()}</Typography>
                </SubCard>
            </Grid>
            <Grid item direction="column" spacing={1} xs={11} md={6}>
                <SubCard contentSX={{ transition: 'background-color 0.15s ease-out' }} sx={{ bgcolor: theme.palette.grey[100] }}>
                    <Typography variant="h4">Total Raise</Typography>
                    <Typography variant="body1">USD {project?.targetRaise?.toLocaleString()}</Typography>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default FinanceDetailsCard;
