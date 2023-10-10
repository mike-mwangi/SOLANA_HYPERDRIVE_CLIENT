/* eslint-disable no-underscore-dangle */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable consistent-return */
import React from 'react';

// material-ui
import { Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';

// project imports

import { useDispatch } from 'store';
import MainCard from 'ui-component/cards/MainCard';
import ProjectDetailForm from './ProjectDetailForm';

const getStepContent = (handleNext, handleBack, setErrorIndex) => (
    <ProjectDetailForm handleNext={handleNext} handleBack={handleBack} setErrorIndex={setErrorIndex} />
);

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const onBoardingPage = () => {
    const dispatch = useDispatch();
    const [steps, setSteps] = React.useState([
        'Project Information',
        'Verification Information',
        'Issuance Information',
        'Project Contacts',
        'Additional Information',
        'Control and Compliance'
    ]);
    const [activeStep, setActiveStep] = React.useState(0);
    const [errorIndex, setErrorIndex] = React.useState(null);

    const handleNext = async () => {
        setErrorIndex(null);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <MainCard title="Project Onboarding">
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label, index) => {
                            const labelProps = {};

                            if (index === errorIndex) {
                                labelProps.optional = (
                                    <Typography variant="caption" color="error">
                                        Error
                                    </Typography>
                                );

                                labelProps.error = true;
                            }

                            return (
                                <Step key={label}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <>{getStepContent(activeStep, handleNext, handleBack, setErrorIndex)}</>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default onBoardingPage;
