import axiosSecure from "./axiosSecure";

// Set token in Axios headers
const setTokenInHeaders = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    axiosSecure.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  console.log('Token set in headers --->', token);
};
setTokenInHeaders();

export const saveUser = async (user) => {
  // Call setTokenInHeaders again here if needed
  setTokenInHeaders();

  const currentUser = {
    name: user?.displayName,
    email: user?.email,
    role: 'user',
    status: 'Verified',
  };
  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);
  return data;
};

// get token from server
export const getToken = async (email) => {
  // Call setTokenInHeaders again here
  setTokenInHeaders();

  try {
    const response = await axiosSecure.post("/jwt", { email });
    const { data } = response;

    console.log('Token received from server --->', data);

    // Store token in localStorage
    localStorage.setItem('accessToken', data.token);

    return data;
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
};

// user role get
export const getRole = async (email) => {
  // Call setTokenInHeaders again here if needed
  setTokenInHeaders();

  const { data } = await axiosSecure(`/user/${email}`);
  return data.role;
};
