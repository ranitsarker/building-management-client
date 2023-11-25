import { GrLogout } from "react-icons/gr";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import AdminMenu from "./AdminMenu";


const Sidebar = () => {
    const {logOut} = useAuth();
    const [role] = useRole()
    console.log('role--->', role)

    return (
        <div>
             <nav>
             {role === "admin" && <AdminMenu></AdminMenu>}
             </nav>
            
            <button className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'>
                <GrLogout className='w-5 h-5' />
                <span className='mx-4 font-medium' onClick={logOut}>Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;