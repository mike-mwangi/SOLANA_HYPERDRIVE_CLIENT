// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';
import registryReducer from './slices/registry';
import projectReducer from './slices/project';
import fileReducer from './slices/file';
import paymentReducer from './slices/payment';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: persistReducer(
        {
            key: 'snackbar',
            storage,
            keyPrefix: 'hyperdrive-'
        },
        snackbarReducer
    ),
    registry: registryReducer,
    project: projectReducer,
    payment: paymentReducer,
    file: fileReducer,
    menu: menuReducer
});

export default reducer;
