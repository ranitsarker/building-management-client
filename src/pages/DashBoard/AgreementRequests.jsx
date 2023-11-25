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
