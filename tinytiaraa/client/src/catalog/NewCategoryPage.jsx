import DashboardHeader from '@/ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '@/ShopDashboardPage/DashboardSideBar'
import React from 'react'
import { RxCross2 } from "react-icons/rx";

function NewCategoryPage() {
  return (
    <div className="w-full ">
    <DashboardHeader />
    <div className="w-full flex">
      <div className="w-[100px] md:w-[330px] max-w-[800px] min-w-[100px]">
          <DashboardSideBar active={2} />
      </div>

      <div className='w-full mt-3 pt-5 h-[80px] text-[white] flex items-center justify-between  py-6 px-12 bg-slate-600 rounded-lg'>
        <h2>New Category</h2>
        <RxCross2 size={22}/>
      </div>

    </div>
  </div>
  )
}

export default NewCategoryPage
