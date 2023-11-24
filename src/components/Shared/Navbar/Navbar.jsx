import { NavLink } from "react-router-dom";
import Container from "../Container";
import logo from '/logo.png'

const Navbar = () => {
    return (
        <>
        <nav className="bg-white">
            <Container>
                <div className="drawer">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
                    <div className="drawer-content flex flex-col">

                        <div className="w-full navbar bg-white">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>

                            </label>
                        </div> 
                        <div className="flex-1 px-2 mx-2">
                            <img src={logo} alt="" />
                        </div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/apartment">Apartment</NavLink></li>
                            </ul>
                        </div>
                        </div>
                    </div> 
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
                        <ul className="menu p-4 w-80 min-h-full bg-base-200">
                        <li><NavLink to="/">Home</NavLink></li>
                        </ul>
                    </div>
                </div>
            </Container>
        </nav>
        

        </>
    );
};

export default Navbar;