import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { Outlet} from 'react-router-dom'
import Navbar from "./view/Navbar";
import {  AuthState, login } from "./features/AuthUser/authUser";
import { fetchProducts, initialize, SelectProductsStatus } from "./features/produit/produitSlice";
import { auth, db } from "./model/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query,limit } from "firebase/firestore";
import { checkQntProduct } from "./utils/checkQntProduct";






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

  // useEffect(() => {
  //    if (auth.currentUser && Status === "idle") {
  //      dispatch(fetchProducts())
  //    }
  // }, [Status,isAuth,dispatch])
  useEffect(() => {
     if (auth.currentUser) {
    const q=query(collection(db,'products'),limit(5))

       const unsbscribe= onSnapshot(q,(snapshot)=>{
        const list=snapshot.docs.map(document=>{ 
           return  {id:document.id,...document.data()}
          })
            let productQntDawn=checkQntProduct(list)
            dispatch(initialize({list,productQntDawn}))
            
        })
        return unsbscribe
     }

  }, [isAuth,dispatch])

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
