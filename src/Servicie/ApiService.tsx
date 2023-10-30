import axios from 'axios';
import { toast } from "react-toastify";

const API_BASE_URL = 'https://housemarketplace.onrender.com';

const jwtToken = () => {
  return localStorage.getItem('jwtToken');
}

export const fetchData = async (page: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties?page=${page}`, {
      headers: {
        Authorization: jwtToken() ? jwtToken() : ''
      }
    }
    );
    return response.data; // Assuming your API returns an array of data
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of an error
  }
};

export const fetchFavoriteListData = async (page: number) => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    const response = await axios.get(`${API_BASE_URL}/favorites`, {
      headers: {
        Authorization: `${jwtToken}`
      }
    });

    return response.data; // Assuming your API returns an array of data
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of an error
  }
};

export const filterProperty = async (page: number, filters: any) => {
  try {
    let apiUrl = `${API_BASE_URL}/properties/filter_properties?page=${page}`;

    if (filters.city) {
      apiUrl += `&city=${filters.city}`;
    }
    if (filters.district) {
      apiUrl += `&district=${filters.district}`;
    }
    if (filters.priceMin) {
      apiUrl += `&priceMin=${filters.priceMin}`;
    }
    if (filters.priceMax) {
      apiUrl += `&priceMax=${filters.priceMax}`;
    }
    if (filters.propertyType) {
      apiUrl += `&propertyType=${filters.propertyType}`;
    }
    if (filters.fare) {
      apiUrl += `&fare=${filters.fare}`;
    }
    const response = await axios.get(apiUrl);
    return response.data; // Assuming your API returns an array of data
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of an error
  }
};

export const fetchPropertyDetails = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties/${id}`);
    return response.data; // Assuming your API returns an object
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // Return null in case of an error
  }
};


export const createPropertyAPI = async (data: any) => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    const response = await axios.post(`${API_BASE_URL}/properties`, data, {
      headers: {
        Authorization: `${jwtToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    return null;
  }
};

export const updatePropertyAPI = async (postId: number, data: any): Promise<any> => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    const response = await axios.put(`${API_BASE_URL}/properties/${postId}`, data, {
      headers: {
        Authorization: `${jwtToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const deletePropertyById = async (id: number) => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    const response = await axios.delete(`${API_BASE_URL}/properties/${id}`, {
      headers: {
        Authorization: `${jwtToken}`
      }
    });
    return response.data;
  } catch (error) {
    return null
  }
};


export const removeFavoriteById = async (favoriteById: any) => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    const response = await axios.delete(
      `${API_BASE_URL}/favorites/${favoriteById}`,
      {
        headers: {
          Authorization: `${jwtToken}`
        }
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
      return null;
    }
  }
};
export const addFavoriteById = async (favoriteById: any) => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken !== undefined) {
      const response = await axios.post(
        `${API_BASE_URL}/favorites`,
        favoriteById,
        {
          headers: {
            Authorization: `${jwtToken}`
          }
        }
      );
      return response.data;
    } else {
      toast.error('You need to login before adding favourite');
    }

  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
      return null;
    }
  }
};

export const signup = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    return null;
  }
};

export const login = async (credentials: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/sign_in`, credentials);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
      return null;
    }
  }
};
