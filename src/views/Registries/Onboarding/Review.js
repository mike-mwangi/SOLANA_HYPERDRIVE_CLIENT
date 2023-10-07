import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useSelector } from 'store';
import { FilePreview } from 'ui-component/FilePreview';

export default function Review() {
    const registry = useSelector((state) => state.registry.registry);
    const reviewFields = [
        { label: 'Registry Name', value: registry.name, type: 'text' },
        { label: 'Registry Type', value: registry.type, type: 'text' },
        { label: 'Registry Jurisdiction', value: registry.jurisdiction, type: 'text' },
        { label: 'Registry Logo', value: registry.logo, type: 'file' },
        { label: 'Contact Person Name', value: registry.contactName, type: 'text' },
        { label: 'Contact Person Email', value: registry.contactEmail, type: 'text' },
        { label: 'Certificate of Incorporation', value: registry.certificateOfIncorporation, type: 'file' },
        { label: 'Registry Address', value: registry.address, type: 'text' }
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
