import DashboardHeader from '@/ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '@/ShopDashboardPage/DashboardSideBar'
import React from 'react'
import AllRefundOrders from './AllRefundOrders'

function ShopAllRefunds() {
  return (
    <div>
    <DashboardHeader />
    <div className="w-full flex  justify-between">
      <div className="w-[100px] md:w-[330px] max-w-[800px] min-w-[100px]">
          <DashboardSideBar active={8} />
      </div>
      <div className="w-full justify-center flex">
          <AllRefundOrders/>
      </div>

    </div>
  </div>
  )
}

export default ShopAllRefunds
