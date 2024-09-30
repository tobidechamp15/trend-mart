import axios from 'axios';

const fetchProductsFromAPI = async () => {
  try {
    const response = await axios.get('https://emaxapi.onrender.com/products/');
    console.log(response.data.products);
    const data = response.data.products;
    return data; // Assuming the API returns an array of products
  } catch (error) {
    console.error(error);
  }
};

export default fetchProductsFromAPI;
