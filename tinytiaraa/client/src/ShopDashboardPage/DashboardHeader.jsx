import React from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiShoppingBag } from "react-icons/fi";
import { TfiBag } from "react-icons/tfi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

function DashboardHeader() {
    const {seller} = useSelector((state)=> state.seller)
    

  return (
    <div className='w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4'>
        <div className='ml-5'>
            <Link to="/dashboard">
            <img src="https://lirp.cdn-website.com/48f148a6/dms3rep/multi/opt/Tiny+Tiaraa_C5-1920w.png" className='w-[100px] h-[70px]' alt="" />
            </Link>
        </div>
        <div className='flex items-center'>
            <div className='flex items-center mr-4'>
                <Link to="/dashboard-gifts">
                    <AiOutlineGift color='#555' size={30} className='mx-5 cursor-pointer'/>
                </Link>
                {/* <Link to="/dashboard-events">
                    <MdOutlineLocalOffer color='#555' size={30} className='mx-5 cursor-pointer'/>
                </Link>
                <Link to="/dashboard-products">
                    <FiShoppingBag  color='#555' size={30} className='mx-5 cursor-pointer'/>
                </Link>
                <Link to="/dashboard-orders">
                    <TfiBag  color='#555' size={30} className='mx-5 cursor-pointer'/>
                </Link>
                <Link to="/dashboard-message">
                    <BiMessageSquareDetail  color='#555' size={30} className='mx-5 cursor-pointer'/>
                </Link> */}
                <Link to={`/admin-manage/${seller._id}`}>
                <FaUserCircle  color='#555' size={30} className='mx-5 cursor-pointer'/>
                </Link>

                
            </div>

        </div>
      
    </div>
  )
}

export default DashboardHeader
