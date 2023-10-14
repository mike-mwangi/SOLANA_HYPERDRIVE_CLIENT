import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography, Stack, CardMedia } from '@mui/material';

// project imports
import FadeInWhenVisible from './Animation';
import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';

// assets
import Offer1 from 'assets/images/landing/offer/offer-1.png';
import Offer2 from 'assets/images/landing/offer/offer-2.png';
import Offer3 from 'assets/images/landing/offer/offer-3.png';
import Offer4 from 'assets/images/landing/offer/offer-4.png';
import Offer5 from 'assets/images/landing/offer/offer-5.png';
import Offer6 from 'assets/images/landing/offer/offer-6.png';
import GvtIcon from 'assets/images/landing/card-icons/icon-government.png';
import EnvIcon from 'assets/images/landing/card-icons/icon-environment.png';
import RegistryIcon from 'assets/images/landing/card-icons/icon-registry.png';
import BusinessIcon from 'assets/images/landing/card-icons/icon-business.png';
import InvestorIcon from 'assets/images/landing/card-icons/icon-investor.png';
import ServiceIcon from 'assets/images/landing/card-icons/icon-service.png';

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

const FeatureSection = () => (
    <Container>
        <Grid container spacing={7.5} justifyContent="center">
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                        <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                            Who We Serve
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                            Our platform is tailored to meet the unique needs of each of these entities. Here&apos;s a closer look:
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Carbon Credit Registries"
                            caption="Unified management for diverse registries. Whether you're in compliance or voluntary markets, seamlessly manage, verify, and trade carbon credits all in one place."
                            image={RegistryIcon}
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Environmental Agencies"
                            caption="Real-time monitoring made easy. Access transparent, verifiable carbon credit records to enforce environmental standards effortlessly."
                            image={EnvIcon}
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Governments"
                            caption="Strengthen emission initiatives. Oversee both compliance and voluntary markets, ensuring industries align with national eco-goals."
                            image={GvtIcon}
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Businesses and Corporations"
                            caption="Meet your green goals. Whether adhering to strict regulations or voluntarily pledging for a better future, acquire and trade carbon credits smoothly."
                            image={BusinessIcon}
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Investors"
                            caption="Invest with clarity. Channel your resources into genuine emission reduction projects in both compliance and voluntary markets."
                            image={InvestorIcon}
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Technology and Service Providers"
                            caption="Collaborate for a greener future. Integrate your tech solutions and be part of a revolutionary platform driving global sustainability."
                            image={ServiceIcon}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Container>
);

export default FeatureSection;
