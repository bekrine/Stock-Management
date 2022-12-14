import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'
import RequireAuth from './utils/RequireAuth'
import "react-toastify/dist/ReactToastify.css";


import './index.css';
import store from './model/store';
import App from './App';
import ErrorPage from './view/ErrorPage';
import Addprodduct from './view/Addprodduct';
import Table from './view/Table';
import Connection from './view/Connection';
import ForgetPassword from './view/ForgetPassword';






const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} errorElement={<ErrorPage/>}>
    <Route path='/' element={<RequireAuth/>}>
      <Route index element={<Table/>}/>
      <Route path='/Addproduct' element={<Addprodduct/>}/>
    </Route>
      <Route path='/connection' element={<Connection/>}/>
      <Route path='/forgetpassword' element={<ForgetPassword/>}/>
    </Route>
  )
  )



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>

    </RouterProvider>
    </Provider>
  </React.StrictMode>
);


