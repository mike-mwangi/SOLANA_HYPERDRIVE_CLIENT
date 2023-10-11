import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectSummaryCard from 'ui-component/cards/ProjectSummaryCard';

import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

// project imports
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import useAuth from 'hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { getProject } from 'store/slices/project';
import Loader from 'ui-component/Loader';
import FinanceDetailsCard from 'ui-component/cards/FinanceDetailsCard';
import MainCard from 'ui-component/cards/MainCard';
import ProjectFilesCard from 'ui-component/cards/ProjectFilesCard';
import ProjectInfoCard from 'ui-component/cards/ProjectInfoCard';

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
                        <Grid item xs={12} sm={6} md={3}>
                            <ProjectInfoCard
                                primary={project?.location?.address}
                                secondary="Location"
                                iconPrimary={LocationOnOutlinedIcon}
                                bgcolor={theme.palette.orange.light}
                                isLoading={isLoading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <ProjectInfoCard
                                primary={`$ ${project?.targetRaise?.toLocaleString() || 'Not Available'}`}
                                secondary="Target Raise"
                                iconPrimary={RequestQuoteOutlinedIcon}
                                bgcolor={theme.palette.purple.light}
                                isLoading={isLoading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <ProjectInfoCard
                                primary={project?.thematicGroup}
                                secondary="Thematic Group"
                                iconPrimary={EngineeringOutlinedIcon}
                                bgcolor={theme.palette.primary.custom}
                                isLoading={isLoading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <ProjectInfoCard
                                primary={project?.dealType || 'Not Available'}
                                secondary="Deal Type"
                                iconPrimary={AccountBalanceOutlinedIcon}
                                bgcolor={theme.palette.orange.light}
                                isLoading={isLoading}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} lg={5} md={5}>
                    <Card sx={{ minWidth: 275, boxShadow: 2, mt: 3 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 18, mb: 2, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                Project Details
                            </Typography>
                            <ProjectSummaryCard project={project} />
                        </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275, boxShadow: 2, mt: 3 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 18, mb: 2, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                Finance Details
                            </Typography>
                            <FinanceDetailsCard project={project} />
                        </CardContent>
                    </Card>
                    {value !== 1 && (
                        <Card sx={{ minWidth: 275, boxShadow: 2, mt: 3 }}>
                            <CardContent>
                                <Typography variant="h4" color="inherit" sx={{ mb: 2 }}>
                                    Available files
                                </Typography>
                                <ProjectFilesCard project={project} />
                            </CardContent>
                        </Card>
                    )}
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ProjectView;
