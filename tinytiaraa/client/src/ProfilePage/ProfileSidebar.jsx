import React from 'react'
import { AiOutlineCreditCard, AiOutlineLogout, AiOutlineMessage } from 'react-icons/ai'
import { HiOutlineShoppingBag, HiReceiptRefund } from 'react-icons/hi'
import { RxPerson } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import { MdOutlineTrackChanges } from 'react-icons/md'
import { TbAddressBook } from 'react-icons/tb'
import axios from 'axios'
import { server } from '../server'
import { toast } from 'react-toastify'
import { RiLockPasswordFill } from "react-icons/ri";

function ProfileSidebar({active,setActive}) {
   const navigate =  useNavigate()
   const logoutHandler = () =>{
    axios.get(`${server}/user/logout`,{withCredentials:true}).then((res)=>{
        toast.success(res.data.message)
        window.location.reload(true)
        navigate("/login")

    }).catch((error)=>{
        console.log(error.response.data.message)

    })
   }
  return (
    <div className='w-full bg-white shadow-sm p-4 pt-8 font-Poppins'>
        <div className="flex items-center cursor-pointer w-full mb-8" onClick={()=>setActive(1)}>
            <RxPerson size={20} color={active === 1 ? "red" : ""}/>
            <span className={`pl-3 ${active === 1 ? "text-[red]" : ""} font-Poppins `}>Profile</span>

        </div>
        <div className="flex items-center cursor-pointer w-full mb-8" onClick={()=>setActive(2)}>
            <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""}/>
            <span className={`pl-3 ${active === 2 ? "text-[red]" : ""} font-Poppins `}>Orders</span>

        </div>
        <div className="flex items-center cursor-pointer w-full mb-8" onClick={()=>setActive(3)}>
            <HiReceiptRefund size={20} color={active === 3 ? "red" : ""}/>
            <span className={`pl-3 ${active === 3 ? "text-[red]" : ""} font-Poppins `}>Refunds</span>

        </div>
        <div className="flex items-center cursor-pointer w-full mb-8" onClick={()=>setActive(4) || navigate("/inbox")}>
            <AiOutlineMessage size={20} color={active === 4 ? "red" : ""}/>
            <span className={`pl-3 ${active === 4 ? "text-[red]" : ""} font-Poppins `}>Inbox</span>

        </div>
        <div className="flex items-center cursor-pointer w-full mb-8" onClick={()=>setActive(5)}>
            <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""}/>
            <span className={`pl-3 ${active === 5 ? "text-[red]" : ""} font-Poppins `}>Track Order</span>

        </div>
        <div className="flex items-center cursor-pointer w-full mb-8" onClick={()=>setActive(6)}>
            <RiLockPasswordFill  size={20} color={active === 6 ? "red" : ""}/>
            <span className={`pl-3 ${active === 6 ? "text-[red]" : ""} font-Poppins `}>Change Password</span>

        </div>
        <div className="flex items-center cursor-pointer w-full mb-8" onClick={()=>setActive(7)}>
            <TbAddressBook size={20} color={active === 7 ? "red" : ""}/>
            <span className={`pl-3 ${active === 7 ? "text-[red]" : ""} font-Poppins `}>Address</span>

        </div>

        <div className="flex items-center cursor-pointer w-full mb-8" onClick={()=>setActive(8)}>
            <AiOutlineCreditCard size={20} color={active === 8 ? "red" : ""}/>
            <span className={`pl-3 ${active === 8 ? "text-[red]" : ""} font-Poppins `}>Referral Amount</span>

        </div>
        <div className="flex items-center cursor-pointer w-full mb-8" onClick={()=>setActive(9) || logoutHandler()}>
            <AiOutlineLogout size={20} color={active === 9 ? "red" : ""}/>
            <span className={`pl-3 ${active === 9 ? "text-[red]" : ""} font-Poppins `}>Log Out</span>

        </div>
    </div>
  )
}

export default ProfileSidebar
