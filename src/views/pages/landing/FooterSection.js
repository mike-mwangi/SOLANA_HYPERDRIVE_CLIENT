// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Container, Grid, IconButton, Link, Stack, Typography } from '@mui/material'; // Divider

// project import
import Chip from 'ui-component/extended/Chip';
import { frameworks } from './FrameworkSection';

import PublicIcon from '@mui/icons-material/Public';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

// Link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.text.hint,
    '&:hover': {
        color: theme.palette.primary.main
    },
    '&:active': {
        color: theme.palette.primary.main
    }
}));

// =============================|| LANDING - FOOTER SECTION ||============================= //

const FooterSection = () => {
    const theme = useTheme();
    const textColor = theme.palette.mode === 'dark' ? 'text.secondary' : 'text.hint';

    return (
        <>
            <Container sx={{ mb: 15 }}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={{ xs: 2, md: 5 }}>
                                    <Typography variant="h4" color={textColor} sx={{ fontWeight: 500 }}>
                                        About CML
                                    </Typography>
                                    <Typography variant="body2" color={textColor}>
                                        Carbon Markets Ledger (CML) is a platform that revolutionizes the carbon markets with
                                        state-of-the-art tokenization processes. Designed for seamless and transparent trading experiences,
                                        it bridges the gap between environmental responsibility and modern technology, ensuring a
                                        sustainable future.
                                    </Typography>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <Grid container spacing={{ xs: 5, md: 2 }}>
                                    <Grid item xs={6} sm={3}>
                                        <Stack spacing={{ xs: 3, md: 5 }}>
                                            <Typography variant="h4" color={textColor} sx={{ fontWeight: 500 }}>
                                                Resources
                                            </Typography>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                <FooterLink href="#" underline="none">
                                                    Blog
                                                </FooterLink>
                                                <FooterLink href="#" underline="none">
                                                    Whitepaper
                                                </FooterLink>
                                                <FooterLink href="/faqs" underline="none">
                                                    FAQ
                                                </FooterLink>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Stack spacing={{ xs: 3, md: 5 }}>
                                            <Typography variant="h4" color={textColor} sx={{ fontWeight: 500 }}>
                                                Community
                                            </Typography>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                <FooterLink href="#" underline="none">
                                                    Forum
                                                </FooterLink>
                                                <FooterLink href="#" underline="none">
                                                    Events
                                                </FooterLink>
                                                <FooterLink href="#" underline="none">
                                                    Partnerships
                                                </FooterLink>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Stack spacing={{ xs: 3, md: 5 }}>
                                            <Typography variant="h4" color={textColor} sx={{ fontWeight: 500 }}>
                                                Legal
                                            </Typography>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                <FooterLink href="#" underline="none">
                                                    Terms of Service
                                                </FooterLink>
                                                <FooterLink href="#" underline="none">
                                                    Privacy Policy
                                                </FooterLink>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Stack spacing={{ xs: 3, md: 5 }}>
                                            <Typography variant="h4" color={textColor} sx={{ fontWeight: 500 }}>
                                                Contact Us
                                            </Typography>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                <FooterLink href="mailto:carbonmarketsledger@gmail.com" underline="none">
                                                    Email
                                                </FooterLink>
                                                <FooterLink href="#" underline="none">
                                                    Support
                                                </FooterLink>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{ bgcolor: 'dark.dark', py: { xs: 3, sm: 1.5 } }}>
                <Container>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={{ xs: 1.5, sm: 1, md: 3 }}
                    >
                        <Typography color="text.secondary">© Carbon Markets Ledger</Typography>
                        <Stack direction="row" alignItems="center" spacing={{ xs: 3, sm: 1.5, md: 2 }}>
                            <IconButton size="small" component={Link} href="https://carbonmarketsledger.verst.earth/" target="_blank">
                                <PublicIcon sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }} />
                            </IconButton>
                            <IconButton size="small" component={Link} href="https://twitter.com/carbon_m_ledger" target="_blank">
                                <TwitterIcon sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }} />
                            </IconButton>
                            <IconButton
                                size="small"
                                component={Link}
                                href="https://youtu.be/s0UMiA5HSRs?si=sLWw0bu1AncN8zPh"
                                target="_blank"
                            >
                                <YouTubeIcon sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }} />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default FooterSection;
