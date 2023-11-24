import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Add a request interceptor
axiosSecure.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("accessToken");

    // If the token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosSecure.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  async (error) => {
    console.log('Error intercepting response:', error.response);

    // Handle unauthorized or forbidden responses
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear the token from localStorage
      localStorage.removeItem('accessToken');
      
      // Redirect to the login page or handle the unauthorized access as needed
      window.location.replace('/login');
    }

    return Promise.reject(error);
  }
);

export default axiosSecure;
