import React from 'react'
import DashboardHeader from '../ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '../ShopDashboardPage/DashboardSideBar'
import CreateProduct from './CreateProduct'

function ShopCreateProductPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-center justify-between">
        <div className="w-[100px] md:w-[330px] max-w-[800px] min-w-[100px]">
            <DashboardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
            <CreateProduct />
        </div>

      </div>
    </div>
  )
}

export default ShopCreateProductPage
