// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Container, Grid, Typography } from '@mui/material';

// project imports
import AppBar from 'ui-component/extended/AppBar';
import MainCard from 'ui-component/cards/MainCard';
import Accordion from 'ui-component/extended/Accordion';
import { gridSpacing } from 'store/constant';

// assets
import mailImg from 'assets/images/landing/widget-mail.svg';
import headerBackground from 'assets/images/landing/bg-header.jpg';

const HeaderWrapper = styled('div')(({ theme }) => ({
    backgroundImage: `url(${headerBackground})`,
    backgroundSize: '100% 600px',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    textAlign: 'center',
    paddingTop: 30,
    [theme.breakpoints.down('md')]: {
        paddingTop: 0
    }
}));

const basicData = [
    {
        id: 'faq1',
        title: 'What is the Global Tokenization Framework?',
        content:
            'The Global Tokenization Framework is a blockchain-based unified platform designed to tokenize carbon credits, addressing the existing challenges in the carbon market and magnifying its global impact.'
    },
    {
        id: 'faq2',
        title: 'Why is there a need for a unified platform for carbon credits?',
        content:
            'The global carbon market currently suffers from fragmented registries, a lack of transparency, cumbersome verification and trading processes, and inconsistent data reporting standards. A unified platform seeks to address these challenges and create a truly global carbon market.'
    },
    {
        id: 'faq3',
        title: 'How does tokenization work in this context?',
        content:
            'Tokenization involves transforming carbon credits into digital tokens. Each token represents a specific amount of carbon reduction and has a clear ownership and transaction history, facilitating easy tracking and trading.'
    },
    {
        id: 'faq4',
        title: 'What role does blockchain play in this framework?',
        content:
            'Blockchain provides an immutable, transparent ledger for recording carbon credit transactions. This ensures that every transaction is traceable and irreversible, which increases transparency and trust in the carbon credits market.'
    },
    {
        id: 'faq5',
        title: 'What are smart contracts and how do they improve the system?',
        content:
            'Smart contracts are self-executing contracts with the terms of the agreement directly written into code. They automate the verification and transaction processes, eliminating manual errors, expediting processes, and ensuring compliance with established rules.'
    },
    {
        id: 'faq6',
        title: 'Who can benefit from using this platform?',
        content:
            'Carbon Credit Registries, Environmental Agencies, Governments, Businesses, Corporations, and Investors stand to gain from this platform. It simplifies the management, verification, and trading of carbon credits for all stakeholders.'
    },
    {
        id: 'faq7',
        title: 'How can I reach out for further questions or support?',
        content:
            'For any additional inquiries, you can email us directly at carbonmarketsledger@gmail.com or visit our "Contact Us" page on the platform.'
    }
];

// ============================|| SAAS PAGES - FAQs ||============================ //

const Faqs = () => {
    const theme = useTheme();

    return (
        <HeaderWrapper>
            <AppBar />
            <Container>
                <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item sm={10} md={7} sx={{ mt: { md: 12.5, xs: 2.5 }, mb: { md: 12.5, xs: 2.5 } }}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h1"
                                    color="white"
                                    component="div"
                                    sx={{
                                        fontSize: '3.5rem',
                                        fontWeight: 900,
                                        lineHeight: 1.4,
                                        [theme.breakpoints.down('md')]: { fontSize: '1.8125rem', marginTop: '80px' }
                                    }}
                                >
                                    Frequently Asked Questions
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h4"
                                    component="div"
                                    sx={{ fontWeight: 400, lineHeight: 1.4, [theme.breakpoints.up('md')]: { my: 0, mx: 12.5 } }}
                                    color="white"
                                >
                                    If you have any questions about Carbon Markets Ledger, find answers here or reach out to us.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <MainCard sx={{ textAlign: 'left' }} elevation={4} border={false} boxShadow shadow={4}>
                            <Accordion data={basicData} />
                        </MainCard>
                    </Grid>
                </Grid>
            </Container>
        </HeaderWrapper>
    );
};

export default Faqs;
