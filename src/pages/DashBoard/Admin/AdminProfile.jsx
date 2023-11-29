
import TotalAvailableRooms from '../../../components/Dashboard/TotalAvailableRooms';
import TotalMembersCount from '../../../components/Dashboard/TotalMembersCount';
import TotalRoomsCount from '../../../components/Dashboard/TotalRoomsCount';
import TotalUnavailableRooms from '../../../components/Dashboard/TotalUnavailableRooms';
import Container from '../../../components/Shared/Container';
import useAuth from '../../../hooks/useAuth';

const AdminProfile = () => {
    const {user} = useAuth();
  return (
    <Container>
      <div className="flex flex-col items-center justify-center mt-10">

        {/* Admin Information Section */}
        <div className="bg-white p-6 rounded-md shadow-md mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Admin Information</h2>
          <p className="text-gray-600 mb-2">Name: {user?.displayName}</p>
          <p className="text-gray-600 mb-2">Email: {user?.email}</p>
          <img src={user?.photoURL} alt="" className="w-24 h-24 mx-auto mb-2 rounded" />

        </div>

        {/* Total Rooms Count */}
        <div className="bg-gray-200 p-4 rounded-md shadow-md mb-4">
          <TotalRoomsCount role="admin" />
        </div>

        {/* Total Available Rooms */}
        <div className="bg-blue-200 p-4 rounded-md shadow-md mb-4">
          <TotalAvailableRooms />
        </div>

        {/* Total Unavailable Rooms */}
        <div className="bg-red-200 p-4 rounded-md shadow-md mb-4">
          <TotalUnavailableRooms />
        </div>

        {/* Total Members Count for Member Role */}
        <div className="bg-green-200 p-4 rounded-md shadow-md mb-4">
          <TotalMembersCount role="member" />
        </div>

        {/* Total Members Count for User Role */}
        <div className="bg-yellow-200 p-4 rounded-md shadow-md mb-4">
          <TotalMembersCount role="user" />
        </div>
      </div>
    </Container>
  );
};

export default AdminProfile;
