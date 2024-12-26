import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

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
    
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-100 p-0 m-0">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto ">
          {/* Replace TODO with actual content */}
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  ) : <h1>loading...</h1>;
  
}

export default App
