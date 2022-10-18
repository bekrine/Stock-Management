import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import {AuthState} from '../features/AuthUser/authUser'

const RequireAuth =({children})=>{
    const currentUser=useSelector(AuthState)
  return currentUser.currentUser ? <Outlet/> :<Navigate to='/connection'/>
}

export default RequireAuth