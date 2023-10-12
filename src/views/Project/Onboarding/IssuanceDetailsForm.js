/* eslint-disable no-underscore-dangle */

// material-ui
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
// import InputLabel,CloudUploadIcon, CardMedia, CircularProgress,
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// third-party
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'store';
import { patchProject } from 'store/slices/project';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import * as yup from 'yup';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

const validationSchema = yup.object({
    totalCreditsIssued: yup.number().required('Total Credits Issued is required'),
    creditIssuanceDate: yup.date().required('Credit Issuance Date is required')
});
export default function DocumentationForm({ handleNext, handleBack, setErrorIndex }) {
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
            totalCreditsIssued: project?.totalCreditsIssued,
            creditIssuanceDate: project?.creditIssuanceDate
        },
        validationSchema,
        onSubmit: (values) => {
            setSubmitted(true);
            dispatch(patchProject({ id: project._id, data: { ...values, step: 3 } }));
        }
    });

    return (
        <>
            <Typography variant="h3" align="center" gutterBottom sx={{ mb: 2 }}>
                Issuance Details
            </Typography>
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 2 }}>
                Please fill in the details below
            </Typography>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InputLabel>Total Credits Issued</InputLabel>
                        <TextField
                            fullWidth
                            type="number"
                            id="totalCreditsIssued"
                            name="totalCreditsIssued"
                            value={formik.values.totalCreditsIssued}
                            onChange={formik.handleChange}
                            error={formik.touched.totalCreditsIssued && Boolean(formik.errors.totalCreditsIssued)}
                            helperText={formik.touched.totalCreditsIssued && formik.errors.totalCreditsIssued}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <InputLabel>Credit Issuance Date</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={formik.values.creditIssuanceDate}
                                onChange={(newValue) => {
                                    formik.setFieldValue('creditIssuanceDate', newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        required
                                        id="creditIssuanceDate"
                                        fullWidth
                                        {...params}
                                        error={formik.touched.creditIssuanceDate && Boolean(formik.errors.creditIssuanceDate)}
                                        helperText={formik.touched.creditIssuanceDate && formik.errors.creditIssuanceDate}
                                    />
                                )}
                            />
                        </LocalizationProvider>
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
                                    onClick={() => setErrorIndex(2)}
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
