/* eslint-disable no-underscore-dangle */

// material-ui
import { Button, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
// import InputLabel,CloudUploadIcon, CardMedia, CircularProgress,
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// third-party
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'store';
import { patchProject } from 'store/slices/project';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import FileUpload from 'ui-component/FileUpload';
import FileDownload from 'ui-component/FileDownload';

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
            verificationStandard: project?.verificationStandard,
            verificationStatus: project?.verificationStatus,
            verificationDocument: []
        },
        onSubmit: (values) => {
            setSubmitted(true);
            dispatch(patchProject({ id: project._id, data: { ...values, step: 2 } }));
        }
    });

    return (
        <>
            <Typography variant="h3" align="center" gutterBottom sx={{ mb: 2 }}>
                Verification Details
            </Typography>
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 2 }}>
                Please fill in the details below
            </Typography>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InputLabel>Verification Standard</InputLabel>
                        <Select
                            fullWidth
                            id="verificationStandard"
                            name="verificationStandard"
                            value={formik.values.verificationStandard}
                            onChange={formik.handleChange}
                            error={formik.touched.verificationStandard && Boolean(formik.errors.verificationStandard)}
                        >
                            {/* Add your verification standards here */}
                            <MenuItem value="VCS">VCS</MenuItem>
                            <MenuItem value="Gold Standard">Gold Standard</MenuItem>
                            {/* ... other verification standards ... */}
                        </Select>
                    </Grid>

                    <Grid item xs={12}>
                        <InputLabel>Verification Status</InputLabel>
                        <Select
                            fullWidth
                            id="verificationStatus"
                            name="verificationStatus"
                            value={formik.values.verificationStatus}
                            onChange={formik.handleChange}
                            error={formik.touched.verificationStatus && Boolean(formik.errors.verificationStatus)}
                        >
                            {/* Add your verification statuses here */}
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Verified">Verified</MenuItem>
                            {/* ... other verification statuses ... */}
                        </Select>
                    </Grid>

                    <Grid item xs={12}>
                        <InputLabel>Verification Document</InputLabel>
                        <FileUpload
                            name="verificationDocument"
                            formik={formik}
                            acceptedFileTypes={['application/pdf']}
                            document={project}
                        />
                        <FileDownload field={project?.verificationDocument} label="Verification Document" />
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
                                    onClick={() => setErrorIndex(1)}
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
