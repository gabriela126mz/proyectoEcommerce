import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function CardComponent({ data = [], buscarProducto }) {
  const { isAuthenticated } = useAuth();
  
  const filtroProductos = data.filter((item) =>
    item.title.toLowerCase().includes(buscarProducto.toLowerCase())
  );

  return (
    <div className="row product-container">
      {filtroProductos.map((item) => (
        <div key={item.id} className="col-2 producto-item">
          <Card>
            <Card.Img src={item.image} className="producto-imagen" />
            <Card.Body className="producto-body">
              <Card.Title className="titulo"><strong>{item.title}</strong></Card.Title>
              <Card.Text className="descripcion">{item.description}</Card.Text>
              <Card.Text className="precio"><strong>${item.price}</strong></Card.Text>
              {isAuthenticated ? (
                <Link to={`/product/${item.id}`} className="btn btn-primary">Ver Detalle</Link>
              ) : null}
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default CardComponent;
