
function AsideComponent({ nombreEnviado }) {
  return (
    <aside>
      <div className="descuento">
        <b>
          {nombreEnviado && nombreEnviado !== 'Usuario'
            ? `¡${nombreEnviado}, aprovéchate de tu 20% de descuento!`
            : "Crea una cuenta aquí para disfrutar de nuestros descuentos"}
        </b>
      </div>
    </aside>
  );
}

export default AsideComponent;
