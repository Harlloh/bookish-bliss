// import axios from 'axios';
// import { useAuthStore } from '@/stores/authStore';


// const api = axios.create({
//     baseURL: 'http://localhost:8000/',
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Track if we're currently refreshing
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//     failedQueue.forEach(prom => {
//         if (error) {
//             prom.reject(error);
//         } else {
//             prom.resolve(token);
//         }
//     });

//     failedQueue = [];
// };

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const { setUser } = useAuthStore()
//         const originalRequest = error.config;

//         // If access token expired and we haven't retried yet
//         if (
//             error.response?.status === 401 &&
//             (error.response?.data?.code === "TOKEN_EXPIRED" || error.response?.data?.code === "NO_ACCESS_TOKEN") &&
//             !originalRequest._retry
//         ) {
//             // If already refreshing, queue this request
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({ resolve, reject });
//                 })
//                     .then(() => {
//                         return api(originalRequest);
//                     })
//                     .catch((err) => {
//                         return Promise.reject(err);
//                     });
//             }

//             originalRequest._retry = true;
//             isRefreshing = true;

//             try {
//                 // Call refresh endpoint
//                 await api.post('/auth/refresh');

//                 isRefreshing = false;
//                 processQueue(null);

//                 // Retry original request
//                 return api(originalRequest);

//             } catch (refreshError) {
//                 isRefreshing = false;
//                 processQueue(refreshError, null);

//                 console.error('Refresh failed:', refreshError);

//                 // Clear any stored user data
//                 setUser(null);

//                 // Redirect to login
//                 window.location.href = '/login';

//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default api;


import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';


const api = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Track if we're currently refreshing
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

// Function to handle logout (can be imported where needed)
const handleLogout = () => {
    const { setUser } = useAuthStore()

    // Clear localStorage/sessionStorage if you're storing anything
    setUser(null)

    // Redirect to login
    window.location.href = '/login';
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle network errors (no response from server)
        if (!error.response) {
            console.error('Network error - no response from server:', error.message);
            // Don't retry, just reject leave the retrying for tanstack
            return Promise.reject(error);
        }
        // Prevent infinite loops - don't retry refresh endpoint
        if (originalRequest.url?.includes('/auth/refresh')) {
            return Promise.reject(error);
        }

        const errorCode = error.response?.data?.code;
        const status = error.response?.status;

        // Unrecoverable errors - must login again
        const unrecoverableErrors = ['NO_TOKEN', 'SESSION_EXPIRED', 'REFRESH_TOKEN_EXPIRED', 'NO_REFRESH_TOKEN', 'INVALID_REFRESH_TOKEN'];

        if (status === 401 && unrecoverableErrors.includes(errorCode)) {
            console.log('Unrecoverable auth error:', errorCode);
            handleLogout();
            return Promise.reject(error);
        }

        // Recoverable errors - try to refresh
        const recoverableErrors = ['ACCESS_TOKEN_EXPIRED', 'NO_ACCESS_TOKEN'];

        if (status === 401 && recoverableErrors.includes(errorCode) && !originalRequest._retry) {

            // If already refreshing, queue this request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                console.log('Attempting to refresh access token...');

                // Call refresh endpoint - it sets new httpOnly cookie
                await api.post('/auth/refresh');

                console.log('Token refreshed successfully');

                // Process queued requests
                processQueue(null);
                isRefreshing = false;

                // Retry original request with new cookie
                return api(originalRequest);

            } catch (refreshError) {
                console.error('Refresh failed:', refreshError);

                // Reject all queued requests
                processQueue(refreshError);
                isRefreshing = false;

                // Handle logout
                handleLogout();

                return Promise.reject(refreshError);
            }
        }

        // All other errors
        return Promise.reject(error);
    }
);

export default api;