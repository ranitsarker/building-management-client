import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Add a response interceptor
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
      }
  
      return Promise.reject(error);
    }
  );
  
  export default axiosSecure;
  