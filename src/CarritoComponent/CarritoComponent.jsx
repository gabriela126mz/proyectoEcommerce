import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

function CarritoComponent({ carrito, data, onCompra, onResetearCarrito }) {

  const totalAPagar = Object.keys(carrito).reduce((total, productId) => {
    const product = data.find(item => item.id === parseInt(productId));
    return total + (product.price * carrito[productId]);
  }, 0);

  const handleCompra = () => {
    alert("Serás redirigido a la pasarela de pago");
    onCompra();
  };

  const handleResetearCarrito = () => {
    onResetearCarrito();
  };

  return (
    <div className="row product-container">
      <h2>Carrito de compra</h2>
      {Object.keys(carrito).map((productId) => {
        const product = data.find(item => item.id === parseInt(productId));
        return (
          <div key={productId} >
            <Card>
              <Row>
                <Col>
                  <Card.Img src={product.image} style={{width:'25%',height:'70%',margin:'5%'}}/>
                </Col>
                <Col>
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>Cantidad: {carrito[productId]}</Card.Text>
                    <Card.Text>Precio por unidad: ${product.price}</Card.Text>
                    <Card.Text>Precio Total: ${product.price * carrito[productId]}</Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </div>
        );
      })}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
          <button className="btn btn-primary" style={{ backgroundColor: "blue", marginRight: '10px' }} onClick={handleCompra}>Comprar</button>
          <button className="btn btn-danger" style={{ backgroundColor: "red" }} onClick={handleResetearCarrito}>Resetear carrito</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <h4><strong>Total a pagar: ${totalAPagar}</strong></h4>
      </div>
    </div>
  );
}

export default CarritoComponent;
