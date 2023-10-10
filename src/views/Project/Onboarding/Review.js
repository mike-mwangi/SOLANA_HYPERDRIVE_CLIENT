import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useSelector } from 'store';
import { FilePreview } from 'ui-component/FilePreview';

export default function Review() {
    const project = useSelector((state) => state.project.project);
    const reviewFields = [
        [
            { label: 'Project Name', value: project.name, type: 'text' },
            { label: 'Project Type', value: project.type, type: 'text' },
            { label: 'Project Description', value: project.description, type: 'text' },
            { label: 'Project Location', value: project.location, type: 'text' },

            { label: 'Verification Standard', value: project.verificationStandard, type: 'text' },
            { label: 'Verification Status', value: project.verificationStatus, type: 'text' },
            { label: 'Verification Document', value: project.verificationDocument, type: 'file' },

            { label: 'Total Credits Issued', value: project.totalCreditsIssued, type: 'number' },
            { label: 'Credit Issuance Date', value: project.creditIssuanceDate, type: 'date' },

            { label: 'Project Developer', value: project.developer, type: 'text' },
            { label: 'Developer Email', value: project.email, type: 'text' },
            { label: 'Developer Phone Number', value: project.phoneNumber, type: 'text' },
            { label: 'Developer Address', value: project.address, type: 'text' },

            { label: 'Project Website', value: project.website, type: 'text' },
            { label: 'Project Images/Visuals', value: project.images, type: 'file' },
            { label: 'Additional Documents', value: project.additionalDocuments, type: 'file' },

            { label: 'Compliance Mechanism', value: project.complianceMechanism, type: 'text' },
            { label: 'Monitoring Plan', value: project.monitoringPlan, type: 'file' }
        ]
    ];
    const missingFields = reviewFields.filter((field) => !field.value);
    return (
        <Box>
            <Typography variant="h6">Review Your Carbon Asset Information:</Typography>
            <List>
                {reviewFields.map((field, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={field.label}
                            secondary={
                                field.type === 'file' ? (
                                    <FilePreview field={field.value} label={field.label} />
                                ) : (
                                    field.value || 'Not provided'
                                )
                            }
                        />
                    </ListItem>
                ))}
            </List>
            {missingFields.length > 0 && (
                <Typography variant="subtitle2" color="error">
                    Missing Information: {missingFields.map((field) => field.label).join(', ')}
                </Typography>
            )}
        </Box>
    );
}
