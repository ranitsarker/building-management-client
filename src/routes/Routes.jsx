import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Apartment from "../pages/Apartment/Apartment";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import AgreementRequests from "../pages/Dashboard/AgreementRequests";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MemberRoute from "./MemberRoute";
import MemberProfile from "../pages/DashBoard/Member/MemberProfile";
import UserProfile from "../pages/DashBoard/User/UserProfile";
import ManageMembers from "../pages/DashBoard/Admin/ManageMembers";
import MakeAnnouncement from "../pages/DashBoard/Admin/MakeAnnouncement";
import Announcements from "../pages/DashBoard/Shared/Announcements";
import MakePayment from "../pages/DashBoard/Member/MakePayment";
import Payment from "../pages/DashBoard/Member/Payment";
import PaymentHistory from "../pages/DashBoard/Member/PaymentHistory";
import ManageCoupons from "../pages/DashBoard/Admin/ManageCoupons";
import AdminProfile from "../pages/DashBoard/Admin/AdminProfile";

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
       ]
    },
    {
        path: '/dashboard', 
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
          {
            path: 'agreement-requests',
            element: 
            <PrivateRoute>
                <AdminRoute>
                    <AgreementRequests></AgreementRequests>
                </AdminRoute>
            </PrivateRoute>,
          },
          {
            path: 'member-profile',
            element: 
            <PrivateRoute>
                <MemberRoute>
                    <MemberProfile></MemberProfile>
                </MemberRoute>
            </PrivateRoute>,
          },
          {
            path: 'user-profile',
            element: 
            <PrivateRoute>
                <UserProfile></UserProfile>
            </PrivateRoute>,
          },
          {
            path: 'manage-members',
            element: 
            <AdminRoute>
                <ManageMembers></ManageMembers>
            </AdminRoute>,
          },
          {
            path: 'make-announcement',
            element: 
            <AdminRoute>
                <MakeAnnouncement></MakeAnnouncement>
            </AdminRoute>,
          },
          {
            path: 'announcements',
            element: 
            <PrivateRoute>
                <Announcements></Announcements>
            </PrivateRoute>,
          },
          {
            path: 'make-payment',
            element: 
            <MemberRoute>
                <MakePayment></MakePayment>
            </MemberRoute>,
          },
          {
            path: 'payment',
            element: 
            <MemberRoute>
                <Payment></Payment>
            </MemberRoute>,
          },
          {
            path: 'payment-history',
            element: 
            <MemberRoute>
                <PaymentHistory></PaymentHistory>
            </MemberRoute>,
          },
          {
            path: 'manage-coupons',
            element: 
            <AdminRoute>
                <ManageCoupons></ManageCoupons>
            </AdminRoute>,
          },
          {
            path: 'admin-profile',
            element: 
            <AdminRoute>
                <AdminProfile></AdminProfile>
            </AdminRoute>,
          },
      ]
      },
])