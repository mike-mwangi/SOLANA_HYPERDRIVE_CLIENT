/* eslint-disable no-underscore-dangle */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable consistent-return */
import { Button, Grid, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// project imports

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'store';
import { getProject, submitProject } from 'store/slices/project';
import Loader from 'ui-component/Loader';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ProjectDetailForm from './ProjectDetailForm';
import VerificationDetailsForm from './VerificationDetailsForm';
import IssuanceDetailsForm from './IssuanceDetailsForm';
import ContactsForm from './ContactsForm';
import AdditionalInformationForm from './AdditionalInformationForm';

const getStepContent = (step, handleNext, handleBack, setErrorIndex) => {
    switch (step) {
        case 0:
            return <ProjectDetailForm handleNext={handleNext} setErrorIndex={setErrorIndex} />;
        case 1:
            return <VerificationDetailsForm handleNext={handleNext} handleBack={handleBack} setErrorIndex={setErrorIndex} />;
        case 2:
            return <IssuanceDetailsForm handleNext={handleNext} handleBack={handleBack} setErrorIndex={setErrorIndex} />;
        case 3:
            return <ContactsForm handleNext={handleNext} handleBack={handleBack} setErrorIndex={setErrorIndex} />;
        case 4:
            return <AdditionalInformationForm handleNext={handleNext} handleBack={handleBack} setErrorIndex={setErrorIndex} />;
        default:
            throw new Error('Unknown step');
    }
};

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const onBoardingPage = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const project = useSelector((state) => state.project.project);
    const projectStatus = useSelector((state) => state.project.status);
    const error = useSelector((state) => state.project.error);
    const [steps, setSteps] = useState([
        'Project Information',
        'Verification Information',
        'Issuance Information',
        'Project Contacts',
        'Additional Information'
    ]);
    const [errorIndex, setErrorIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(project?.step);

    useEffect(() => {
        dispatch(getProject(id));
    }, [id]);

    useEffect(() => {
        if (loading && projectStatus === 'succeeded') {
            setLoading(false);
            setActiveStep(project.step);
        } else if (loading && projectStatus === 'failed') {
            toast.error(error);
            setLoading(false);
        }
    }, [projectStatus]);

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            // submit data to backend
            // TODO
            dispatch(submitProject(project?._id));
            setLoading(true);
        } else {
            setActiveStep(activeStep + 1);
            setErrorIndex(null);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    if (loading) return <Loader />;

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
                    <>
                        {activeStep === steps.length ? (
                            <>
                                <Typography variant="h5" gutterBottom textAlign="center">
                                    Thank you for registering with us.
                                </Typography>
                                <Typography variant="body1" textAlign="center">
                                    Your project {project?.name} has been received. We will review your project and get back to you as soon
                                    as possible.
                                </Typography>
                                <Stack direction="row" justifyContent="center" alignItems="center">
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                history('/projects/list');
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
                                {getStepContent(activeStep, handleNext, handleBack, setErrorIndex)}
                                {projectStatus === 'loading' && <Loader />}
                                {activeStep === steps.length - 1 && (
                                    <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                                        {activeStep !== 0 && (
                                            <Button disabled={projectStatus === 'loading'} onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                                Back
                                            </Button>
                                        )}
                                        <AnimateButton>
                                            <Button
                                                disabled={projectStatus === 'loading'}
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
