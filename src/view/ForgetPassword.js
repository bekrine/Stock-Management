import { useFormik } from 'formik'
import * as Yup from 'yup' 
import {forgetPassword} from '../features/AuthUser/authUser'

function ForgetPassword() {
  
  
    
      const formik=useFormik({
        initialValues:{
              email:'',
            },validationSchema:Yup.object({
              email:Yup.string().email().required("champs obligatoir remplire le champ s'il vous plait"),
            }),
            onSubmit:async value=>{             
            forgetPassword(value)
            }
          })  
      
          const {handleSubmit,touched,errors,getFieldProps}=formik
    
    
      return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-[50%] p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-blue-500 underline">
                       Reset Password
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

                        <div className="mt-6">
                            <button  
                            type='submit'
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
      )
}

export default ForgetPassword