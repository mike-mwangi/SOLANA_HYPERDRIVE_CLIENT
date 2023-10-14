import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography, Stack, CardMedia } from '@mui/material';

// project imports
import FadeInWhenVisible from './Animation';
import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';

// assets
import Offer2 from 'assets/images/landing/offer/offer-2.png';
import SolanaLogo from 'assets/images/logos/sol-logo.png';
import AWSLogo from 'assets/images/logos/aws-logo.png';
import CML_LOGO from 'assets/images/logos/cml-logo.png';

const OfferCard = ({ title, caption, image }) => {
    const theme = useTheme();
    const AvaterSx = { background: 'transparent', color: theme.palette.secondary.main, width: 56, height: 56 };
    return (
        <FadeInWhenVisible>
            <SubCard
                sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.100',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.divider,
                    '&:hover': { boxShadow: 'none' },
                    height: '100%'
                }}
            >
                <Stack spacing={4}>
                    <Avatar variant="rounded" sx={AvaterSx}>
                        <CardMedia component="img" src={image} alt="Beautiful User Interface" />
                    </Avatar>
                    <Stack spacing={2}>
                        <Typography variant="h3" sx={{ fontWeight: 500 }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                            {caption}
                        </Typography>
                    </Stack>
                </Stack>
            </SubCard>
        </FadeInWhenVisible>
    );
};

OfferCard.propTypes = {
    title: PropTypes.string,
    caption: PropTypes.string,
    image: PropTypes.string
};
// =============================|| LANDING - FEATURE PAGE ||============================= //

const ArchitectureSection = () => (
    <Container>
        <Grid container spacing={7.5} justifyContent="center">
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                        <CardMedia
                            component="img"
                            src={CML_LOGO}
                            alt="Carbon Markets Ledger Logo"
                            sx={{ width: 200, height: 'auto', margin: '0 auto' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                            Carbon Markets Ledger Architecture
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                            Discover how our platform utilizes the cutting-edge technologies of Solana and AWS to deliver unparalleled
                            functionality and robustness.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
                    <Grid item md={6} sm={12}>
                        <OfferCard
                            title="Solana Integration"
                            caption="Leveraging Solana's high-performance blockchain, our platform ensures real-time recording of project data through smart contracts. Additionally, our solution offers seamless tokenization capabilities, enabling registries to issue tokenized Carbon Credits (CCs) efficiently."
                            image={SolanaLogo}
                        />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <OfferCard
                            title="Data Persistence with AWS"
                            caption="With AWS integration, our platform guarantees reliable and persistent data storage. All project data and transactions are securely backed, ensuring the durability and accessibility of your information at all times."
                            image={AWSLogo}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Container>
);

export default ArchitectureSection;
