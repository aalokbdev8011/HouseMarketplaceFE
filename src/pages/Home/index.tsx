import React, { useEffect, useState } from 'react';
import HotelCard from '../../components/Card';
import { addFavoriteById, deletePropertyById, fetchData, filterProperty, removeFavoriteById } from '../../Servicie/ApiService';
import Pagination from '../../components/Pagination';
import DeleteModal from '../../components/DeleteModal';
import CreatePropertyModal from '../../components/CreatePropertyModal';
import FilterComponent from '../../components/FilterComponent';

interface Hotel {
  id: string;
  type: string;
  attributes: {
    id: number;
    title: string;
    price: string;
    city: string;
    district: string[];
    address: string | null;
    mrt_station: string;
    property_type: string;
    is_favorite: boolean;
    rooms: number;
    created_at: string;
    updated_at: string;
    image: string;
  }
}

const ITEMS_PER_PAGE = 6;

const Home: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreatePropertyModal, setShowCreatePropertyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [propertyId, setPropertyId] = useState<number>();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetchHotels(currentPage);
  }, [currentPage]);

  const fetchHotels = async (page: number) => {
    const response = await fetchData(page);
    if (response && response.properties && response.properties.data) {
      setHotels(response.properties.data);
      const pages = Math.ceil(response.items_count / ITEMS_PER_PAGE);
      setTotalPages(pages || 0); // Set total items from the API response
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openShowDeleteModal = (id: string) => {
    setShowDeleteModal(true);
    const idNumber = parseInt(id, 10);
    setPropertyId(idNumber)
  }

  const openCreatePropertyModal = () => {
    setShowCreatePropertyModal(true);
  }

  const toggleFavorite = (id: string, isFavorite: boolean) => {
    const idNumber = parseInt(id, 10);
    const data = {
      "property_id": idNumber
    }
    if (isFavorite) {
      removeFavoriteById(idNumber).then((result) => {
        if (result) {
          console.log('result', result)
          fetchHotels(currentPage);
        }
      });
    } else {
      addFavoriteById(data).then((result) => {
        if (result) {
          console.log('result', result)
          fetchHotels(currentPage);
        }
      });
    }

  };

  const handleDelete = async () => {
    if (propertyId !== undefined) {
     const res = await deletePropertyById(propertyId);
     console.log('res', res);
    }

  };

  const handleSearch = async (filters: any) => {
    setLoading(true);
    const response = await filterProperty(currentPage, filters);
    if (response && response.properties && response.properties.data) {
      setHotels(response.properties.data);
      const pages = Math.ceil(response.items_count / ITEMS_PER_PAGE);
      setTotalPages(pages || 0); // Set total items from the API response
    } else {
      setHotels([]); // Set hotels to an empty array when no data is found
    }
    setLoading(false);
  };



  return (
    <div className=' bg-gray-100'>
      <div className="max-w-[1200px] lg:mx-auto mx-3 ">
        <div className='flex justify-between py-5'>

          <h1 className="text-2xl text-cyan-800 font-semibold">Home</h1>
          {isAdmin && <button className="bg-gradient-to-r from-blue-300 to-cyan-700 text-white p-2 rounded shadow-md hover:shadow-lg" onClick={openCreatePropertyModal}>Create Property</button>}

        </div>
        <FilterComponent onSearch={handleSearch} />
        {loading ? ( // Render the loader when loading is true
          <div className="text-center mt-4">
            Loading...
          </div>
        ) : (
          <div className="flex justify-center w-full flex-wrap items-center min-h-screen">
            {hotels.length === 0 ? ( // Render a message when there are no properties
              <div className="text-center mt-4">
                No properties found.
              </div>
            ) : (
              hotels.map((hotel) => (
                <div key={hotel.id} className="md:w-1/3 sm:w-1/2 w-full my-3">
                  <HotelCard
                    key={hotel.id}
                    id={hotel.id}
                    title={hotel.attributes.title}
                    rate={hotel.attributes.price}
                    city={hotel.attributes.city}
                    district={hotel.attributes.district}
                    isFavorite={hotel.attributes.is_favorite}
                    toggleFavorite={toggleFavorite}
                    image={hotel.attributes.image}
                    openShowDeleteModal={openShowDeleteModal}
                    openCreatePropertyModal={openCreatePropertyModal}
                  />
                </div>
              ))
            )}
          </div>
        )}
        <CreatePropertyModal
          isOpen={showCreatePropertyModal}
          onCancel={() => setShowCreatePropertyModal(false)}
        />
        <DeleteModal
          isOpen={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
        <div className='flex justify-center mb-10 mt-5'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange} 
            maxVisiblePages={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
