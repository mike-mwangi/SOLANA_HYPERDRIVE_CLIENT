/* eslint-disable no-underscore-dangle */

// material-ui
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
// import InputLabel,CloudUploadIcon, CardMedia, CircularProgress,
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// third-party
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'store';
import { patchRegistry } from 'store/slices/registry';
import InputLabel from 'ui-component/extended/Form/InputLabel';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

export default function ContactPersonForm({ handleNext, handleBack, setErrorIndex }) {
    const dispatch = useDispatch();
    const project = useSelector((state) => state.project.project);
    const projectStatus = useSelector((state) => state.project.status);
    const projectError = useSelector((state) => state.project.error);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (submitted) {
            if (projectStatus === 'succeeded') {
                // setSubmitted(false);
                handleNext();
            } else if (projectStatus === 'failed') {
                // setSubmitted(false);
                // setErrorIndex(2);
                toast.error(projectError);
            }
        }
    }, [projectStatus]);

    const formik = useFormik({
        initialValues: {
            contactName: project.contactName,
            contactEmail: project.contactEmail
        },
        onSubmit: (values) => {
            setSubmitted(true);
            dispatch(patchRegistry({ id: project._id, data: { ...values, step: 6 } }));
        }
    });

    return (
        <>
            <Typography variant="h3" align="center" gutterBottom sx={{ mb: 2 }}>
                Carbon Credit Details
            </Typography>
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 2 }}>
                Please fill in the details below
            </Typography>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InputLabel>Contact Name</InputLabel>
                        <TextField
                            fullWidth
                            name="contactName"
                            value={formik.values.contactName}
                            onChange={formik.handleChange}
                            error={formik.touched.contactName && Boolean(formik.errors.contactName)}
                            helperText={formik.touched.contactName && formik.errors.contactName}
                            type="text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Contact Email</InputLabel>
                        <TextField
                            fullWidth
                            name="contactEmail"
                            value={formik.values.contactEmail}
                            onChange={formik.handleChange}
                            error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
                            helperText={formik.touched.contactEmail && formik.errors.contactEmail}
                            type="email"
                        />
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
