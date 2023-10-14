// material-ui
import { useTheme, styled } from '@mui/material/styles';

// project imports
import AppBar from 'ui-component/extended/AppBar';
import RegistrySection from './RegistrySection';

// custom stlye
const HeaderWrapper = styled('div')(({ theme }) => ({
    overflowX: 'hidden',
    overflowY: 'clip',
    background:
        theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : `linear-gradient(360deg, ${theme.palette.grey[100]} 1.09%, ${theme.palette.background.paper} 100%)`,
    [theme.breakpoints.down('md')]: {}
}));

const SectionWrapper = styled('div')({
    paddingTop: 100,
    paddingBottom: 100
});

// =============================|| LANDING MAIN ||============================= //

const Landing = () => {
    const theme = useTheme();

    return (
        <>
            {/* 1. header section */}
            <HeaderWrapper id="home">
                <AppBar />
            </HeaderWrapper>

            {/* 2. Registry section */}
            <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
                <RegistrySection />
            </SectionWrapper>
        </>
    );
};

export default Landing;
