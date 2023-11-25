import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/axiosSecure';

const AgreementRequests = () => {
  const { data: agreements, error, isLoading } = useQuery({
    queryKey: 'agreements',
    queryFn: async () => {
      const response = await axiosSecure.get('/agreements');
      return response.data;
    },
  });


  const handleAccept = async (agreementId, userEmail) => {
    try {
      // Update the agreement status to 'accepted' on the server
      await axiosSecure.put(`/updateAgreementStatus/${agreementId}`, { status: 'accepted' });

      // Update the user role to remain the same
      const userRoleResult = await axiosSecure.put(`/updateUserRole/${userEmail}`, { role: 'member' });

      console.log('Updated user role:', userRoleResult.data);

      // You may want to refetch the agreements here to update the UI
    } catch (error) {
      console.error('Error accepting agreement:', error);
      // Handle error as needed
    }
  };

  const handleReject = async (agreementId, userEmail) => {
    try {
      // Update the agreement status to 'rejected' on the server
      await axiosSecure.put(`/updateAgreementStatus/${agreementId}`, { status: 'rejected' });

      // Update the user role to remain the same
      const userRoleResult = await axiosSecure.put(`/updateUserRole/${userEmail}`, { role: 'user' });

      // You may want to refetch the agreements here to update the UI

      // Handle the user role result as needed
      console.log('Updated user role:', userRoleResult.data);
    } catch (error) {
      console.error('Error rejecting agreement:', error);
      // Handle error as needed
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error('Error fetching data:', error);
    return <p>Error fetching data</p>;
  }

  return (
    <>
      <div className="container mx-auto p-8">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-yellow-500 text-white">
              <tr>
                <th className="py-2 px-4 align-middle">User Name</th>
                <th className="py-2 px-4 align-middle">User Email</th>
                <th className="py-2 px-4 align-middle">Floor No</th>
                <th className="py-2 px-4 align-middle">Block Name</th>
                <th className="py-2 px-4 align-middle">Room No</th>
                <th className="py-2 px-4 align-middle">Rent</th>
                <th className="py-2 px-4 align-middle">Agreement Request Date</th>
                <th className="py-2 px-4 align-middle">Agreement Status</th>
                <th className="py-2 px-4 align-middle">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agreements.map((agreement) => (
                <tr key={agreement._id} className="border-t border-gray-300">
                  <td className="py-2 px-4 text-center">{agreement.userInfo?.displayName || 'N/A'}</td>
                  <td className="py-2 px-4 text-center">{agreement.userInfo?.email || 'N/A'}</td>
                  <td className="py-2 px-4 text-center">{agreement.apartmentInfo?.floorNo || 'N/A'}</td>
                  <td className="py-2 px-4 text-center">{agreement.apartmentInfo?.blockName || 'N/A'}</td>
                  <td className="py-2 px-4 text-center">{agreement.apartmentInfo?.apartmentNo || 'N/A'}</td>
                  <td className="py-2 px-4 text-center">{agreement.apartmentInfo?.rent || 'N/A'}</td>
                  <td className="py-2 px-4 text-center">
                    {agreement.createdAt
                      ? new Date(agreement.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td className="py-2 px-4 text-center">{agreement.apartmentInfo?.status || 'N/A'}</td>
                  <td className="py-2 px-4 text-center">
                    {agreement.apartmentInfo?.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAccept(agreement._id, agreement.userInfo.email)}
                          className="bg-green-500 text-white px-2 py-1 mr-2"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(agreement._id, agreement.userInfo.email)}
                          className="bg-red-500 text-white px-2 py-1"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AgreementRequests;
