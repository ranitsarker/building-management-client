import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRole from '../../hooks/useRole';


const RedirectBasedOnRole = () => {
  const [role, loading] = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      switch (role) {
        case 'admin':
          navigate('/admin-profile');
          break;
        case 'member':
          navigate('/member-profile');
          break;
        // Add more cases for other roles if needed
        default:
          // Redirect to a default route if the user's role is not recognized
          navigate('/');
      }
    }
  }, [role, loading, navigate]);

  return null;
};

export default RedirectBasedOnRole;
