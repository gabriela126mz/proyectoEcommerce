import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";
import "./../App.css";

function FormLogin({ onFormSubmit }) {
  const [nombreValor, setNombreValor] = useState("");
  const [emailValor, setEmailValor] = useState("");
  const { login, isAuthenticated, logout } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeNombre = (e) => setNombreValor(e.target.value);
  const handleChangeEmail = (e) => setEmailValor(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(nombreValor, emailValor);
    login();
    const redirectPath = location.state?.from?.pathname || "/";
    navigate(redirectPath, { replace: true });
  };

  return (
    <div className="formLoginContainer">
      <div className="loginStyle">
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombreValor}
            onChange={handleChangeNombre}
          />
          <label>Email:</label>
          <input
            type="email"
            value={emailValor}
            onChange={handleChangeEmail}
          />
          <button type="submit" style={{ display: "block", margin: "auto" }}>
            Entrar
          </button>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            {isAuthenticated && (
              <Link type="button" onClick={() => logout()}>
                Cerrar Sesión
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;
