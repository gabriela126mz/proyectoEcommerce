import {Link} from "react-router-dom"

const NotFound = () => {
    return (
            <div className="container-app ">
                <h1><strong>Página no encontrada</strong></h1>
                <p>Lo sentimos, la página que buscas no existe</p>
                <Link to="/">Ir a la página principal</Link>
            </div>
    );
}

export default NotFound;
