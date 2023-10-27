// FilterComponent.tsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface FilterComponentProps {
    onSearch: (filters: FilterCriteria) => void;
}

interface FilterCriteria {
    city: string;
    district: string[];
    priceMin: string;
    priceMax: string;
    propertyType: string;
    fare: string;
}

const districtNamesTaipeiCity = [
    'Zhongzheng',
    'Da’an',
    'Xinyi',
    'Zhongshan',
    'Songshan',
    'Shilin',
    'Beitou',
    'Neihu',
    'Nangang',
    'Wanhua',
    'Datong',
    'Wenshan',
];
const districtNamesNewTaipeiCity = [
    'Banqiao',
    'Sanchong',
    'Shulin',
    'Tamsui',
    'Tucheng',
    'Xindian',
    'Xinzhuang',
    'Xizhi',
    'Yonghe',
    'Zhonghe'
];

function FilterComponent({ onSearch }: FilterComponentProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState<string[]>([]);
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [fare, setFare] = useState('');

    const handleCityChange = (e: { target: { value: string; }; }) => {
        const selectedCity = e.target.value as 'Taipei City' | 'New Taipei City';
        setCity(selectedCity);
    };

    const toggleDropdown = () => {
        if (!city) {
            toast.info('select city first');
        } else {
            setIsOpen(!isOpen);
        }
    };

    const handleCheckboxChange = (value: string) => {
        if (selectedCheckboxes.includes(value)) {
            setSelectedCheckboxes(selectedCheckboxes.filter((item) => item !== value));
        } else {
            setSelectedCheckboxes([...selectedCheckboxes, value]);
        }
    };

    const handleSearch = () => {
        const filters: FilterCriteria = {
            city: city,
            district: district, // Use type assertion to convert district to string[]
            priceMin: priceMin,
            priceMax: priceMax,
            propertyType: propertyType,
            fare: fare,
        };

        onSearch(filters);
    };


    const dataToMap = city === "Taipei City" ? districtNamesTaipeiCity : districtNamesNewTaipeiCity;

    return (
        <div className=' w-full p-5 bg-gray-light border'>

            <select className="appearance-none w-25 bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 mr-2" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="Residential">Residential</option>
                <option value="Office">Office</option>
                <option value="Retail">Retail</option>
            </select>

            <select className="appearance-none w-25 bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 mr-2" value={city} onChange={handleCityChange}>
                <option value="">Select City</option>
                <option value="Taipei City">Taipei City</option>
                <option value="New Taipei City">New Taipei City</option>
            </select>
            <div className="relative inline-block text-left">
                <button
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-full  px-4 py-2 text-sm font-medium text-blabk bg-white border border-gray-light  focus:outline-none"
                >
                    - Please Select -
                </button>

                {isOpen && (
                    <div className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                            {dataToMap.map((districtName) => (
                                <label key={districtName} className="inline-flex items-center ml-4">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                        checked={selectedCheckboxes.includes(districtName)}
                                        onChange={() => handleCheckboxChange(districtName)}
                                    />
                                    <span className="ml-2">{districtName}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <input
                type="text"
                placeholder="Minimum Price"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-72 border p-2 rounded ml-2"
            />
            <input
                type="text"
                placeholder="Maximum Price"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-72 border p-2 rounded ml-2"
            />
            <button className="bg-gray-500 text-white py-2 px-4 hover:bg-blue-700 ml-2" onClick={handleSearch}>Search</button>
        </div>
    );
}

export default FilterComponent;
