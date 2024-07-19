import DashboardHeader from '@/ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '@/ShopDashboardPage/DashboardSideBar'
import React from 'react'
import CreateEvent from './CreateEvent'

function ShopCreateEvents() {
  return (
    <div>
    <DashboardHeader />
    <div className="w-full flex items-center justify-between">
      <div className="w-[100px] md:w-[330px] max-w-[800px] min-w-[100px]">
          <DashboardSideBar active={6} />
      </div>

        <div className='w-full justify-center flex'>
            <CreateEvent />

        </div>
    </div>
  </div>
  )
}

export default ShopCreateEvents
