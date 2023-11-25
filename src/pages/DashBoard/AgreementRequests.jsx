import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/axiosSecure';
import { useState } from 'react';

const AgreementRequests = () => {
  const { data: agreements, error, isLoading, refetch } = useQuery({
    queryKey: 'agreements',
    queryFn: async () => {
      const response = await axiosSecure.get('/agreements');
      return response.data;
    },
  });

  const [acceptedStatus, setAcceptedStatus] = useState({});

  const handleAccept = async (agreementId, userEmail) => {
    try {
      // Update the agreement status to 'accepted' on the server
      await axiosSecure.put(`/updateAgreementStatus/${agreementId}`, { status: 'accepted' });

        // Update the acceptedDate field to the current date
        await axiosSecure.put(`/updateAcceptedDate/${agreementId}`);


      // Update the user role to remain the same
      const userRoleResult = await axiosSecure.put(`/updateUserRole/${userEmail}`, { role: 'member' });

      console.log('Updated user role:', userRoleResult.data);

         // Update the local state to reflect the accepted status
         setAcceptedStatus((prevStatus) => ({
            ...prevStatus,
            [agreementId]: true,
          }));
        // Refetch the agreements to update the UI
      refetch();

    } catch (error) {
      console.error('Error accepting agreement:', error);
      // Handle error as needed
    }
  };

  const handleReject = async (agreementId, userEmail) => {
    try {
      // Update the agreement status to 'rejected' on the server
      await axiosSecure.put(`/updateAgreementStatus/${agreementId}`, { status: 'rejected' });

      // Update the rejectedDate field to the current date
      await axiosSecure.put(`/updateRejectedDate/${agreementId}`);

      // Update the user role to remain the same
      const userRoleResult = await axiosSecure.put(`/updateUserRole/${userEmail}`, { role: 'user' });

      // Update the local state to reflect the accepted status (set to false for rejection)
      setAcceptedStatus((prevStatus) => ({
        ...prevStatus,
        [agreementId]: false,
      }));

      // Refetch the agreements to update the UI
      refetch();

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
                  <td className="py-2 px-4 text-center">
                  {agreement.apartmentInfo?.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAccept(agreement._id, agreement.userInfo.email)}
                          className={`bg-green-500 text-white px-2 py-1 mr-2 ${
                            acceptedStatus[agreement._id] ? 'accepted' : ''
                          }`}
                        >
                          {acceptedStatus[agreement._id] ? 'Accepted' : 'Accept'}
                        </button>
                        <button
                            onClick={() => handleReject(agreement._id, agreement.userInfo.email)}
                            className={`bg-red-500 text-white px-2 py-1 ${
                                acceptedStatus[agreement._id] === false ? 'rejected' : ''
                            }`}
                            >
                            {acceptedStatus[agreement._id] === false ? 'Rejected' : 'Reject'}
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
