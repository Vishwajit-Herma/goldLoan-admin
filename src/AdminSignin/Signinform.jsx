import React from 'react';
import { useForm } from 'react-hook-form';
import {auth} from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function SignInForm()  {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
      await signInWithEmailAndPassword(auth, data.email, data.password).then(() => {
        navigate('/')
      })
      .catch((error) => {
        alert(error)
      })

  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold text-center text-yellow-400">
        Gold Loan Portal
      </h2>
      <p className="text-center text-sm text-gray-400">
        Secure Access to Your Loan Account
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-yellow-400">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Invalid email address',
              },
            })}
            className={`w-full p-3 mt-1 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              errors.email ? 'border-red-500' : 'border-gray-700'
            }`}
          />
          {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
        </div>
  
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-yellow-400">
            Password
          </label>
          <input
          
            id="password"
            name="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            className={`text-white w-full p-3 mt-1 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              errors.password ? 'border-red-500' : 'border-gray-700'
            }`}
          />
          {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>}
        </div>
  
        <button
          type="submit"
          className="w-full py-3 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Access Your Account
        </button>
        <div className='w-full  text-center underline'>
        <Link to="/logup" className=' text-white'>Create New Account</Link>
        </div>
      </form>
    </div>
  </div>
  
  
  
  
  );
};

export default SignInForm;
