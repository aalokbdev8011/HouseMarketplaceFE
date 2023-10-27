import React from 'react';
import { Link } from 'react-router-dom';

interface HotelProps {
  key: string;
  id: string;
  title: string;
  rate: string;
  city: string;
  district: string[];
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
  image: string;
  openShowDeleteModal: () => void;
  openCreatePropertyModal?: () => void;
}

const API_BASE_URL = 'http://localhost:3001';

const HotelCard: React.FC<HotelProps> = ({ key, id, title, rate, city, isFavorite, image, toggleFavorite, openShowDeleteModal , openCreatePropertyModal}) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const isAdmin = user?.role === "admin";

  return (
    <div className="mx-3 bg-white shadow-lg rounded-lg overflow-hidden" key={key}>
      <div className='relative'>
        <Link to={`/hotel-details/${id}`} className="block">
          <img
          
            src={image ? (API_BASE_URL + image) : `https://via.placeholder.com/300x200`}
            alt={title}
            className="w-full h-40 object-cover"
          />
        </Link>
        <div className="absolute top-2 right-2 cursor-pointer">
          <svg
            onClick={() => toggleFavorite(id)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isFavorite ? 'red' : 'white'}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 16.39 2 12.52 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.02-3.4 7.89-8.55 11.54L12 21.35z" />
          </svg>
        </div>

      </div>
      <div className="p-4 relative">
        <p className="text-lg text-gray-600"><span className='text-red-400'>{rate}</span>/ Per Month</p>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">{city}</p>
        <p className='border-b border-gray-400 my-2'></p>
        <span className="text-sm text-gray-800">3642 Ping <span data-v-6f83f210="">(129594.01 sq.ft)</span></span>
        <p className='text-sm text-gray-600'>MRT： Taipei City Hall</p>
      </div>
      {isAdmin &&
        <div className='flex gap-3 justify-end p-2'>
          <img
            onClick={openShowDeleteModal}
            className="w-8 h-8 cursor-pointer"
            alt="delete"
            src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/127-512.png"
          />
          <img
            onClick={openCreatePropertyModal}
            className="w-8 h-8 cursor-pointer"
            alt="edit"
            src="https://cdn3.iconfinder.com/data/icons/user-interface-web-1/550/web-circle-circular-round_58-512.png"
          />
        </div>}
    </div>
  );
};

export default HotelCard;
