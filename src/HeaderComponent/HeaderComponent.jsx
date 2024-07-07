import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cardIcon from '../icons/card.ico';
import userIcon from '../icons/user.ico';
import favoriteIcon from '../icons/favorite.ico';
import themeIcon from '../icons/theme.ico';
import { ThemeContext } from './../ThemeProvider/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function HeaderComponent({ onSearch, contador, onHomeClick }) {
  const { styles, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated } = useAuth();
  const [buscarProducto, setBuscarProducto] = useState('');
  const navigate = useNavigate();

  const handleBuscador = (event) => {
    const value = event.target.value;
    setBuscarProducto(value);
    onSearch(value);
  };

  const handleCarritoClick = () => {
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      navigate('/login', { state: { from: '/cart' } });
    }
  };

  return (
    <>
      <Navbar className="navbar-container" style={{ ...styles }}>
        <Nav className="nav-links">
          <Nav.Link as={Link} to="/" onClick={onHomeClick}>
              <strong>MiTienda</strong>
          </Nav.Link>
          <Nav.Link as={Link} to="/">INICIO</Nav.Link>
          <Nav.Link as={Link} to="/categorias">CATEGORÍAS</Nav.Link>
          <Nav.Link as={Link} to="/ofertas">OFERTAS</Nav.Link>
          <Nav.Link as={Link} to="/contacto">CONTACTO</Nav.Link>
        </Nav>
        <Form className="form-buscador">
          <Form.Control
            type="search"
            placeholder="Buscar productos"
            aria-label="Search"
            value={buscarProducto}
            onChange={handleBuscador}
          />
        </Form>
        <Link to="/login" className="button-icons">
          <img src={userIcon} alt="Usuario Icono" className="icon" />
        </Link>
        <button className="button-icons">
          <img src={favoriteIcon} alt="Favorito icono" className="icon" />
        </button>
        <button className="button-icons" onClick={toggleTheme}>
          <img alt="Tema Icono" className="icon" src={themeIcon} />
        </button>
        <button className="button-icons" onClick={handleCarritoClick}>
          <span>{contador}</span>
          <img src={cardIcon} alt="Carrito icono" className="icon" />
        </button>
      </Navbar>
    </>
  );
}

export default HeaderComponent;
