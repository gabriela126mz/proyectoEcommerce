import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import useProducts from '../hooks/useProducts';

const ProductDetail = ({ onAddProduct }) => {
  const { id } = useParams();
  const { products } = useProducts();
  const producto = products.find((producto) => producto.id === id);

  if (!producto) {
    return <div>Producto no encontrado.</div>;
  }

  const handleAddProduct = () => {
    onAddProduct(producto);
  };

  return (
    <Row>
      <Col md={6}>
        <Card>
          <Card.Img src={producto.image} style={{ width: '100%', height: 'auto' }} />
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Body className="producto-body">
            <Card.Title className="titulo"><strong>{producto.title}</strong></Card.Title>
            <Card.Text className="precio"><strong>${producto.price}</strong></Card.Text>
            <Card.Text className="descripcion">{producto.description}</Card.Text>
            <Button onClick={handleAddProduct}>Agregar producto</Button>
            <Link to="/">Ir a la página principal</Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductDetail;
