import React, { useState } from 'react'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { RxDashboard } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { MdOutlineAddBusiness } from "react-icons/md";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { BiSolidOffer } from "react-icons/bi";
import { BiMessageDetail } from "react-icons/bi";
import { RiRefund2Line } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { BiCategory } from "react-icons/bi";
import { TbCategoryPlus } from "react-icons/tb";
import { IoIosOptions } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";


function DashboardSideBar({ active }) {

    const [openMenu,setOpenMenu] =useState(false)

    const cataloglinks = [
        {
            title: "Category",
            href: '/create-category',
            icon:<BiCategory />
        },
        {
            title: "SubCategory",
            href: '/create-SubCategory',
            icon:<TbCategoryPlus />
        },
        {
            title: "Variants",
            href: '/create-Variants',
            icon:<IoIosOptions />
        }
    ]

    return (
        <div className='w-full h-auto md:h-[90vh] bg-white shadow-sm sticky top-0 left-0 z-10'>
            <div className="w-full flex items-center p-4 mt-4">
                <Link to="/dashboard" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start ' >
                    <RxDashboard size={30} color={`${active === 1 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[15px]  md:text-[18px]   font-400 ${active === 1 ? "text-[#3d9bc0] font-600" : "text-[#555]"} font-Poppins`}>DashBoard</h5>

                </Link>
            </div>
            {/* <div className="w-full flex items-center p-4">
            <Link href="" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                <FiShoppingBag size={30} color={`${active === 2 ? "#3d9bc0" : "#555" }`}/>
                <h5 className={`pl-2 text-[18px]   text-center font-[400] ${active === 2 ? "text-[#3d9bc0] " :"text-[#555]"} font-Poppins`}>All Orders</h5>
            </Link>
        </div> */}
            <Collapsible>
                <div className="w-full flex items-center p-4">
                    <Link href="" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                        <CollapsibleTrigger className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start ' onClick={()=>{setOpenMenu(!openMenu)}}>
                            <FiShoppingBag size={30} color={`${active === 2 ? "#3d9bc0" : "#555"}`} />
                            <h5 className={`pl-2 text-[18px]   text-center font-[400] ${active === 2 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>catalog</h5>
                            {
                                openMenu ? 
                                <FaAngleRight size={20} color='#555' className='ml-7' />
                                :
                                <FaAngleDown  size={20} color='#555' className='ml-7' />

                            }
                        </CollapsibleTrigger>
                    </Link>

                </div>
                <CollapsibleContent className='w-full flex items-center flex-col md:flex-row md:justify-start '>
                    <div className="w-full flex flex-col pl-6 ">

                        {
                            cataloglinks.map((item, i) => {
                                return (
                                    <div key={i} className='pb-2'>

                                        <Link to={item.href} className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>

                                            <span size={30} color='#3d9bc0'>{item.icon}</span>

                                            <h5 className={`pl-2 text-[16px]  font-[400]  text-[#555] font-Poppins`}>{item.title}</h5>
                                        </Link>
                                    </div>

                                )

                            })
                        }
                    </div>
                </CollapsibleContent>
            </Collapsible>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-orders" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <FiPackage size={30} color={`${active === 10 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`  pl-2 text-[18px] font-[400] text-center ${active === 10 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>All orders</h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-products" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <FiPackage size={30} color={`${active === 3 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`  pl-2 text-[18px] font-[400] text-center ${active === 3 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>All Products</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-create-product" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <MdOutlineAddBusiness size={30} color={`${active === 4 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={` pl-2 text-[18px] text-center font-[400] ${active === 4 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Create Product</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-events" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <MdOutlineLocalOffer size={30} color={`${active === 5 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] text-center font-[400] ${active === 5 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>All Events</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-create-event" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <VscNewFile size={30} color={`${active === 6 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] text-center font-[400] ${active === 6 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Create Events</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-coupons" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <BiSolidOffer size={30} color={`${active === 7 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] text-center font-[400] ${active === 7 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Coupoun</h5>
                </Link>
            </div>
           
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-refunds" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <RiRefund2Line size={30} color={`${active === 8 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 8 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Refunds</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-messages" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <BiMessageDetail size={30} color={`${active === 9 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] font-[400] ${active === 9 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Message Inbox</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link href="" className='w-full flex items-center justify-center flex-col md:flex-row md:justify-start '>
                    <FaPeopleGroup size={30} color={`${active === 11 ? "#3d9bc0" : "#555"}`} />
                    <h5 className={`pl-2 text-[18px] font-[400] ${active ===11 ? "text-[#3d9bc0] " : "text-[#555]"} font-Poppins`}>Referral Status</h5>
                </Link>
            </div>




        </div>
    )
}

export default DashboardSideBar