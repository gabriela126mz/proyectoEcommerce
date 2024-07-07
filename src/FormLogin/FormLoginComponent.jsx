import React, { useState, useEffect } from "react";
import "./../App.css";

function FormLogin({ onFormSubmit }) {
  const [nombreValor, setNombreValor] = useState("");
  const [emailValor, setEmailValor] = useState("");


  useEffect(() => {
    const localNombre = localStorage.getItem("nombreEnviado") || "";
    const localEmail = localStorage.getItem("emailEnviado") || "";
    setNombreValor(localNombre);
    setEmailValor(localEmail);

    return () => {
      localStorage.removeItem("nombreEnviado");
      localStorage.removeItem("emailEnviado");
    };
  }, []);

  const handleChangeNombre = (e) => setNombreValor(e.target.value);
  const handleChangeEmail = (e) => setEmailValor(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("nombreEnviado", nombreValor);
    localStorage.setItem("emailEnviado", emailValor);
    onFormSubmit(nombreValor, emailValor); 
    setNombreValor("");
    setEmailValor("");
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
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;
