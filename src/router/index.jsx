import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../views/Layout';
import NotFound from '../views/NotFound';
import FormLogin from '../FormLogin/FormLoginComponent'; 
import CardComponent from '../CardComponent/CardComponent';
import CarritoComponent from '../CarritoComponent/CarritoComponent';
import HeaderComponent from '../HeaderComponent/HeaderComponent';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HeaderComponent />
        <CardComponent />
      </Layout>
    ),
  },
  {
    path: '/cart',
    element: (
      <Layout>
        <HeaderComponent />
        <CarritoComponent />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <HeaderComponent />
        <FormLogin />
      </Layout>
    ),
  },
  { path: '*', element: <NotFound /> },
]);
