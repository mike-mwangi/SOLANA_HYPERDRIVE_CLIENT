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
import { patchProject, postProject } from 'store/slices/project';
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
    name: yup.string('Enter project name').max(100, 'Name should not exceed 100 characters').required('Project name is required'),
    type: yup.string('Select project type').required('Project type is required'),
    description: yup
        .string('Enter project description')
        .min(100, 'Description should be at least 100 characters long')
        .max(2000, 'Description should not exceed 2000 characters')
        .required('Project description is required')
});

export default function ProjectDetailForm({ handleNext, setErrorIndex }) {
    const { id } = useParams();
    const history = useNavigate();
    const dispatch = useDispatch();
    const [submitted, setSubmitted] = useState(false);
    const project = useSelector((state) => state.project.project);
    const projectStatus = useSelector((state) => state.project.status);
    const error = useSelector((state) => state.project.error);

    useEffect(() => {
        if (submitted) {
            if (projectStatus === 'succeeded') {
                if (id) {
                    // patch the project
                    handleNext();
                } else {
                    history(`/project/edit/${project._id}`);
                }
            }
        }
        if (projectStatus === 'failed') {
            toast.error(error);
            setErrorIndex(0);
        }
    }, [projectStatus]);
    const formik = useFormik({
        initialValues: {
            name: project?.name || '',
            type: project?.type || '',
            description: project?.description || '',
            location: project?.location || ''
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log('here');
            if (id) {
                dispatch(patchProject({ id, data: { ...values, step: 1 } }));
            } else {
                console.log('here');
                dispatch(postProject(values));
            }
            setSubmitted(true);
            setErrorIndex(null);
        }
    });

    return (
        <>
            {projectStatus === 'loading' && <Loader />}
            <Typography variant="h3" align="center" gutterBottom sx={{ mb: 2 }}>
                Project Details
            </Typography>
            <Typography variant="body1" align="center" gutterBottom sx={{ mb: 2 }}>
                Please fill in the details of your project
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Project Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Select
                            fullWidth
                            id="type"
                            name="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                        >
                            {/* Add your project types here */}
                            <MenuItem value={'Renewable Energy'}>Renewable Energy</MenuItem>
                            <MenuItem value={'Afforestation'}>Afforestation</MenuItem>
                            <MenuItem value={'Energy Efficiency'}>Energy Efficiency</MenuItem>
                            {/* ... other project types ... */}
                        </Select>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            id="description"
                            name="description"
                            label="Project Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="location"
                            name="location"
                            label="Project Location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
