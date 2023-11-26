import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import axiosSecure from '../../../api/axiosSecure';

const Announcements = () => {
  const { user } = useAuth();
  console.log('current user: ', user);
  const { data: announcements, error, isLoading } = useQuery({
    queryKey: 'announcements',
    queryFn: async () => {
      const response = await axiosSecure.get('/fetchAllAnnouncements');
      return response.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching announcements: {error.message}</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Announcements</h2>
      {announcements.length === 0 ? (
        <p>No Announcements</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              <p className="text-xl font-semibold mb-2">
                Announcement ID: {announcement._id}
              </p>
              <p>Title: {announcement?.title}</p>
              <div className="description-container">
                <p className="description break-words whitespace-pre-line">{announcement?.description}</p>
              </div>
              <p>Announced by: {announcement?.user}</p>
              <p>Created At: {announcement.createdAt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
