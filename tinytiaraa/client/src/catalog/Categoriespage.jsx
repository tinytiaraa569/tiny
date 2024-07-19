import DashboardHeader from '@/ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '@/ShopDashboardPage/DashboardSideBar'
import React from 'react'
import NewCategoryPage from './NewCategoryPage'
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
import styles from '@/Styles/styles';
import { MdDelete } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { useSelector } from 'react-redux';

function Categoriespage() {
    

    return (
        <div className='w-full'>
            <DashboardHeader />
            <div className="w-full flex ">
                <div className="w-[100px] md:w-[330px] max-w-[800px] min-w-[100px]">
                    <DashboardSideBar active={2} />
                </div>

                <div className='w-full mt-5'>

                    <h3 className={`${styles.fontfamily} text-[22px] `} >Categories</h3>


                    <div className="w-full flex items-center justify-between font-Poppins">
                        <div>
                            <h2 className='text-[22px] text-[#555] '>Categories</h2>
                        </div>

                        <Link to='/dashboard/categories/create'>
                        <div className={`${styles.button}flex items-center space-x-3`} >

                            <IoMdAdd color='white' />
                            <span className={`${styles.cart_button_text}`}>Add category</span>
                        </div>
                        </Link>
                    </div>


                    <div className='flex bg-slate-700 text-[white] rounded-lg py-6 px-8 justify-between'>
                        <button className='flex items-center bg-[#2c2c2c] px-5 py-2.5 rounded'> <MdDownload  className='mr-1'/> Export</button>


                        <button className='flex items-center  bg-[#c23535] px-5 py-2.5 rounded '><MdDelete className='mr-1'/> Delete</button>

                    </div>


                </div>



            </div>


        </div>
    )
}

export default Categoriespage
