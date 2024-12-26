import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
  className="px-6 py-2 bg-indigo-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:ring-offset-2 transition-all duration-200"
  onClick={logoutHandler}
>
  Logout
</button>

  )
}

export default LogoutBtn