import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProductModal = ({ showModal, closeModal, handleSave, editedProduct, handleInputChange }) => {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{editedProduct.id !== null ? 'Editar Producto' : 'Añadir Producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={(e) => { handleSave(e); closeModal(); }}>
          <div>
            <label>Título del Producto</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={editedProduct.title}
              onChange={handleInputChange}/>
          </div>
          <div>
            <label>Descripción del Producto</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={editedProduct.description}
              onChange={handleInputChange}/>
          </div>
          <div>
            <label>Precio del Producto</label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              placeholder="Ingrese el precio del producto"/>
          </div>
          <Button variant="primary" type="submit">
            {editedProduct.id !== null ? 'Guardar Cambios' : 'Añadir Producto'}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
