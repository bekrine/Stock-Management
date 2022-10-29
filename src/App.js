import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { Outlet} from 'react-router-dom'
import Navbar from "./view/Navbar";
import {  AuthState, login, logOut } from "./features/AuthUser/authUser";
import {  initialize, SelectProductsStatus } from "./features/produit/produitSlice";
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
           localStorage.setItem('user',JSON.stringify(user.uid))
          dispatch(login(user.uid))
         }else{
           dispatch(logOut())
           localStorage.removeItem('user')
         }
       })
  return unsbscribe
  },[dispatch,isAuth])
  
  useEffect(() => {
     if (Status === "idle") {
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

  }, [Status,dispatch])

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
