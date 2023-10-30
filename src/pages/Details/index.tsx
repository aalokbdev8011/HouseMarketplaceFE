import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPropertyDetails } from '../../Servicie/ApiService';

interface PropertyDetails {
  price: number;
  title: string;
  address: string;
  city: string;
  district: string;
  property_type: string;
  rooms: number;
  image: string;
}

const API_BASE_URL = 'http://localhost:3001';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails | null>(null);

  useEffect(() => {
    if (id) {
      const idAsNumber = parseInt(id, 10);
      if (!isNaN(idAsNumber)) {
        fetchPropertyDetails(idAsNumber).then((result) => {
          console.log(result.data);
          setPropertyDetails(result.data.attributes);
        });
      }
    }
  }, [id]);

  return (
    <>
      {propertyDetails && (
        <div className="container mx-auto mt-4 p-4 border rounded-lg shadow-md">
          <img
           src={propertyDetails.image ? (API_BASE_URL + propertyDetails.image) : `https://via.placeholder.com/300x200`}
            alt="property"
            className="w-full h-48 object-cover rounded-lg"
          />
          <h2 className="text-2xl font-semibold mt-4"></h2>
          <p className="text-gray-600 text-lg mt-2">${propertyDetails.price}/month</p>
          <p className="text-gray-500 mt-2">title: {propertyDetails.title} </p>

          <p className="text-gray-500 mt-2">Address: {propertyDetails.address} </p>
          <p className="text-gray-500 mt-2">City: {propertyDetails.city} </p>
          <p className="text-gray-500 mt-2">District: {propertyDetails.district} </p>
          <p className="text-gray-500 mt-2">Property_type: {propertyDetails.property_type} </p>
          <p className="text-gray-500 mt-2">Rooms: {propertyDetails.rooms} </p>

          {/* <button
                    className={`mt-4 p-2 rounded-full ${true ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
                >
                    {true ? 'Remove from Favorites' : 'Add to Favorites'}
                </button> */}
        </div>
      )}
    </>
  );
};

export default Details;
