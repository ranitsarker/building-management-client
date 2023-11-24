import axiosSecure from "./axiosSecure"
export const saveUser = async user => {
    const currentUser = {
        email: user.email, 
        role: 'guest',
        status: 'Verified',
    }
    const {data} = await axiosSecure.put(`/users/${user?.email}`, currentUser)
    return data;
}
// get token from server 
export const getToken = async (email) => {
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
  }
