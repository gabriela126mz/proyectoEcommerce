import React from 'react';
import { Card, Button } from 'react-bootstrap';

function CardComponent({ data = [], buscarProducto, onAddProduct }) {
  const filtroProductos = data.filter((item) =>
    item.title.toLowerCase().includes(buscarProducto.toLowerCase())
  );

  const handleAddProduct = (productId) => {
    onAddProduct(productId);
  };

  return (
    
    <div className="row product-container">
      {filtroProductos.map((item) => (
        <div key={item.id} className="col-2 producto-item">
          <Card>
            <Card.Img src={item.image} className="producto-imagen" />
            <Card.Body className="producto-body">
              <Card.Title className="titulo"><strong>{item.title}</strong></Card.Title><br />
              <Card.Text className="descripcion">{item.description}</Card.Text>
              <Card.Text className="precio"><strong>${item.price}</strong></Card.Text>
              <Button onClick={() => handleAddProduct(item.id)}><strong>Añadir producto</strong></Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default CardComponent;
