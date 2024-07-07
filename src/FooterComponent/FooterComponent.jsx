import React, { useContext } from 'react';
import { ThemeContext } from "./../ThemeProvider/ThemeContext";

function FooterComponent() {
  const { styles } = useContext(ThemeContext);

  return (
    <footer style={{ ...styles }}>
      <div>
        <div className="row">
          <div className="col">
            <b>Contacto</b>
            <a>Email:info@mitienda.com</a>
            <a>Teléfono: +34 123 456 789</a>
          </div>
          <div className="col">
            <b>Redes Sociales</b>
            <a>Facebook</a>
            <a>Twitter</a>
            <a>Instagram</a>
          </div>
          <div className="col">
            <b>Dirección</b>
            <a>Calle Principal,123</a>
            <a>Ciudad, País</a>
          </div>
        </div>
        <hr/>
        <div>
          <div>
            <p>&copy; 2024 MiTienda. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
