import axios from 'axios';
import { toast } from "react-toastify";

const API_BASE_URL = 'http://localhost:3001';

export const fetchData = async (page: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties?page=${page}`);
    return response.data; // Assuming your API returns an array of data
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of an error
  }
};

export const fetchFavoriteListData = async (page: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/favorites_list`);
    return response.data; // Assuming your API returns an array of data
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of an error
  }
};

export const fetchBlogDataDetails = async (id: number): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blog/${id}`);
    return response.data; // Assuming your API returns an object
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // Return null in case of an error
  }
};


export const createBlogAPI = async (data: any): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/blog/create`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const updateBlogAPI = async (postId: number, data: any): Promise<any> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/blog/update/${postId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const deletePropertyById = async (blogId: number): Promise<any> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/blog/${blogId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const addFavoriteById = async (favoriteById: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/favorites`, favoriteById);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
      return null;
    }
  }
};

export const signup = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup.json`, userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const login = async (credentials: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login.json`, credentials);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
      return null;
    }
  }
};