import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header />
        <main className="bg-base-200 p-4 min-h-screen">
         <Outlet />
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  ) : ( <div className='min-h-screen flex items-center justify-center bg-gray-400'>
    <div className='relative w-12 h-12'>
      <div className='absolute inset-0 border-4 border-blue-600 rounded-full animate-ping'></div>
      <div className='absolute inset-0 border-4 border-blue-600 rounded-full opacity-75'></div>
    </div>
  </div>)
}

export default App