// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, CardMedia, Container, Grid, Link, Stack, Typography } from '@mui/material';

// project import
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import { IconCircleCheck } from '@tabler/icons';
import LayersTwoToneIcon from '@mui/icons-material/LayersTwoTone';

import LayerLeft from 'assets/images/landing/questions-landing.svg';
import LayerRight from 'assets/images/landing/solutions_landing.svg';

// ==============================|| LANDING - CUSTOMIZE ||============================== //

const CustomizeSection = () => {
    const theme = useTheme();
    const listSX = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        padding: '10px 0',
        fontSize: '1rem',
        color: theme.palette.grey[900],
        svg: { color: theme.palette.secondary.main }
    };

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Grid container justifyContent="space-between" alignItems="center" spacing={{ xs: 1.5, sm: 2.5, md: 3, lg: 5 }}>
                <Grid item xs={12} md={6} sx={{ img: { width: '100%' } }}>
                    <Stack sx={{ width: '75%', mb: 5, mx: 'auto' }}>
                        <CardMedia component="img" image={LayerLeft} alt="Layer" />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2.5}>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2 }}>
                                The Fragmented Carbon Landscape
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color="text.primary"
                                sx={{
                                    fontSize: '1rem',
                                    zIndex: '99',
                                    width: { xs: '100%', sm: '100%', md: 'calc(100% - 20%)' }
                                }}
                            >
                                Amid escalating climate change concerns, the carbon market has emerged as a pivotal mechanism to incentivize
                                emission reductions. However, its efficacy is significantly stifled by:
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {[
                                {
                                    title: 'Fragmented Registries:',
                                    description:
                                        'A patchwork of global registries, each with varied standards, hinders a unified approach to the carbon market, making cross-border verification and trading a complex task.'
                                },
                                {
                                    title: 'Transparency Deficit:',
                                    description:
                                        'The absence of a consolidated and transparent database breeds suspicion, diminishing the inclination to participate in the carbon market.'
                                },
                                {
                                    title: 'Verification and Trading Bottlenecks:',
                                    description:
                                        "Relying on manual methods, the existing system is slow, error-prone, and struggles to keep up with the market's pace, delaying carbon credit trades and verifications."
                                },
                                {
                                    title: 'Inconsistent Data Reporting:',
                                    description:
                                        "The mosaic of data standards complicates verifications, putting the market's credibility and its impact on global emission reductions at risk."
                                }
                            ].map((item, idx) => (
                                <Typography key={idx} sx={listSX}>
                                    <Grid container alignItems="center">
                                        <Grid item xs={1}>
                                            <IconCircleCheck size={20} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <b>{item.title}</b>
                                        </Grid>
                                        <Grid item xs={7}>
                                            {item.description}
                                        </Grid>
                                    </Grid>
                                </Typography>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2.5}>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2 }}>
                                A Unified Tokenization Platform
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color="text.primary"
                                sx={{
                                    fontSize: '1rem',
                                    zIndex: '99',
                                    width: { xs: '100%', sm: '100%', md: 'calc(100% - 20%)' }
                                }}
                            >
                                A novel blockchain-based unified platform for tokenizing carbon credits, designed to amplify the carbon
                                market&apos;s impact on a global scale.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {[
                                {
                                    title: 'Tokenization:',
                                    description:
                                        'With robust Solana-based token standards, we transform carbon credits into traceable, unique digital tokens ensuring clear ownership and transaction history.'
                                },
                                {
                                    title: 'Blockchain Integration:',
                                    description:
                                        'Our platform guarantees every transaction is traceable and irreversible, instilling transparency and trust.'
                                },
                                {
                                    title: 'Smart Contracts:',
                                    description:
                                        'Automated verification and transactions through smart contracts enhance market efficiency and reduce errors.'
                                },
                                {
                                    title: 'Global Standardization:',
                                    description:
                                        'We introduce a universal standard for carbon credit tokenization, ensuring global consistency and ease of verification.'
                                }
                            ].map((item, idx) => (
                                <Typography key={idx} sx={listSX}>
                                    <Grid container alignItems="center">
                                        <Grid item xs={1}>
                                            <IconCircleCheck size={20} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <b>{item.title}</b>
                                        </Grid>
                                        <Grid item xs={7}>
                                            {item.description}
                                        </Grid>
                                    </Grid>
                                </Typography>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} sx={{ img: { width: '100%' } }}>
                    <Stack sx={{ width: '70%', mx: 'auto' }}>
                        <CardMedia component="img" image={LayerRight} alt="Layer" />
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CustomizeSection;
