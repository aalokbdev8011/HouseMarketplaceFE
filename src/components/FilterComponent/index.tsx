// FilterComponent.tsx
import React, { useState } from 'react';

interface FilterComponentProps {
    onSearch: (filters: FilterCriteria) => void;
}

interface FilterCriteria {
    city: string;
    district: string;
    priceMin: string;
    priceMax: string;
    propertyType: string;
}

function FilterComponent({ onSearch }: FilterComponentProps) {
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [propertyType, setPropertyType] = useState('');


    const handleSearch = () => {
        const filters: FilterCriteria = {
            city: city,
            district: district, // Use type assertion to convert district to string[]
            priceMin: priceMin,
            priceMax: priceMax,
            propertyType: propertyType,
        };

        onSearch(filters);
    };

    return (
        <div className=' w-full p-5 bg-white rounded-md flex lg:justify-between justify-start border items-end lg:flex-nowrap flex-wrap lg:gap-0 gap-3'>
            <div className='flex flex-col sm:w-auto w-full'>
                <label>Type</label>
                <select className="appearance-none w-25 bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 mr-2" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="residential">Residential</option>
                    <option value="office">Office</option>
                    <option value="retail">Retail</option>
                </select>
            </div>
            <div className='flex flex-col sm:w-auto w-full'>
                <label>City</label>
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border p-2 rounded"
                />
            </div>
            <div className="relative inline-block text-left sm:w-auto w-full">
                <label>District</label>
                <input
                    type="text"
                    placeholder="District"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full border p-2 rounded"
                />
            </div>

            <div className='flex flex-col ml-2 relative sm:w-auto w-full'>
                <label>Minimum Price</label>
                <input
                    type="text"
                    placeholder="Minimum Price"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    onKeyPress={(e: { key: string; preventDefault: () => void; }) => {
                        if (e.key !== '0' && e.key !== '1' && e.key !== '2' && e.key !== '3' && e.key !== '4' && e.key !== '5' && e.key !== '6' && e.key !== '7' && e.key !== '8' && e.key !== '9' && e.key !== 'Backspace') {
                            e.preventDefault();
                        }
                    }}
                    className="w-full border p-2 rounded"
                />
                <span className='absolute bottom-0 right-0 px-3 p-[9px] bg-gray-300'>ping</span>
            </div>
            <div className='flex flex-col ml-2 relative  sm:w-auto w-full'>
                <label>Maximum Price</label>
                <input
                    type="text"
                    placeholder="Maximum Price"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    onKeyPress={(e: { key: string; preventDefault: () => void; }) => {
                        if (e.key !== '0' && e.key !== '1' && e.key !== '2' && e.key !== '3' && e.key !== '4' && e.key !== '5' && e.key !== '6' && e.key !== '7' && e.key !== '8' && e.key !== '9' && e.key !== 'Backspace') {
                            e.preventDefault();
                        }
                    }}
                    className="w-full border p-2 rounded"
                />
                <span className='absolute bottom-0 right-0 px-3 p-[9px] bg-gray-300'>ping</span>
            </div>
            <button className="bg-gradient-to-r from-blue-300 to-cyan-700 text-white p-2 h-10 rounded shadow-md hover:shadow-lg ml-2" onClick={handleSearch}>Search</button>
        </div>
    );
}

export default FilterComponent;
