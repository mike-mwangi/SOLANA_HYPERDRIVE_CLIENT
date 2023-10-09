/* eslint-disable consistent-return */
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback } from 'react';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT, SET_INITIALIZED } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';
import { useNavigate } from 'react-router-dom';

// constant
const initialState = {
    error: null,
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const setSession = (token) => {
    if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const navigate = useNavigate();

    const logout = async () => {
        setSession(null);
        dispatch({ type: LOGOUT });
        navigate('/login');

        try {
            await axios.post('/auth/logout');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const refreshAccessToken = useCallback(async () => {
        try {
            const response = await axios.post(
                '/auth/refresh-token',
                {},
                {
                    withCredentials: true
                }
            );

            setSession(response.data.accessToken);

            // Fetch the user data with the new access token
            const decoded = jwtDecode(response.data.accessToken);
            const userId = decoded.id;

            const fetchUserData = async () => {
                try {
                    const userResponse = await axios.get(`/users/${userId}`);
                    const user = userResponse.data;

                    // Dispatch the LOGIN action with the updated user data
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user
                        }
                    });

                    // Set isInitialized to true after refreshing the token and fetching the user data
                    dispatch({
                        type: SET_INITIALIZED,
                        payload: {
                            isInitialized: true
                        }
                    });

                    return user;
                } catch (err) {
                    if (err.response && err.response.status === 403) {
                        // Handle the case when the token is expired or invalid
                        logout();
                    }

                    // Update the state to indicate an error occurred during the user data fetching process
                    dispatch({
                        type: LOGOUT
                    });
                    setSession(null);

                    return null;
                }
            };

            setTimeout(() => {
                fetchUserData();
            }, 1500); // Adjust the delay if needed
        } catch (err) {
            // Update the state to indicate an error occurred during the refresh token process
            dispatch({
                type: LOGOUT
            });
            setSession(null);

            // eslint-disable-next-line consistent-return
            return null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const init = async () => {
            try {
                const token = window.localStorage.getItem('token');

                if (token) {
                    const decoded = jwtDecode(token);

                    // Calculate the time left for token expiry
                    const timeLeft = decoded.exp * 1000 - Date.now();

                    if (timeLeft <= 60000) {
                        // If token expires in less than 60 seconds
                        await refreshAccessToken(); // Refresh the access token if it's expired
                    } else {
                        setTimeout(() => {
                            refreshAccessToken(); // Refresh the access token before it expires
                        }, timeLeft - 60000); // Refresh the token 60 seconds before the token expires
                    }
                    // Use the latest token from local storage
                    const latestToken = window.localStorage.getItem('token');
                    setSession(latestToken);

                    axios.defaults.headers.common.Authorization = `Bearer ${latestToken}`;

                    const userId = decoded.id;
                    const response = await axios.get(`/users/${userId}`);
                    const user = response.data;

                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }

            // Set isInitialized to true after the initial check
            dispatch({
                type: SET_INITIALIZED,
                payload: {
                    isInitialized: true
                }
            });
        };

        init();
    }, [refreshAccessToken]);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/auth/login', { email, password });
            const { token, user } = response.data;
            setSession(token);

            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user
                }
            });
            return user;
        } catch (error) {
            throw new Error(error.msg || error);
        }
    };

    const register = async (email, password, firstName, lastName, phoneNumber, country, role) => {
        try {
            const response = await axios.post('/auth/register', { email, password, firstName, lastName, phoneNumber, country, role });
            return response.data;
        } catch (error) {
            throw new Error(error.msg || error);
        }
    };

    const forgotPassword = async (email) => {
        try {
            const response = await axios.post('/auth/forgotPassword', { email });
            return response.data;
        } catch (error) {
            throw new Error(error.error);
        }
    };

    const verifyEmail = async (email) => {
        try {
            const response = await axios.post('/auth/resend-link', { email });
            return response.data;
        } catch (error) {
            throw new Error(error.error);
        }
    };

    const resetPassword = async (password, resetToken) => {
        try {
            const response = await axios.put(`/auth/resetPassword/${resetToken}`, { password });
            return response.data;
        } catch (error) {
            throw new Error(error.error);
        }
    };

    // Change password function for the account settings page
    const changePassword = async (currentPassword, newPassword) => {
        try {
            const response = await axios.put('/auth/change-password', { currentPassword, newPassword });
            logout(); // Logging out user after password change
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error(error.msg || error);
        }
    };

    const updateProfile = () => console.log('Update Profile');

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider
            value={{
                ...state,
                login,
                logout,
                register,
                forgotPassword,
                resetPassword,
                verifyEmail,
                updateProfile,
                refreshAccessToken,
                changePassword
            }}
        >
            {children}
        </JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
