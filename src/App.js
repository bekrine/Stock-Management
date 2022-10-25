import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { Outlet} from 'react-router-dom'
import Navbar from "./view/Navbar";
import {  AuthState, login } from "./features/AuthUser/authUser";
import { fetchProducts, SelectProductsStatus } from "./features/produit/produitSlice";
import { auth } from "./model/firebase";
import { onAuthStateChanged } from "firebase/auth";






function App() {

  const Status = useSelector(SelectProductsStatus)
  const isAuth = useSelector(AuthState)
  const dispatch = useDispatch()


  useEffect(()=>{
    const unsbscribe=onAuthStateChanged(auth,(user)=>{
        if (user) {
        
          return dispatch(login(user.uid))
        }
      })
     return unsbscribe
    },[dispatch])

  useEffect(() => {
     if (auth.currentUser && Status === "idle") {
       dispatch(fetchProducts())
     }
  }, [Status,isAuth,dispatch])

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
