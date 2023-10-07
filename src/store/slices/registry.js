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
    state.registry = action.payload.data;
};

const handleRejected = (state, action) => {
    state.status = 'failed';
    state.error = action.error.message;
};

const initialState = {
    status: 'idle',
    error: null,
    registries: [],
    registry: null
};

export const postRegistry = createAsyncThunk('registry/postRegistry', async (data) => {
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
    const response = await axios.post('/registry', formData);
    return response.data;
});
export const patchRegistry = createAsyncThunk('registry/patchRegistry', async ({ id, data }) => {
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
    const response = await axios.patch(`/registry/${id}`, formData);
    return response.data;
});
export const submitRegistry = createAsyncThunk('registry/submitRegistry', async (id) => {
    const response = await axios.patch(`/registry/submit/${id}`);
    return response.data;
});
export const getRegistry = createAsyncThunk('registry/getRegistry', async (id) => {
    const response = await axios.get(`/registry/${id}`);
    return response.data;
});
export const getRegistries = createAsyncThunk('registry/getRegistries', async () => {
    const response = await axios.get('/registry');
    return response.data;
});

const slice = createSlice({
    name: 'registry',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(postRegistry.pending, handlePending)
            .addCase(postRegistry.fulfilled, handleFulfilled)
            .addCase(postRegistry.rejected, handleRejected)
            .addCase(patchRegistry.pending, handlePending)
            .addCase(patchRegistry.fulfilled, handleFulfilled)
            .addCase(patchRegistry.rejected, handleRejected)
            .addCase(submitRegistry.pending, handlePending)
            .addCase(submitRegistry.fulfilled, handleFulfilled)
            .addCase(submitRegistry.rejected, handleRejected)
            .addCase(getRegistry.pending, handlePending)
            .addCase(getRegistry.fulfilled, handleFulfilled)
            .addCase(getRegistry.rejected, handleRejected);
    }
});

// Reducer
export default slice.reducer;
