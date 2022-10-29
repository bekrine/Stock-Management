import React from 'react'
import Loader from '../view/Loader'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import {AuthState} from '../features/AuthUser/authUser'

const RequireAuth =()=>{
    const currentUser=useSelector(AuthState)
   
 
 return  currentUser !== null ? <Outlet/> : <Navigate to={'/connection'} replace/>
}

export default RequireAuth