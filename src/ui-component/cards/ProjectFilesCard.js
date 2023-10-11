import { Grid, Typography } from '@mui/material';
import { Stack, useTheme } from '@mui/system';
import useAuth from 'hooks/useAuth';
import FileDownload from 'ui-component/FileDownload';
import SubCard from './SubCard';

const ProjectFilesCard = ({ project }) => {
    const theme = useTheme();
    const reviewFields = [
        { label: 'Licenses and Permits', value: project?.thematicDetails?.licensesAndPermits || '', type: 'file' },
        { label: 'Environmental Impact Assessment', value: project?.thematicDetails?.environmentalImpactAssessment || '', type: 'file' },
        { label: 'Land Lease Agreements', value: project?.thematicDetails?.landLeaseAgreements || '', type: 'file' },
        { label: 'Technical Feasibility Report', value: project?.thematicDetails?.technicalFeasibilityReport || '', type: 'file' },
        { label: 'Company Registration Details', value: project?.companyRegistrationDetails || '', type: 'file' },
        { label: 'Company Pitch Deck', value: project?.companyPitchDeck || '', type: 'file' },
        { label: 'ESIA Report', value: project?.ESIAReport || '', type: 'file' },
        { label: 'Implementation Agreement', value: project?.implementationAgreement || '', type: 'file' },
        { label: 'Financial Feasibility Report', value: project?.financialFeasibilityReport || '', type: 'file' },
        { label: 'Project Financial Model', value: project?.projectFinancialModel || '', type: 'file' },
        { label: 'Audited Financials', value: project?.auditedFinancials || '', type: 'file' }
    ];
    const fields = reviewFields.filter((field) => field.value);
    const { user } = useAuth();
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
                    <SubCard contentSX={{ transition: 'background-color 0.15s ease-out' }} sx={{ bgcolor: theme.palette.grey[100] }}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h4">{field.label}</Typography>
                            {((user?.role !== 'investor' && user?.role !== 'technicalAssistant') ||
                                project?.requestStatus === 'approved') && <FileDownload field={field} label={field.label} />}
                        </Stack>
                    </SubCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProjectFilesCard;
