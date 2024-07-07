import React from 'react';
import FooterComponent from './../FooterComponent/FooterComponent';
import HeaderComponent from './../HeaderComponent/HeaderComponent';
import AsideComponent from './../AsideComponent/AsideComponent';

const Layout = ({ children, contador, onSearch, onCarritoClick, onHomeClick, nombreEnviado }) => {
  return (
    <>
      <HeaderComponent
        onSearch={onSearch}
        contador={contador}
        onCarritoClick={onCarritoClick}
        onHomeClick={onHomeClick}
      />
      <AsideComponent nombreEnviado={nombreEnviado || 'Usuario'} />
      <div>{children}</div>
      <FooterComponent />
    </>
  );
}

export default Layout;
