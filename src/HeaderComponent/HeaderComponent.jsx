import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cardIcon from '../icons/card.ico';
import userIcon from '../icons/user.ico';
import favoriteIcon from '../icons/favorite.ico';
import themeIcon from '../icons/theme.ico';
import { ThemeContext } from './../ThemeProvider/ThemeContext';

function HeaderComponent({ onSearch, contador, onCarritoClick, onHomeClick }) {
  
  const { styles, toggleTheme } = useContext(ThemeContext);
  const [buscarProducto, setBuscarProducto] = useState('');

  const handleBuscador = (event) => {
    const value = event.target.value;
    setBuscarProducto(value);
    onSearch(value);
  };

  return (
    <>
      <Navbar className="navbar-container" style={{ ...styles }}>
        <Nav className="nav-links">
          <Nav.Link onClick={onHomeClick}><strong>MiTienda</strong></Nav.Link>
          <Nav.Link>INICIO</Nav.Link>
          <Nav.Link>CATEGORÍAS</Nav.Link>
          <Nav.Link>OFERTAS</Nav.Link>
          <Nav.Link>CONTACTO</Nav.Link>
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
        <button className="button-icons">
          <img src={userIcon} alt="Usuario Icono" className="icon" />
        </button>
        <button className="button-icons">
          <img src={favoriteIcon} alt="Favorito icono" className="icon" />
        </button>
        <button className="button-icons" onClick={toggleTheme}>
          <img alt="Tema Icono" className="icon" src={themeIcon} />
        </button>
        <button className="button-icons" onClick={onCarritoClick}>
          <span>{contador}</span>
          <img src={cardIcon} alt="Carrito icono" className="icon" />
        </button>
      </Navbar>
    </>
  );
}

export default HeaderComponent;
