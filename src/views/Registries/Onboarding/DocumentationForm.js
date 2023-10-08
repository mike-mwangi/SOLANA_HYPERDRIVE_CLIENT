/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';

// material-ui
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
// import InputLabel,CloudUploadIcon, CardMedia, CircularProgress,
// registry imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// third-party
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'store';
import { patchRegistry } from 'store/slices/registry';
import FileDownload from 'ui-component/FileDownload';
import FileUpload from 'ui-component/FileUpload';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import * as yup from 'yup';
import { toast } from 'react-toastify';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

export default function DocumentationForm({ handleNext, handleBack, setErrorIndex }) {
    const dispatch = useDispatch();
    const registry = useSelector((state) => state.registry.registry);
    const registryStatus = useSelector((state) => state.registry.status);
    const registryError = useSelector((state) => state.registry.error);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (submitted) {
            if (registryStatus === 'succeeded') {
                setSubmitted(false);
                handleNext();
            } else if (registryStatus === 'failed') {
                setSubmitted(false);
                setErrorIndex(2);
                toast.error(registryError);
            }
        }
    }, [registryStatus]);

    const formik = useFormik({
        initialValues: {
            certificateOfIncorporation: []
        },
        onSubmit: (values) => {
            setSubmitted(true);
            dispatch(patchRegistry({ id: registry._id, data: { ...values, step: 3 } }));
        }
    });

    return (
        <>
            <Typography variant="h3" align="center" gutterBottom sx={{ mb: 2 }}>
                Registry Documents
            </Typography>
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 2 }}>
                Please fill in the details below
            </Typography>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InputLabel>Certificate of Incorporation</InputLabel>
                        <FileUpload
                            name="certificateOfIncorporation"
                            formik={formik}
                            acceptedFileTypes={['application/pdf']}
                            document={registry}
                        />
                        <FileDownload field={registry?.certificateOfIncorporation} label="Certificate of Incorporation" />
                    </Grid>

                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between">
                            <Button onClick={handleBack} sx={{ my: 3, ml: 1 }} size="large" variant="outlined">
                                Back
                            </Button>
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ my: 3, ml: 1 }}
                                    onClick={() => setErrorIndex(5)}
                                    size="large"
                                >
                                    Save and Continue
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
