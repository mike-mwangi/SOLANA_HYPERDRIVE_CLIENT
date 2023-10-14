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
import RegistryIcon from 'assets/images/landing/card-icons/icon-registry.png';

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
// =============================|| REGISTRY PAGE ||============================= //

const registriesData = [
    {
        title: 'Verified Carbon Standard (Verra VCS)',
        description: 'Provides a robust framework for the verification and validation of carbon offsets.',
        logo: RegistryIcon
    },
    {
        title: 'Gold Standard',
        description: 'A standard for creating high-quality emission reductions projects in the Clean Development Mechanism (CDM).',
        logo: RegistryIcon
    },
    {
        title: 'American Carbon Registry',
        description: 'A registry that standardizes carbon offset projects and ensures their quality and verification.',
        logo: RegistryIcon
    },
    {
        title: 'Climate Action Reserve',
        description: 'Ensures transparency, integrity, and financial value in the offset market.',
        logo: RegistryIcon
    },
    {
        title: 'Clean Development Mechanism (CDM)',
        description: 'A mechanism under the Kyoto Protocol that promotes clean development in developing countries.',
        logo: RegistryIcon
    },
    {
        title: 'Chicago Climate Exchange (CCX)',
        description: 'A platform for reducing and trading greenhouse gas emissions.',
        logo: RegistryIcon
    },
    {
        title: 'The Climate, Community & Biodiversity Standards (CCBS)',
        description: 'Aims to foster the co-benefits of carbon projects, including biodiversity conservation and community development.',
        logo: RegistryIcon
    },
    {
        title: 'Plan Vivo System',
        description:
            'Provides a framework for community-led land use projects in developing countries, offering sustainable land management and poverty alleviation.',
        logo: RegistryIcon
    },
    {
        title: 'The Voluntary Offset Standard (VOS)',
        description: 'A standard that provides a robust framework for the verification and validation of voluntary offset projects.',
        logo: RegistryIcon
    },
    {
        title: 'The Climate Registry',
        description:
            'A non-profit organization that sets consistent standards to calculate, verify, and publicly report greenhouse gas emissions.',
        logo: RegistryIcon
    },
    {
        title: 'Global Carbon Project',
        description: 'Provides regular analysis of carbon cycle dynamics and trends.',
        logo: RegistryIcon
    },
    {
        title: 'Global Atmosphere Watch',
        description: 'Monitors atmospheric composition from a climate perspective.',
        logo: RegistryIcon
    }
];

const RegistrySection = () => (
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
                            Global Carbon Markets Registries
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                            Explore an extensive collection of carbon markets registries from around the world, each dedicated to promoting
                            transparency, integrity, and environmental responsibility.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
                    {registriesData.map((registry, index) => (
                        <Grid item md={6} sm={12} key={index}>
                            <OfferCard title={registry.title} caption={registry.description} image={registry.logo} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    </Container>
);

export default RegistrySection;
