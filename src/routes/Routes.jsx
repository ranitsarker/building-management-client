import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Apartment from "../pages/Apartment/Apartment";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import AgreementRequests from "../pages/Dashboard/AgreementRequests";

export const router = createBrowserRouter([
    {
       path: '/',
       element: <Main></Main>,
       children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
            path: 'apartment',
            element: <Apartment></Apartment>,
        },
        {
            path: 'sign-up',
            element: <SignUp></SignUp>,
        },
        {
            path: 'login',
            element: <Login></Login>,
        },
        {
            path: '/agreement-requests',
            element:<AgreementRequests></AgreementRequests>,
          },
       ]
    }
])