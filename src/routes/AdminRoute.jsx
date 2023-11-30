import { Navigate } from "react-router-dom";
import Loader from "../components/Shared/Loader";
import useRole from "../hooks/useRole";

const AdminRoute = ({children}) => {
    const [role, loading] = useRole();
    if (loading) return <Loader></Loader>
    if (role === 'admin') return children
    return <Navigate to='/dashboard/admin-profile'></Navigate>

};
export default AdminRoute;
