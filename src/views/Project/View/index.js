import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectSummaryCard from 'ui-component/cards/ProjectSummaryCard';
import Summary from './SummaryTab';

import { Box, Card, CardContent, Grid, Link, Tab, Tabs, Typography } from '@mui/material';

// project imports
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import { Stack } from '@mui/system';
import useAuth from 'hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { getProject } from 'store/slices/project';
import Loader from 'ui-component/Loader';
import RegistryDetailsCard from 'ui-component/cards/FinanceDetailsCard';
import MainCard from 'ui-component/cards/MainCard';
import ProjectFilesCard from 'ui-component/cards/ProjectFilesCard';
import ProjectInfoCard from 'ui-component/cards/ProjectInfoCard';
import ProjectAccount from './ProjectAccountTab';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`product-details-tabpanel-${index}`}
            aria-labelledby={`product-details-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `product-details-tab-${index}`,
        'aria-controls': `product-details-tabpanel-${index}`
    };
}

// ==============================|| DEFAULT VIEW DATA ROOM ||============================== //

const ProjectView = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { project } = useSelector((state) => state.project);
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [value, setValue] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getProject(id));
    }, [id]);

    useEffect(() => {
        if (project && isLoading) {
            setIsLoading(false);
        }
    }, [project]);

    const tabOptions = [
        {
            label: 'Summary',
            allowedRoles: ['registry', 'admin', 'submittingOrganization', 'investor', 'technicalAssistant'],
            content: (project, user) => <Summary user={user} />
        },
        {
            label: 'Project Account',
            allowedRoles: ['registry'],
            content: (project, user) => <ProjectAccount />
        }
    ];

    const filteredTabOptions = tabOptions.filter(
        (option) =>
            option.allowedRoles?.includes(user?.role) && (typeof option.condition === 'undefined' || option.condition(project, user))
    );

    if (isLoading) {
        return <Loader />;
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12} md={12}>
                    <Grid container spacing={gridSpacing} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <ProjectInfoCard
                                primary={project?.location}
                                secondary="Location"
                                iconPrimary={LocationOnOutlinedIcon}
                                bgcolor={theme.palette.orange.light}
                                isLoading={isLoading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <ProjectInfoCard
                                primary={`$ ${project?.totalCreditsIssued || 'Not Available'}`}
                                secondary="Total Carbon Credits To be Issued"
                                iconPrimary={RequestQuoteOutlinedIcon}
                                bgcolor={theme.palette.warning.light}
                                isLoading={isLoading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <ProjectInfoCard
                                primary={project?.type}
                                secondary="Project Type"
                                iconPrimary={EngineeringOutlinedIcon}
                                bgcolor={theme.palette.secondary[200]}
                                isLoading={isLoading}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} lg={12} md={12}>
                    <Stack spacing={gridSpacing}>
                        <Grid container justifyContent="center">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                indicatorColor="primary"
                                sx={{
                                    marginTop: 2.5,
                                    '& .MuiTabs-flexContainer': {
                                        borderBottom: '1.5px solid grey'
                                    },
                                    '& .MuiTabs-indicator': {
                                        // Styling the line under the selected tab
                                        backgroundColor: 'green',
                                        height: '3px',
                                        bottom: 7
                                    },
                                    '& a': {
                                        minHeight: 'auto',
                                        minWidth: 10,
                                        py: 1.5,
                                        px: 1,
                                        mr: 2.25,
                                        color: 'grey.700',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },
                                    '& a.Mui-selected': {
                                        color: 'primary.main'
                                    },
                                    '& a > svg': {
                                        marginBottom: '4px !important',
                                        mr: 1.25
                                    }
                                }}
                            >
                                {filteredTabOptions.map((option, index) => (
                                    <Tab
                                        key={index}
                                        component={Link}
                                        to="#"
                                        icon={option.icon}
                                        label={option.label}
                                        {...a11yProps(index)}
                                        disabled={isLoading}
                                    />
                                ))}
                            </Tabs>
                        </Grid>
                        {filteredTabOptions.map((option, index) => (
                            <TabPanel key={index} value={value} index={index}>
                                {option.content(project, user, {})}
                            </TabPanel>
                        ))}
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={12} lg={12} md={12}>
                    <Card sx={{ minWidth: 275, boxShadow: 2, mt: 3 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 18, mb: 2, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                Registry Details
                            </Typography>
                            <RegistryDetailsCard registry={project?.registry?.profile} />
                        </CardContent>
                    </Card>

                    <Card sx={{ minWidth: 275, boxShadow: 2, mt: 3 }}>
                        <CardContent>
                            <Typography variant="h4" color="inherit" sx={{ mb: 2 }}>
                                Available files
                            </Typography>
                            <ProjectFilesCard project={project} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ProjectView;
