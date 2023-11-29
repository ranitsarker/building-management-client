import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Set token in Axios headers
const setTokenInHeaders = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    axiosSecure.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  console.log('Token set in headers --->', token);
};
setTokenInHeaders();

axiosSecure.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  async (error) => {
    console.log('Error intercepting response:', error.response);

    // Check if the error has a response object
    if (error.response) {
      // Handle unauthorized or forbidden responses
      if (error.response.status === 401 || error.response.status === 403) {
        // Clear the token from localStorage
        localStorage.removeItem('accessToken');

        // Redirect to the login page or handle the unauthorized access as needed
        window.location.replace('/login');
      }
    } else {
      // Handle the case where error.response is undefined
      console.error('Error response is undefined:', error);

      // You may want to add additional handling here based on your requirements

    // Always reject the promise to propagate the error
    return Promise.reject(error);
    }
  }
);

export default axiosSecure;