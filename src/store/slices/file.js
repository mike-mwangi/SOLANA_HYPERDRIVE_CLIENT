// create a slice that allows for file downloads
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../index';
import axios from '../../utils/axios';

const initialState = {
    error: null,
    status: 'idle'
};

export const getFile = createAsyncThunk('file/getFile', async (key) => {
    const file = await axios.post(`/files/download/`, { key }, { responseType: 'blob' });
    const type = file.headers['Content-type'];
    const blob = new Blob([file.data], { type, encoding: 'UTF-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = key.split('/').pop();
    a.click();
    return blob;
});

const slice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        getFileSuccess(state, action) {
            state.error = null;
        },
        hasError(state, action) {
            state.error = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getFile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFile.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(getFile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default slice.reducer;

// export function getFile(key) {
//     return async () => {
//         try {
//             const file = await axios.get(`/files/download/${key}`, { responseType: 'blob' });
//             const type = file.headers['Content-type'];
//             const blob = new Blob([file.data], { type, encoding: 'UTF-8' });
//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = filePath.split('/').pop();
//             a.click();
//             return blob;
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//             return null;
//         }
//     };
// }
