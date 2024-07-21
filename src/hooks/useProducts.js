import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from '../redux/reducers/productSlice';

const useProducts = () => {
  const dispatch = useDispatch();
  
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const addNewProduct = (product) => {
    dispatch(addProduct(product));
  };

  const editProduct = (product) => {
    dispatch(updateProduct(product));
  };

  const removeProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return {
    products,
    loading,
    error,
    addNewProduct,
    editProduct,
    removeProduct
  };
};

export default useProducts;
