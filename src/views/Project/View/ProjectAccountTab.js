import React, { useState } from 'react';

// material-ui
import { Grid, LinearProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import { useDispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { getProjectAccount } from 'store/slices/payment';
import MainCard from 'ui-component/cards/MainCard';
import RoundIconCard from 'ui-component/cards/RoundIconCard';
import TransactionHistory from './TransactionHistory';

// third party
// assets
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import TollIcon from '@mui/icons-material/Toll';
import HoverSocialCard from 'ui-component/cards/HoverSocialCard';
// ==============================|| WALLET ||============================== //
const Wallet = () => {
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(true);
    const dispatch = useDispatch();

    const { project } = useSelector((state) => state.project);
    const handleIconClick = () => {
        setIsVisible(!isVisible);
    };

    React.useEffect(() => {
        if (project) {
            // eslint-disable-next-line no-underscore-dangle
            dispatch(getProjectAccount(project?._id));
        }
    }, [dispatch, project]);

    const { account } = useSelector((state) => state.payment);
    const fiatBalance = account?.balance || 0;
    const totalCost = project?.bankabilityAssessment?.totalCost ?? 0;

    let accountContent = null;

    accountContent = (
        <>
            <Grid item xs={12} lg={4} sm={6}>
                <RoundIconCard
                    primary="FIAT BALANCE"
                    secondary={isVisible ? `USD ${fiatBalance}` : '*****'}
                    content={new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}
                    iconPrimary={RemoveRedEyeTwoToneIcon}
                    color="primary.main"
                    bgcolor="primary.light"
                    onIconClick={handleIconClick}
                />
            </Grid>
            <Grid item xs={12} lg={4} sm={6}>
                <RoundIconCard
                    primary="CRYPTO BALANCE"
                    secondary={isVisible ? '$0' : '*****'}
                    content={new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}
                    iconPrimary={RemoveRedEyeTwoToneIcon}
                    color="success.dark"
                    bgcolor="success.light"
                    onIconClick={handleIconClick}
                />
            </Grid>
            <Grid item xs={12} lg={4} md={12}>
                <RoundIconCard
                    primary="TOTAL BALANCE"
                    secondary={isVisible ? `USD ${fiatBalance}` : '*****'}
                    content={new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}
                    iconPrimary={RemoveRedEyeTwoToneIcon}
                    color="warning.dark"
                    bgcolor="warning.light"
                    onIconClick={handleIconClick}
                />
            </Grid>
        </>
    );

    return (
        <Grid container spacing={gridSpacing}>
            {accountContent}

            <Grid item xs={12}>
                <LinearProgress variant="determinate" value={100} color="secondary" />
            </Grid>

            <Grid item xs={12} lg={4} sm={12}>
                <HoverSocialCard primary="Total Issued Credits" secondary="0" iconPrimary={TollIcon} color={theme.palette.secondary.main} />
            </Grid>
            <Grid item xs={12} lg={4} sm={12}>
                <HoverSocialCard primary="Total Sold Credits" secondary="0" iconPrimary={TollIcon} color={theme.palette.info.main} />
            </Grid>
            <Grid item xs={12} lg={4} sm={12}>
                <HoverSocialCard primary="Total Available Credits" secondary="0" iconPrimary={TollIcon} color={theme.palette.dark.main} />
            </Grid>
        </Grid>
    );
};

export default Wallet;
