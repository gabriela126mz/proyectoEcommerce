import React, { useState,useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardComponent from './CardComponent/CardComponent';
import CarritoComponent from './CarritoComponent/CarritoComponent';
import data from './data.json';
import FormLogin from './FormLogin/FormLoginComponent'
import { ThemeProvider } from './ThemeProvider/ThemeContext';
import { useCounter } from './hooks/useCounter';
import NotFound from './views/NotFound';
import Layout from './views/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail/ProductDetail';
import { AuthProvider  } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  const [buscarProducto, setBuscarProducto] = useState('');
  const [nombreEnviado, setNombreEnviado] = useState(null);
  const [emailEnviado, setEmailEnviado] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const { contador, incrementar, reiniciar } = useCounter();
  const [carrito, setCarrito] = useState({});

  const handleSearch = (value) => {
    setBuscarProducto(value);
  };

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

  const handleCarrito = () => {
    setCurrentView('carrito');
  };

  const handleInicio = () => {
    setCurrentView('home');
  };

  const handleCompra = () => {
    setCarrito({});
    reiniciar();
  };

  const handleResetearCarrito = () => {
    setCarrito({});
    reiniciar();
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Layout
            contador={contador}
            onSearch={handleSearch}
            onCarritoClick={handleCarrito}
            onHomeClick={handleInicio}
            nombreEnviado={nombreEnviado}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <div className="container-app">
                    {currentView === 'home' ? (
                      <CardComponent
                        data={data}
                        buscarProducto={buscarProducto}
                        onAddProduct={agregarAlCarrito}
                      />
                    ) : (
                      <CarritoComponent
                        carrito={carrito}
                        data={data}
                        onResetearCarrito={handleResetearCarrito}
                        onCompra={handleCompra}
                      />
                    )}
                  </div>
                }
              />
              <Route
                path="/login"
                element={<FormLogin onFormSubmit={handleFormSubmit} />}
              />
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/cart"
                  element={<CarritoComponent carrito={carrito} data={data} onResetearCarrito={handleResetearCarrito} onCompra={handleCompra} />}
                />
                <Route
                  path="/product/:id"
                  element={<ProductDetail data={data} onAddProduct={agregarAlCarrito} />}
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
