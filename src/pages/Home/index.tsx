import React, { useEffect, useState } from 'react';
import HotelCard from '../../components/Card';
import { addFavoriteById, fetchData } from '../../Servicie/ApiService';
import Pagination from '../../components/Pagination';
import DeleteModal from '../../components/DeleteModal';

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
    rooms: number;
    created_at: string;
    updated_at: string;
    images: any;
  }
}

const ITEMS_PER_PAGE = 6;

const Home: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchHotels(currentPage);
  }, [currentPage]);

  const fetchHotels = async (page: number) => {
    const response = await fetchData(page);
    if (response && response.properties && response.properties.data) {
      setHotels(response.properties.data);
      const pages = Math.ceil(response.total_item / ITEMS_PER_PAGE);
      setTotalPages(pages || 0); // Set total items from the API response
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openShowDeleteModal = () => {
    setShowDeleteModal(true);
  }

  const toggleFavorite = (id: string) => {
    console.log('===')
    const idNumber = parseInt(id, 10);
    const data = {
      "propert_id": idNumber
    }
    addFavoriteById(data).then((result) => {
      if (result) {
        console.log('result', result)
        fetchHotels(currentPage);
      }
    });
  };

  const handleDelete = () => {

  };


  return (
    <div className=' bg-gray-100'>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-center w-full flex-wrap items-center min-h-screen">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="md:w-1/3 sm:w-1/2 w-full my-3">
              <HotelCard
                key={hotel.id}
                id={hotel.id}
                title={hotel.attributes.title}
                rate={hotel.attributes.price}
                city={hotel.attributes.city}
                district={hotel.attributes.district}
                isFavorite={false}
                toggleFavorite={toggleFavorite}
                image={hotel.attributes.images}
                openShowDeleteModal={openShowDeleteModal}
              />
            </div>
          ))}
        </div>
        <DeleteModal
          isOpen={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

    </div>
  );
};

export default Home;
