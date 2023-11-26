import { Navigate } from "react-router-dom";
import Loader from "../components/Shared/Loader";
import useRole from "../hooks/useRole";

const MemberRoute = ({children}) => {
    const [role, loading] = useRole();
    if (loading) return <Loader></Loader>
    if (role === 'member') return children
    return <Navigate to='/dashboard'></Navigate>

};
export default MemberRoute;
