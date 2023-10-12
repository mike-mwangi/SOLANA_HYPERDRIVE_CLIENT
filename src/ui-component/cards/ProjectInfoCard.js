import PropTypes from 'prop-types';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import { getNChars } from 'utils/helpers';
import { fontWeight } from '@mui/system';

// styles
const CardWrapper = styled(MainCard)(({ theme, bgcolor }) => ({
    backgroundColor: bgcolor || theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '30px',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const ProjectInfoCard = ({ primary, secondary, bgcolor, isLoading, iconPrimary }) => {
    const theme = useTheme();

    const IconPrimary = iconPrimary;
    const primaryIcon = IconPrimary ? <IconPrimary fontSize="inherit" /> : null;

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={false} content={false} bgcolor={bgcolor}>
                    <Box sx={{ p: 2 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.primary[800],
                                            color: '#fff'
                                        }}
                                    >
                                        {primaryIcon}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={
                                        <Typography variant="h5" sx={{ color: `${theme.palette.primary.main}`, fontWeight: 'bold' }} noWrap>
                                            {primary}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="caption" sx={{ color: `${theme.palette.primary.main}`, mt: 0.25 }} noWrap>
                                            {secondary}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

ProjectInfoCard.propTypes = {
    isLoading: PropTypes.bool,
    primary: PropTypes.string,
    secondary: PropTypes.string,
    bgcolor: PropTypes.string,
    iconPrimary: PropTypes.object
};

export default ProjectInfoCard;
