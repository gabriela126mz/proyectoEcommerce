import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardComponent from './CardComponent/CardComponent';
import CarritoComponent from './CarritoComponent/CarritoComponent';
import FormLogin from './FormLogin/FormLoginComponent';
import { ThemeProvider } from './ThemeProvider/ThemeContext';
import { useCounter } from './hooks/useCounter';
import NotFound from './views/NotFound';
import Layout from './views/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail/ProductDetail';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import useProducts from './hooks/useProducts';

function App() {
  const [buscarProducto, setBuscarProducto] = useState('');
  const [nombreEnviado, setNombreEnviado] = useState(null);
  const [emailEnviado, setEmailEnviado] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const { contador, incrementar, reiniciar } = useCounter();
  const [carrito, setCarrito] = useState({});

  const { products } = useProducts(); 

  const handleSearch = (value) => {
    setBuscarProducto(value);
  };

  const handleFormSubmit = (name, email) => {
    setNombreEnviado(name);
    setEmailEnviado(email);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const newCarrito = { ...prevCarrito };
      newCarrito[producto.id] = (newCarrito[producto.id] || 0) + 1;
      incrementar(); 
      return newCarrito;
    });
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
              <Route path="/" element={
                <div className="container-app">
                  {currentView === 'home' ? (
                    <CardComponent
                      buscarProducto={buscarProducto}
                      onAddProduct={agregarAlCarrito}
                    />
                  ) : (
                    <CarritoComponent
                      carrito={carrito}
                      products={products}
                      onResetearCarrito={handleResetearCarrito}
                      onCompra={handleCompra}
                    />
                  )}
                </div>
              }/>
              <Route path="/login" element={<FormLogin onFormSubmit={handleFormSubmit} />}/>
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={
                  <CarritoComponent 
                    carrito={carrito} 
                    products={products}
                    onResetearCarrito={handleResetearCarrito} 
                    onCompra={handleCompra} 
                  />
                }/>
                <Route path="/product/:id" element={
                  <ProductDetail 
                    onAddProduct={agregarAlCarrito} 
                  />
                }/>
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
