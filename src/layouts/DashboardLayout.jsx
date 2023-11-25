import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar></Sidebar>

      {/* Dashboard Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Title/Header */}
        <header className="bg-white shadow-md py-4 px-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {/* Add your dashboard content here */}
          {/* For example, you can add some cards, charts, etc. */}
          <div className="container mx-auto p-4">
            <Outlet></Outlet>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
