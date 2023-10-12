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
import { patchProject } from 'store/slices/project';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

export default function ContactsForm({ handleNext, handleBack, setErrorIndex }) {
    const dispatch = useDispatch();
    const project = useSelector((state) => state.project.project);
    const projectStatus = useSelector((state) => state.project.status);
    const projectError = useSelector((state) => state.project.error);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (submitted) {
            if (projectStatus === 'succeeded') {
                setSubmitted(false);
                handleNext();
            } else if (projectStatus === 'failed') {
                setSubmitted(false);
                setErrorIndex(2);
                toast.error(projectError);
            }
        }
    }, [projectStatus]);

    const formik = useFormik({
        initialValues: {
            developerFirstName: project?.developerFirstName,
            developerLastName: project?.developerLastName,
            email: project?.email,
            phoneNumber: project?.phoneNumber,
            address: project?.address
        },
        onSubmit: (values) => {
            setSubmitted(true);
            dispatch(patchProject({ id: project._id, data: { ...values, step: 4 } }));
        }
    });

    return (
        <>
            <Typography variant="h3" align="center" gutterBottom sx={{ mb: 2 }}>
                Project Documents
            </Typography>
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 2 }}>
                Please fill in the details below
            </Typography>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="developerFirstName"
                            name="developerFirstName"
                            label="Project Developer First Name"
                            value={formik.values.developerFirstName}
                            onChange={formik.handleChange}
                            error={formik.touched.developerFirstName && Boolean(formik.errors.developerFirstName)}
                            helperText={formik.touched.developerFirstName && formik.errors.developerFirstName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="developerLastName"
                            name="developerLastName"
                            label="Project Developer Last Name"
                            value={formik.values.developerLastName}
                            onChange={formik.handleChange}
                            error={formik.touched.developerLastName && Boolean(formik.errors.developerLastName)}
                            helperText={formik.touched.developerLastName && formik.errors.developerLastName}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
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
