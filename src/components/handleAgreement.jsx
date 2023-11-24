import { saveUser } from "../api/Auth";
const handleAgreement = async (apartment, user) => {
  try {
    if (user) {
      // Prepare the agreement data
      const agreementData = {
        userName: user.displayName,
        userEmail: user.email,
        floorNo: apartment.floorNo,
        blockName: apartment.blockName,
        apartmentNo: apartment.apartmentNo,
        rent: apartment.rent,
        status: 'pending',
      };

      // Save or modify user email, status in DB (optional, remove if not needed)
      await saveUser(user);

      // Send a POST request to your server to store the agreement data
      const response = await fetch('http://localhost:5000/storeAgreement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agreementData),
      });
      
      const responseData = await response.json();

      if (response.ok) {
        // Handle success (maybe show a success message)
        console.log('Agreement stored successfully');
      } else {
        // Handle error (maybe show an error message)
        console.error('Error storing agreement:', responseData.error || 'Unknown error');
    }
    } else {
      // Handle the case where no user is logged in
      console.log('No user is logged in');
    }
  } catch (error) {
    console.error('Error handling agreement:', error);
  }
};

export default handleAgreement;
