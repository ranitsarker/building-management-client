import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import axiosSecure from '../../../api/axiosSecure';

const MakeAnnouncement = () => {
  const { user } = useAuth(); // Assuming useAuth provides the user information
  const [announcementData, setAnnouncementData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Save announcement data to the server
      const response = await axiosSecure.post('/make-announcement', {
        title: announcementData.title,
        description: announcementData.description,
        user: user.displayName,
      });
  
      // Log the entire response for inspection
      console.log('Server response:', response);
  
      // Optionally, you can show a success message or redirect the user
      console.log('Announcement submitted successfully!');
  
      // Reset form fields after successful submission
      setAnnouncementData({
        title: '',
        description: '',
      });
  
    } catch (error) {
      // Handle error, show error message, etc.
      console.error('Error submitting announcement:', error.message);
    }
  };
  

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Make Announcement</h2>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={announcementData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={announcementData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
