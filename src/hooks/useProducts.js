import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:3000/products';

const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productos, setProductos] = useState([]);
  const [editedProduct, setEditedProduct] = useState({
    id: null,
    title: '',
    description: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setProductos(response.data);

      //404
      //const errorResponse = {response: {status:404}};
      //throw await Promise.reject(errorResponse);

      //400 
      //const errorResponse = {response:{status: 400}};
      //throw await Promise.reject(errorResponse);

      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("No products");
        } else {
          setError("Error fetching products");
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }; 
    getProducts();
  }, []);

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProductos((prevProducts) => 
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      setError('Error deleting product');
    }
  };

  const handleEdit = (id, title, description, price) => {
    setEditedProduct({ id, title, description, price, image: `https://unavatar.io/${title}` });
  };

  const handleSave = async () => {
    if (editedProduct.id !== null) {
      editProduct();
    } else {
      createProduct();
    }
  };

  const createProduct = async () => {
    try {
      const newId = uuidv4();
      const newProduct = { ...editedProduct, id: newId, image: `https://unavatar.io/${editedProduct.title}` };
      const response = await axios.post(API_URL, newProduct);
      setProductos((prevProducts) => [...prevProducts, response.data]);
      setEditedProduct({ id: null, title: '', description: '', price: '', image: '' });
    } catch (error) {
      console.log("Error creating product: ", error);
    }
  };

  const editProduct = async () => {
    try {
      const response = await axios.put(`${API_URL}/${editedProduct.id}`, editedProduct);
      const updatedProduct = response.data;
      setProductos((prevProducts) =>
        prevProducts.map((product) => (
          product.id === updatedProduct.id ? updatedProduct : product)
        )
      );
      setEditedProduct({ id: null, title: '', description: '', price: '', image: '' });
    } catch (error) {
      console.log("Error editing product: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const addProduct = () => {
    setEditedProduct({ id: null, title: '', description: '', price: '', image: '' });
  };

  return {
    productos,
    editedProduct,
    eliminarProducto,
    handleEdit,
    handleSave,
    handleInputChange,
    addProduct,
    loading,
    error,
    setError,
  };
};

export default useProducts;
