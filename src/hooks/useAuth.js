import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useAuth = () => {
  const auth = useContext(AuthContext);
  const isAuthenticated = !!auth.user;
  return { ...auth, isAuthenticated };
};

export default useAuth;