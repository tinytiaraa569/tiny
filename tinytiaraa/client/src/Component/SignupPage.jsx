import React from 'react'
import Signup from '../Pages/Signup'
import './Compsty.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function SignupPage() {
  const { isAuthenticated } = useSelector((state) => state.user)
  const navigate = useNavigate()


  return (
    <div className='signup'>
      { 
      isAuthenticated ?
        (navigate("/"))
        :
        <Signup/>


      }
      
    </div>
  )
}

export default SignupPage
