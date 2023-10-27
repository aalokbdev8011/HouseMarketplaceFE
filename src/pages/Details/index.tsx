import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPropertyDetails } from '../../Servicie/ApiService';

const Details: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [propertyDetals, setPropertyDetails] = useState([]);

    useEffect(() => {
        if (id) {
            const idAsNumber = parseInt(id, 10);
            if (!isNaN(idAsNumber)) {
                fetchPropertyDetails(idAsNumber).then((result) => {
                    console.log(result)
                    setPropertyDetails(result)
                })
            }
        }
    }, [id]);

    return (
        <>
            <div className="container mx-auto mt-4 p-4 border rounded-lg shadow-md">
                <img src={'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstatusneo.com%2Ffrom-pixels-to-reality-how-ai-generated-images-are-revolutionizing-industries%2F&psig=AOvVaw1BS5meUX4_O3i1nd3FOlHL&ust=1698469853892000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCIDr77S7lYIDFQAAAAAdAAAAABAR'} alt="property" className="w-full h-48 object-cover rounded-lg" />
                <h2 className="text-2xl font-semibold mt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, corporis placeat deserunt debitis saepe eum, quasi, consectetur veniam architecto vel libero natus ad unde est hic cumque officia odio beatae.</h2>
                <p className="text-gray-600 text-lg mt-2">$125.225</p>
                <p className="text-gray-500 mt-2">lkasjdflkjalksdjflk</p>
                <button
                    className={`mt-4 p-2 rounded-full ${true ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
                >
                    {true ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </>
    );
};

export default Details;