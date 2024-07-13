import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import { useAuth } from '../context/AuthContext';
import ProductModal from '../ProductModal/ProductModal';

const Loader = () => {
  return (
    <div className="spinner">
      <div>Cargando....</div>
    </div>
  );
};


function CardComponent({ data = [], buscarProducto }) {
  const { 
    productos, 
    editedProduct, 
    eliminarProducto, 
    handleEdit, 
    handleSave, 
    handleInputChange, 
    addProduct, 
    loading, 
    error, 
    setError 
  } = useProducts();
  const { isAuthenticated } = useAuth();
  const storedUser = JSON.parse(localStorage.getItem('usuario'));
  const isAdmin = storedUser?.role === 'admin';

  useEffect(() => {
    if (error) {
      alert(error);
      setError(null);
    }
  }, [error]);

  const filtroProductos = productos.filter((item) =>
    item.title.toLowerCase().includes(buscarProducto.toLowerCase())
  );

  const [showModal, setShowModal] = useState(false);
  const openModal = () => { setShowModal(true);};

  const closeModal = () => {
    setShowModal(false);
    addProduct();
  };

  if (loading) { return <Loader />;}

  return (
    <div className="row product-container">
      {filtroProductos.map((item) => (
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
                  <Link to={`/product/${item.id}`} className="btn btn-primary">Ver Detalle</Link>
                  {isAdmin && (
                    <>
                      <Button variant="warning" onClick={() => {
                        handleEdit(item.id, item.title, item.description, item.price);
                        openModal();
                      }}>Editar</Button>
                      <Button variant="danger" onClick={() => eliminarProducto(item.id)}>Eliminar</Button>
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
          <Button onClick={openModal} className="btn btn-success">Añadir Producto</Button>
        </div>
      )}
      <ProductModal
        showModal={showModal}
        closeModal={closeModal}
        handleSave={handleSave}
        editedProduct={editedProduct}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default CardComponent;
