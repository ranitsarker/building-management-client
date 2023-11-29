const ApartmentLocation = () => {
  return (
    <section className="p-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Apartment Location</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-md">
                <img src={location.image} alt={location.name} />
              <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
              <p className="text-gray-600">{location.address}</p>
              <p className="text-gray-600">{location.phoneNumber}</p>
              <p className="text-gray-600">{location.zipCode}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Sample locations data
const locations = [
    {
      image:'https://i.ibb.co/qmdQw9p/1.png',
      name: 'Location 1',
      address: 'Plot #176, Block-B, Banasree R/A, 1219, Dhaka, Dhaka, Bangladesh',
    },
    {
    image:'https://i.ibb.co/fNM6wzv/2.png',
      name: 'Location 2',
      address: 'Road #15, Block - D, Banani, 1213, Dhaka, Dhaka, Bangladesh',
    },
    {
        image:'https://i.ibb.co/mSWSx1f/3.png',
      name: 'Location 3',
      address: '86, Nawabpur Road, Old Dhaka, 1100, Dhaka, Dhaka, Bangladesh',
      phoneNumber: '02 7176751 / 02 7174668',

    },
    {
        image:'https://i.ibb.co/bsrSzns/4.png',
      name: 'Location 4',
      address: '20/A, Purana Paltan Line, (2nd Floor), 1000, Dhaka, Dhaka, Bangladesh',
      phoneNumber: '017 11235664',

    },
    {
        image:'https://i.ibb.co/p1Y7zVK/5.png',
      name: 'Location 5',
      address: 'Jamalkhan (3rd & 4th Floor), Chittagong, Chittagong, 4000, Dhaka, Dhaka, Bangladesh',
      phoneNumber: '031 622265 / 031 624787',

    },
    { 
        image:'https://i.ibb.co/YLy32D9/6.png',
      name: 'Location 6',
      address: 'Plot-E (5th Floor), Meherba Plaza, Paltan, 1000, Dhaka, Dhaka, Bangladesh',
      phoneNumber: '02 9565190 / 02 9565256',

    },
    {
        image:'https://i.ibb.co/4JL91p2/7.png',
      name: 'Location 7',
      address: 'Lake Circus Road, Kalabagan, Dhanmondi, 1205, Dhaka, Dhaka, Bangladesh',
      phoneNumber: '02 9119227',

    },
    {
        image:'https://i.ibb.co/YD0Z7Bw/8.png',
      name: 'Location 8',
      address: 'Kalwalapara, Sweden Super Market, Mirpur, 1216, Dhaka, Dhaka, Bangladesh',
      phoneNumber: '02 8018178',

    },
    {
        image:'https://i.ibb.co/d57b1BJ/9.png',
      name: 'Location 9',
      address: 'Room #342 (Annex Building), Supreme Court Bar Association Building, Ramna, 1000, Dhaka, Dhaka, Bangladesh',

    },
    {
        image:'https://i.ibb.co/7X2RYWs/10.png',
      name: 'Location 10',
      address: 'Room #14 (New-127), Supreme Court Bar Association Building, 1000, Dhaka, Dhaka, Bangladesh',
    },
    {
        image:'https://i.ibb.co/8DWD60n/11.png',
      name: 'Location 11',
      address: 'M.A.G. Osmani Medical College, Sylhet, Sylhet, 3100, Dhaka, Dhaka, Bangladesh',
    },
    {
        image:'https://i.ibb.co/qYcbcyg/12.png',
      name: 'Location 12',
      address: 'kazi nazrul islam avenue, c. a. bhaban (4th floor), kawran bazar, 1215',
    },
  ];

export default ApartmentLocation;
