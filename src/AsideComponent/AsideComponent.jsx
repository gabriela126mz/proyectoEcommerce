import React from 'react';
import { useAuth } from './../context/AuthContext';

function AsideComponent() {
  const { user } = useAuth();

  return (
    <aside>
      <div className="descuento">
        <b>
          {user && user.name !== 'Usuario'
            ? `¡${user.name}, aprovéchate de tu 20% de descuento!`
            : 'Crea una cuenta aquí para disfrutar de nuestros descuentos'}
        </b>
      </div>
    </aside>
  );
}

export default AsideComponent;
