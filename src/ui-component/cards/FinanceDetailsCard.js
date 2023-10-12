import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SubCard from './SubCard';
import FileDownload from 'ui-component/FileDownload';

const RegistryDetailsCard = ({ registry }) => {
    const theme = useTheme();
    return (
        <Grid container spacing={1}>
            <Grid item direction="column" spacing={1} xs={11} md={6}>
                <SubCard contentSX={{ transition: 'background-color 0.15s ease-out' }} sx={{ bgcolor: theme.palette.grey[100] }}>
                    <Typography variant="h4">Name</Typography>
                    <Typography variant="body1">{registry?.name}</Typography>
                </SubCard>
            </Grid>
            <Grid item direction="column" spacing={1} xs={11} md={6}>
                <SubCard contentSX={{ transition: 'background-color 0.15s ease-out' }} sx={{ bgcolor: theme.palette.grey[100] }}>
                    <Typography variant="h4">Type</Typography>
                    <Typography variant="body1">{registry?.type}</Typography>
                </SubCard>
            </Grid>
            <Grid item direction="column" spacing={1} xs={11} md={6}>
                <SubCard contentSX={{ transition: 'background-color 0.15s ease-out' }} sx={{ bgcolor: theme.palette.grey[100] }}>
                    <Typography variant="h4">Jurisdiction</Typography>
                    <Typography variant="body1">{registry?.jurisdiction}</Typography>
                </SubCard>
            </Grid>
            <Grid item direction="column" spacing={1} xs={11} md={6}>
                <SubCard contentSX={{ transition: 'background-color 0.15s ease-out' }} sx={{ bgcolor: theme.palette.grey[100] }}>
                    <Typography variant="h4">Contact Name</Typography>
                    <Typography variant="body1">{registry?.contactName}</Typography>
                </SubCard>
            </Grid>
            <Grid item direction="column" spacing={1} xs={11} md={6}>
                <SubCard contentSX={{ transition: 'background-color 0.15s ease-out' }} sx={{ bgcolor: theme.palette.grey[100] }}>
                    <Typography variant="h4">Contact Email</Typography>
                    <Typography variant="body1">{registry?.contactEmail}</Typography>
                </SubCard>
            </Grid>
            <Grid item direction="column" spacing={1} xs={11} md={6}>
                <SubCard contentSX={{ transition: 'background-color 0.15s ease-out' }} sx={{ bgcolor: theme.palette.grey[100] }}>
                    <FileDownload field={registry?.certificateOfIncorporation} label="Certificate of Incorporation" />
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default RegistryDetailsCard;
