import React from 'react'
import Loader from '../view/Loader'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import {AuthState} from '../features/AuthUser/authUser'

const RequireAuth =()=>{
    const currentUser=useSelector(AuthState)
    if(currentUser === null){
      return <Loader/>
    }return currentUser ? <Outlet/> : <Navigate to='/connection'/> 
}

export default RequireAuth