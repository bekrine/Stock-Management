import React, { useState } from 'react'
import {useFormik} from 'formik'
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../model/firebase';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import {login} from '../features/AuthUser/authUser'
import { useDispatch } from 'react-redux';

function Connection() {

const dispatch=useDispatch()
const navigate=useNavigate()
const [err,setError]=useState(false)

  const formik=useFormik({
    initialValues:{
          email:'',
          password:'',
        },validationSchema:Yup.object({
          email:Yup.string().email().required("champs obligatoir remplire le champ s'il vous plait"),
          password:Yup.string().min(4,'mot de passse doit etre minimum de 4 lettre').required("champs obligatoir remplire le champ s'il vous plait"),
        }),
        onSubmit:async value=>{
          const {email,password}=value
          try {
            const userCredential= await signInWithEmailAndPassword(auth,email,password)
            dispatch(login(userCredential.user))
            navigate('/')
            
          } catch (error) {
            setError(true)
          }
        
        }
      })  
  
      const {handleSubmit,touched,errors,getFieldProps}=formik
  



  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-[50%] p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-500 underline">
                   Sign in
                </h1>
                <form onSubmit={handleSubmit}  className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                        {...getFieldProps('email')}
                            id='email'
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {
                   touched.email && errors.email ?<p className="text-red-500 text-xs italic">{errors.email}</p>:null
                 }
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                            >
                            Password
                        </label>
                        <input
                        {...getFieldProps('password')}
                            id='password'
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {
                   touched.password && errors.password ?<p className="text-red-500 text-xs italic">{errors.password}</p>:null
                 }
                    </div>

                    {
                   err ?<p className="text-red-500 text-xs italic">error</p>:null
                 }
                    <a
                       
                        className="text-xs text-blue-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button  
                        type='submit'
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Connection