import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts'; 
import { useAuth } from '../context/AuthContext';
import ProductModal from '../ProductModal/ProductModal';
import { v4 as uuidv4 } from 'uuid';

const Loader = () => (
  <div className="spinner">
    <div>Cargando....</div>
  </div>
);

function CardComponent({ buscarProducto, onAddProduct }) {
  const {
    products: productos,
    loading,
    error,
    addNewProduct,
    editProduct,
    removeProduct,
  } = useProducts();
  const { isAuthenticated } = useAuth();
  const storedUser = JSON.parse(localStorage.getItem('usuario'));
  const isAdmin = storedUser?.role === 'admin';

  const [showModal, setShowModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ id: null, title: '', description: '', price: '', image: '' });

  const openModal = (product = { id: null, title: '', description: '', price: '', image: '' }) => {
    setEditedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSave = (e) => {
    e.preventDefault();
    const productWithId = { ...editedProduct, id: editedProduct.id || uuidv4(), image: `https://unavatar.io/${editedProduct.title}` };
    
    if (editedProduct.id) {
      editProduct(productWithId); 
    } else {
      addNewProduct(productWithId); 
    }
    
    closeModal();
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  const filteredProducts = productos.filter((item) =>
    item.title.toLowerCase().includes(buscarProducto.toLowerCase())
  );

  return (
    <div className="row product-container">
      {filteredProducts.map((item) => (
        <div key={item.id} className="col-3 producto-item mb-3">
          <Card>
            <Card.Img src={item.image} className="producto-imagen" />
            <Card.Body>
              <Card.Title className="titulo">
                <strong>{item.title}</strong>
              </Card.Title>
              <Card.Text className="descripcion">{item.description}</Card.Text>
              <Card.Text className="precio">
                <strong>${item.price}</strong>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              {isAuthenticated && (
                <div className="d-flex justify-content-between">
                  <Link to={`/product/${item.id}`} className="btn btn-primary">
                    Ver Detalle
                  </Link>
                  {isAdmin && (
                    <>
                      <Button variant="warning" onClick={() => openModal(item)}>Editar</Button>
                      <Button variant="danger" onClick={() => removeProduct(item.id)}>Eliminar</Button>
                    </>
                  )}
                </div>
              )}
            </Card.Footer>
          </Card>
        </div>
      ))}
      {isAuthenticated && isAdmin && (
        <div className="fixed-bottom p-2">
          <Button onClick={() => openModal()} className="btn btn-success">Añadir Producto</Button>
        </div>
      )}
      <ProductModal
        showModal={showModal}
        closeModal={closeModal}
        handleSave={handleSave}
        editedProduct={editedProduct}
        handleInputChange={(e) => setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value })}
      />
    </div>
  );
}

export default CardComponent;
