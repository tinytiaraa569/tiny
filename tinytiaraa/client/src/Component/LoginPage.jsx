import React, { useEffect } from 'react'
import Login from '../Pages/Login'
import './Compsty.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const { isAuthenticated } = useSelector((state) => state.user)
  
  const navigate = useNavigate()
  // useEffect(()=>{
  //   if(isAuthenticated === true){
  //     navigate("/")
  //   }
  // },[])

  return (
    <div className='loginpage'>
      {
        isAuthenticated ?
        (navigate("/"))
        :
        <Login />

      }
    </div>
  )
}

export default LoginPage