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
  image_url: string;
}


const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails | null>(null);

  useEffect(() => {
    if (id) {
      const idAsNumber = parseInt(id, 10);
      if (!isNaN(idAsNumber)) {
        fetchPropertyDetails(idAsNumber).then((result) => {
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
           src={propertyDetails.image_url ? (propertyDetails.image_url) : `https://via.placeholder.com/300x200`}
            alt="property"
            className="w-full h-48 object-cover rounded-lg"
          />
          <p className="text-gray-600 text-lg mt-2">${propertyDetails.price}/month</p>
          <p className="text-gray-500 mt-2">title: {propertyDetails.title} </p>

          <p className="text-gray-500 mt-2">Address: {propertyDetails.address} </p>
          <p className="text-gray-500 mt-2">City: {propertyDetails.city} </p>
          <p className="text-gray-500 mt-2">District: {propertyDetails.district} </p>
          <p className="text-gray-500 mt-2">Property_type: {propertyDetails.property_type} </p>
          <p className="text-gray-500 mt-2">Rooms: {propertyDetails.rooms} </p>
        </div>
      )}
    </>
  );
};

export default Details;
