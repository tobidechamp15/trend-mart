import axios from 'axios';

const fetchProductsFromAPI = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    response.data;
    const data = response.data;
    return data; // Assuming the API returns an array of products
  } catch (error) {
    console.error(error);
  }
};

export default fetchProductsFromAPI;
