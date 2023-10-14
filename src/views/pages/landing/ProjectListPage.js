// material-ui
import { useTheme, styled } from '@mui/material/styles';

// project imports
import AppBar from 'ui-component/extended/AppBar';
import HeaderSection from './HeaderSection';
import CardSection from './CardSection';
import FeatureSection from './FeatureSection';
import FrameworkSection from './FrameworkSection';
import ArchitectureSection from './ArchitectureSection';
import FooterSection from './FooterSection';
import CustomizeSection from './CustomizeSection';
import StartupProjectSection from './StartupProjectSection';
import ProjectsList from './projectList';
// import IncludeSection from './IncludeSection';
// import RtlInfoSection from './RtlInfoSection';

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
            {/* 1. header and hero section */}
            <HeaderWrapper id="home">
                <AppBar />
            </HeaderWrapper>
            <SectionWrapper sx={{ pr: 2, pl: 2, ml: 2, mr: 2 }}>
                <ProjectsList />
            </SectionWrapper>

            {/* 10. footer section */}
            <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'dark.900', pb: 0 }}>
                <FooterSection />
            </SectionWrapper>
        </>
    );
};

export default Landing;
