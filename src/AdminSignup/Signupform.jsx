import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {auth} from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function SignUpForm () {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
      await createUserWithEmailAndPassword(auth, data.email, data.password).then(() => {
        navigate('/')
      })
      .catch((error) => {
        alert(error)
      })

  };
  console.log(auth.currentUser)
  const password = watch('password', '');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold text-center text-yellow-400">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-yellow-400">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            className={`w-full p-3 mt-1 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              errors.name ? 'border-red-500' : 'border-gray-700'
            }`}
          />
          {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
        </div>
  
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
            className={`w-full p-3 mt-1 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              errors.password ? 'border-red-500' : 'border-gray-700'
            }`}
          />
          {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>}
        </div>
  
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-yellow-400">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
            className={`w-full p-3 mt-1 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
            }`}
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
  
        <button
          type="submit"
          className="w-full py-3 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Sign Up
        </button>
        <div className='text-white text-center w-full underline'>
          <Link to='/login'>Already Have Account ?</Link>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default SignUpForm;
