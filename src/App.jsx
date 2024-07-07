import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from './HeaderComponent/HeaderComponent';
import FooterComponent from './FooterComponent/FooterComponent';
import CardComponent from './CardComponent/CardComponent';
import CarritoComponent from './CarritoComponent/CarritoComponent';
import data from './data.json';
import FormLogin from './FormLogin/FormLoginComponent';
import { ThemeProvider } from './ThemeProvider/ThemeContext';
import AsideComponent from './AsideComponent/AsideComponent';
import { useCounter } from './hooks/useCounter';

function App() {
  const [buscarProducto, setBuscarProducto] = useState('');
  const [nombreEnviado, setNombreEnviado] = useState(null);
  const [emailEnviado, setEmailEnviado] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const { contador, incrementar } = useCounter();
  const [carrito, setCarrito] = useState({});

  const handleSearch = (value) => { setBuscarProducto(value);};

  const handleFormSubmit = (name, email) => {
    setNombreEnviado(name);
    setEmailEnviado(email);
  };

  const agregarAlCarrito = (productId) => {
    const newCarrito = { ...carrito };
    newCarrito[productId] = (newCarrito[productId] || 0) + 1;
    setCarrito(newCarrito);
    incrementar(); 
  };

  const handleCarrito = () => { setCurrentView('carrito'); };

  const handleInicio = () => {setCurrentView('home'); };

  return (
    <ThemeProvider>
      <div className="container-app">
        <HeaderComponent 
          onSearch={handleSearch} 
          contador={contador} 
          onCarritoClick={handleCarrito} 
          onHomeClick={handleInicio} 
          carrito={carrito} 
        />
        <AsideComponent nombreEnviado={nombreEnviado || 'Usuario'} />
        {currentView === 'home' ? (
          <CardComponent 
            data={data} 
            buscarProducto={buscarProducto} 
            onAddProduct={agregarAlCarrito} 
          />
        ) : (
          <CarritoComponent carrito={carrito} data={data} />
        )}
        <FormLogin 
          onFormSubmit={handleFormSubmit} 
          initialNombre={nombreEnviado} 
          initialEmail={emailEnviado} 
        />
        <FooterComponent />
      </div>
    </ThemeProvider>
  );
}

export default App;
