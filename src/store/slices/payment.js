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
export const getProjectAccount = createAsyncThunk('project/getProjectAccount', async (id) => {
    const response = await axios.get(`/project/${id}/account`);
    return response.data;
});
export const getProjectAccountTransactions = createAsyncThunk('project/getProjectAccountTransactions', async (id) => {
    const response = await axios.get(`/project/${id}/account/transactions`);
    return response.data;
});

const slice = createSlice({
    name: 'payment',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getProjectAccount.pending, handlePending)
            .addCase(getProjectAccount.fulfilled, handleFulfilled)
            .addCase(getProjectAccount.rejected, handleRejected);
    }
});

// Reducer
export default slice.reducer;
