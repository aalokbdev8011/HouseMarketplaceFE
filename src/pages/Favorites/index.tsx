import React, { useEffect, useState } from 'react';
import HotelCard from '../../components/Card';
import { removeFavoriteById, fetchFavoriteListData } from '../../Servicie/ApiService';
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
        image_url: string;
        is_favorite: boolean;

    }
}

const ITEMS_PER_PAGE = 6;

const Favorites: React.FC = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchFavoritProperty(currentPage);
    }, [currentPage]);

    const fetchFavoritProperty = async (page: number) => {
        const response = await fetchFavoriteListData(page);
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
        const idNumber = parseInt(id, 10);
        removeFavoriteById(idNumber).then((result) => {
            if (result) {
                fetchFavoritProperty(currentPage);
            }
        });
    };

    const handleDelete = () => {

    };


    return (
        <div className=' bg-gray-100'>
            <div className="max-w-[1200px] mx-auto">
                <h1 className="text-2xl font-bold">Favorites</h1>
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
                                isFavorite={hotel.attributes.is_favorite}
                                toggleFavorite={toggleFavorite}
                                image={hotel.attributes.image_url}
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
                    maxVisiblePages={5}
                />
            </div>
        </div>
    );
};

export default Favorites;
