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
import FileUpload from 'ui-component/FileUpload';
import FileDownload from 'ui-component/FileDownload';
import InputLabel from 'ui-component/extended/Form/InputLabel';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

export default function AdditionalInformation({ handleNext, handleBack, setErrorIndex }) {
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
            website: project?.website,
            images: [],
            additionalDocuments: []
        },
        onSubmit: (values) => {
            setSubmitted(true);
            dispatch(patchProject({ id: project._id, data: { ...values, step: 5 } }));
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
                            id="website"
                            name="website"
                            label="Website URL"
                            value={formik.values.website}
                            onChange={formik.handleChange}
                            error={formik.touched.website && Boolean(formik.errors.website)}
                            helperText={formik.touched.website && formik.errors.website}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <InputLabel>Upload Images</InputLabel>
                        <FileUpload
                            name="images"
                            formik={formik}
                            document={project}
                            acceptedFileTypes={{ 'image/*': ['jpg', 'jpeg', 'png'] }}
                            multiple
                        />
                        <FileDownload field={project?.images} label="Images" />
                    </Grid>

                    <Grid item xs={12}>
                        <InputLabel>Upload Additional Documents</InputLabel>
                        <FileUpload
                            name="additionalDocuments"
                            formik={formik}
                            document={project}
                            acceptedFileTypes={['application/pdf']}
                            multiple
                        />
                        <FileDownload field={project?.additionalDocuments} label="Additional Documents" />
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
                                    onClick={() => setErrorIndex(4)}
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
