/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// material-ui and other ui components
import { Button, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import FileUpload from 'ui-component/FileUpload';
import Loader from 'ui-component/Loader';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

import { REGISTRY_TYPES } from 'constant';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'store';
import { patchRegistry, postRegistry } from 'store/slices/registry';
import ImageReviewCard from 'ui-component/cards/ImageReviewCard';

// async function getLocationData(location) {
//     const results = await getGeocode({ address: location });
//     const { lat, lng } = getLatLng(results[0]);
//     let country = '';
//     for (let i = 0; i < results[0].address_components.length; i++) {
//         const component = results[0].address_components[i];
//         if (component.types.includes('country')) {
//             country = component.long_name;
//             break;
//         }
//     }
//     return { latitude: lat, longitude: lng, country };
// }

const validationSchema = yup.object({
    name: yup.string('Enter The name of the registry').required('Name is required'),
    type: yup.string('Select the registry type').required('Registry type is required'),
    jurisdiction: yup.string('Select the registry jurisdiction').required('Registry jurisdiction is required')
});

export default function RegistryDetailForm({ handleNext, setErrorIndex }) {
    const { id } = useParams();
    const history = useNavigate();
    const dispatch = useDispatch();
    const [submitted, setSubmitted] = useState(false);
    const registry = useSelector((state) => state.registry.registry);
    const registryStatus = useSelector((state) => state.registry.status);
    const error = useSelector((state) => state.registry.error);

    useEffect(() => {
        if (submitted) {
            if (registryStatus === 'succeeded') {
                if (id) {
                    // patch the registry
                    handleNext();
                } else {
                    history(`/registry/edit/${registry._id}`);
                }
            }
        }
        if (registryStatus === 'failed') {
            toast.error(error);
            setErrorIndex(0);
        }
    }, [registryStatus]);
    const formik = useFormik({
        initialValues: {
            name: registry?.name || '',
            type: registry?.type || '',
            jurisdiction: registry?.jurisdiction || '',
            logo: []
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log('here');
            if (id) {
                dispatch(patchRegistry({ id, data: { ...values, step: 1 } }));
            } else {
                console.log('here');
                dispatch(postRegistry(values));
            }
            setSubmitted(true);
            setErrorIndex(null);
        }
    });

    return (
        <>
            {registryStatus === 'loading' && <Loader />}
            <Typography variant="h3" align="center" gutterBottom sx={{ mb: 2 }}>
                Registry Details
            </Typography>
            <Typography variant="body1" align="center" gutterBottom sx={{ mb: 2 }}>
                Please fill in the details of your registry
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Stack>
                            <InputLabel
                                id="name"
                                helperText="Enter the official title or name by which your carbon registry is recognized. This 
will be used for identification and reference throughout the platform."
                            >
                                What is the name of your registry?
                            </InputLabel>
                            <TextField
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                fullWidth
                                placeholder="e.g Kirgit Agro Farms"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputLabel
                            id="type"
                            helperText="Select the primary sector or category that best describes the focus of your 
                            carbon registry. This refers to the 15 recognized sectors in the carbon markets, such as 
                            energy, forestry, or agriculture."
                        >
                            What is your registry type?
                        </InputLabel>
                        <Select
                            id="type"
                            name="type"
                            onChange={formik.handleChange}
                            value={formik.values.type}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                            fullWidth
                        >
                            {REGISTRY_TYPES.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Jurisdiction</InputLabel>
                        <TextField
                            id="jurisdiction"
                            name="jurisdiction"
                            value={formik.values.jurisdiction}
                            onChange={formik.handleChange}
                            error={formik.touched.jurisdiction && Boolean(formik.errors.jurisdiction)}
                            helperText={formik.touched.jurisdiction && formik.errors.jurisdiction}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <InputLabel>Upload your registry logo</InputLabel>
                        <FileUpload
                            label="Upload your registry logo"
                            name="logo"
                            document={registry}
                            formik={formik}
                            acceptedFileTypes={{
                                'image/*': ['.png', '.jpeg', '.jpg']
                            }}
                            maxFileSize={7340032}
                            maxFiles={1}
                        />
                    </Grid>
                    {formik.values.registryImages?.length > 0 && (
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center" gutterBottom sx={{ mb: 2 }}>
                                Images you are uploading
                            </Typography>
                            <ImageReviewCard field={formik?.values?.logo} />
                        </Grid>
                    )}
                    {registry?.registryImages?.length > 0 && (
                        <Grid item xs={12}>
                            <Typography variant="h5" color="secondary">
                                Uploaded Images
                            </Typography>
                            <ImageReviewCard field={registry?.logo} />
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    size="large"
                                    sx={{
                                        my: 3,
                                        ml: 1
                                    }}
                                    disabled={registryStatus === 'loading'}
                                    onClick={() => setErrorIndex(0)}
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
