// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';

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
    menu: menuReducer
});

export default reducer;
