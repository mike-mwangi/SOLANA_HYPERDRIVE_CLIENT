/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// this file will handle all the  related api calls
import axios from '../../utils/axios';

// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------
// HELPER FUNCTIONS
const handlePending = (state) => {
    state.status = 'loading';
};

const handleFulfilled = (state, action) => {
    state.status = 'succeeded';
    state.project = action.payload.data;
};
const handleFulfilledProjects = (state, action) => {
    state.status = 'succeeded';
    state.projects = action.payload.data;
};

const handleRejected = (state, action) => {
    state.status = 'failed';
    state.error = action.error.message;
};

const initialState = {
    status: 'idle',
    error: null,
    projects: [],
    project: null
};

export const postProject = createAsyncThunk('project/postProject', async (data) => {
    const formData = new FormData();
    for (const field in data) {
        if (Array.isArray(data[field])) {
            for (let i = 0; i < data[field].length; i++) {
                formData.append(field, data[field][i]);
            }
        } else {
            formData.append(field, data[field]);
        }
    }
    const response = await axios.post('/project', formData);
    return response.data;
});
export const patchProject = createAsyncThunk('project/patchProject', async ({ id, data }) => {
    const formData = new FormData();
    for (const field in data) {
        // if a field is of type array, append it one by one
        if (Array.isArray(data[field])) {
            for (let i = 0; i < data[field].length; i++) {
                formData.append(field, data[field][i]);
            }
        } else {
            formData.append(field, data[field]);
        }
    }
    const response = await axios.patch(`/project/${id}`, formData);
    return response.data;
});
export const submitProject = createAsyncThunk('project/submitProject', async (id) => {
    const response = await axios.patch(`/project/submit/${id}`);
    return response.data;
});
export const getProject = createAsyncThunk('project/getProject', async (id) => {
    const response = await axios.get(`/project/${id}`);
    return response.data;
});
export const getProjects = createAsyncThunk('project/getProjects', async () => {
    const response = await axios.get('/project');
    return response.data;
});
export const getPublicProjects = createAsyncThunk('project/getPublicProjects', async () => {
    const response = await axios.get('/project/public');
    return response.data;
});

const slice = createSlice({
    name: 'project',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(postProject.pending, handlePending)
            .addCase(postProject.fulfilled, handleFulfilled)
            .addCase(postProject.rejected, handleRejected)
            .addCase(patchProject.pending, handlePending)
            .addCase(patchProject.fulfilled, handleFulfilled)
            .addCase(patchProject.rejected, handleRejected)
            .addCase(submitProject.pending, handlePending)
            .addCase(submitProject.fulfilled, handleFulfilled)
            .addCase(submitProject.rejected, handleRejected)
            .addCase(getProject.pending, handlePending)
            .addCase(getProject.fulfilled, handleFulfilled)
            .addCase(getProject.rejected, handleRejected)
            .addCase(getProjects.pending, handlePending)
            .addCase(getProjects.fulfilled, handleFulfilledProjects)
            .addCase(getProjects.rejected, handleRejected)
            .addCase(getPublicProjects.pending, handlePending)
            .addCase(getPublicProjects.fulfilled, handleFulfilledProjects)
            .addCase(getPublicProjects.rejected, handleRejected);
    }
});

// Reducer
export default slice.reducer;
