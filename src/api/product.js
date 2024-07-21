import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/products';

const productAPI = {
  fetchProducts: async () => {
    try {
      const response = await axios.get(API_BASE_URL); 
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  },

  addProduct: async (product) => {
    try {
      const response = await axios.post(API_BASE_URL, product);
      return response.data;
    } catch (error) {
      throw new Error('Error al agregar el producto');
    }
  },

  updateProduct: async (product) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${product.id}`, product);
      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  },

  deleteProduct: async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${productId}`);
      return productId;
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  },
};

export default productAPI;
