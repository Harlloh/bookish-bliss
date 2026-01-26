import axios from 'axios';

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

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If access token expired and we haven't retried yet
        if (
            error.response?.status === 401 &&
            (error.response?.data?.code === "TOKEN_EXPIRED" || error.response?.data?.code === "NO_TOKEN") &&
            !originalRequest._retry
        ) {
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
                // Call refresh endpoint
                await api.post('/auth/refresh');

                isRefreshing = false;
                processQueue(null);

                // Retry original request
                return api(originalRequest);

            } catch (refreshError) {
                isRefreshing = false;
                processQueue(refreshError, null);

                console.error('Refresh failed:', refreshError);

                // Clear any stored user data
                localStorage.removeItem('user');

                // Redirect to login
                window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;