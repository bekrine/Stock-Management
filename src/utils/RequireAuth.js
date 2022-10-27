import React from 'react'
import Loader from '../view/Loader'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import {AuthState, AuthStatus} from '../features/AuthUser/authUser'

const RequireAuth =()=>{
    const currentUser=useSelector(AuthState)
    const Status=useSelector(AuthStatus)

    console.log(currentUser)
    if(currentUser === '' && Status === "idel" ){
      return <Loader/>
    }return currentUser ? <Outlet/> : <Navigate to={'/connection'}/>
}

export default RequireAuth