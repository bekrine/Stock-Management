import React, { useEffect }  from "react";

import { useDispatch, useSelector } from "react-redux";
import { AuthState } from "./features/AuthUser/authUser";
import { fetchProducts, SelectProductsStatus } from "./features/produit/produitSlice";
import Layout from "./view/Layout";






function App() {

  const isAuth=useSelector(AuthState)
  const Status = useSelector(SelectProductsStatus)
  const dispatch=useDispatch()

  useEffect(()=>{
    if(isAuth && Status === "idle" ){
      dispatch(fetchProducts())
    }
  },[Status])

  return (
    <>
    <Layout/>
    </>
  );
}

export default App;
