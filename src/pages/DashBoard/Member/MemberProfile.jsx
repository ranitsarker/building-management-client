import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../api/axiosSecure';
import useAuth from '../../../hooks/useAuth';

const MemberProfile = () => {
  const { user } = useAuth();
  console.log('current user: ', user);
  const { data: agreements, error, isLoading } = useQuery({
    queryKey: 'agreements',
    queryFn: async () => {
      const response = await axiosSecure.get('/fetchAllAgreements');
      return response.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching agreements: {error.message}</p>;
  }

  // Filter agreements based on the condition
  const filteredAgreements = agreements.filter(
    (agreement) =>
      agreement.status === 'accepted' && agreement.userInfo.email === user.email
  );

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Member Profile</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {filteredAgreements.map((agreement) => (
          <div
            key={agreement._id}
            className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            <p className="text-xl font-semibold mb-2">
              Agreement ID: {agreement._id}
            </p>
            <p>Status: {agreement.status}</p>
            <div className="mt-4">
              <p className="font-semibold mb-2">Apartment Info:</p>
              <img
                src={agreement.apartmentInfo.image}
                alt={`Apartment ${agreement.apartmentInfo.apartmentNo}`}
                className="mt-4 w-full h-auto object-cover rounded-md"
              />
              <ul>
                <li>Apartment No: {agreement.apartmentInfo.apartmentNo}</li>
                <li>Block Name: {agreement.apartmentInfo.blockName}</li>
                <li>Floor No: {agreement.apartmentInfo.floorNo}</li>
                <li>Rent: {agreement.apartmentInfo.rent}</li>
              </ul>
            </div>
            <div className="mt-4">
              <p className="font-semibold mb-2">User Info:</p>
              <ul>
                <li>Name: {agreement.userInfo.displayName}</li>
                <li>Email: {agreement.userInfo.email}</li>
                <li>Accepted Date: {agreement?.acceptedDate}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberProfile;
