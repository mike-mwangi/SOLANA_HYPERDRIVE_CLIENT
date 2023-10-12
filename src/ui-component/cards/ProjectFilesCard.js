import { Grid, Typography } from '@mui/material';
import { Stack, useTheme } from '@mui/system';
import { useSelector } from 'store';
import FileDownload from 'ui-component/FileDownload';
import SubCard from './SubCard';

const ProjectFilesCard = () => {
    const theme = useTheme();
    const project = useSelector((state) => state.project.project);
    const reviewFields = [
        { label: 'Verification Document', value: project?.verificationDocument || '', type: 'file' },
        { label: 'Images', value: project?.images || '', type: 'file' },
        { label: 'Additional Documents', value: project?.additionalDocuments || '', type: 'file' }
    ];
    const fields = reviewFields.filter((field) => field.value);
    return (
        <Grid container spacing={1}>
            {fields.length === 0 && (
                <Grid item direction="column" spacing={1} xs={12}>
                    <SubCard contentSX={{ transition: 'background-color 0.15s ease-out' }} sx={{ bgcolor: theme.palette.grey[100] }}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h4">No files uploaded when onboarding the project</Typography>
                        </Stack>
                    </SubCard>
                </Grid>
            )}

            {fields.map((field, index) => (
                <Grid item direction="column" spacing={1} xs={12}>
                    <Stack direction="row" justifyContent="space-between">
                        <FileDownload field={field.value} label={field.label} />
                    </Stack>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProjectFilesCard;
