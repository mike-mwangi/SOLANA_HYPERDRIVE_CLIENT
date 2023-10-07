/* eslint-disable no-underscore-dangle */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable consistent-return */
import { Button, Grid, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// registry imports

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'store';
import { getRegistry, submitRegistry } from 'store/slices/registry';
import Loader from 'ui-component/Loader';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ContactPersonForm from './ContactPersonForm';
import DocumentationForm from './DocumentationForm';
import RegistryDetailForm from './RegistryDetailForm';
import Review from './Review';

const getStepContent = (step, handleNext, handleBack, setErrorIndex) => {
    switch (step) {
        case 0:
            return <RegistryDetailForm handleNext={handleNext} setErrorIndex={setErrorIndex} />;
        case 1:
            return <ContactPersonForm handleNext={handleNext} handleBack={handleBack} setErrorIndex={setErrorIndex} />;
        case 2:
            return <DocumentationForm handleNext={handleNext} handleBack={handleBack} setErrorIndex={setErrorIndex} />;
        case 3:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
};

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const onBoardingPage = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const registry = useSelector((state) => state.registry.registry);
    const registryStatus = useSelector((state) => state.registry.status);
    const error = useSelector((state) => state.registry.error);
    const [steps, setSteps] = useState(['Registry Details', 'Contact Person Details', 'Documentation', 'Review']);
    const [errorIndex, setErrorIndex] = useState(null);
    // const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(registry?.step);

    useEffect(() => {
        dispatch(getRegistry(id));
    }, [id]);

    useEffect(() => {
        if (loading && registryStatus === 'succeeded') {
            setLoading(false);
            setActiveStep(registry.step);
        } else if (loading && registryStatus === 'failed') {
            toast.error(error);
            setLoading(false);
        }
    }, [registryStatus]);

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            // submit data to backend
            // TODO
            dispatch(submitRegistry(registry?._id));
            // setLoading(true);
        } else {
            setActiveStep(activeStep + 1);
            setErrorIndex(null);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    // if (loading) return <Loader />;

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <MainCard title="Registry Onboarding">
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
                    <>
                        {activeStep === steps.length ? (
                            <>
                                <Typography variant="h5" gutterBottom textAlign="center">
                                    Thank you for registering with us.
                                </Typography>
                                <Typography variant="body1" textAlign="center">
                                    Your registry {registry?.name} has been received. We will review your registry and get back to you as
                                    soon as possible.
                                </Typography>
                                <Stack direction="row" justifyContent="center" alignItems="center">
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                history('/registry/list');
                                            }}
                                            sx={{ my: 3, ml: 1 }}
                                        >
                                            Ok
                                        </Button>
                                    </AnimateButton>
                                </Stack>
                            </>
                        ) : (
                            <>
                                {getStepContent(registry, activeStep, handleNext, handleBack, setErrorIndex)}
                                {registryStatus === 'loading' && <Loader />}
                                {activeStep === steps.length - 1 && (
                                    <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                                        {activeStep !== 0 && (
                                            <Button disabled={registryStatus === 'loading'} onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                                Back
                                            </Button>
                                        )}
                                        <AnimateButton>
                                            <Button
                                                disabled={registryStatus === 'loading'}
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ my: 3, ml: 1 }}
                                            >
                                                {activeStep === steps.length - 1 ? 'Submit ' : 'Next'}
                                            </Button>
                                        </AnimateButton>
                                    </Stack>
                                )}
                            </>
                        )}
                    </>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default onBoardingPage;
