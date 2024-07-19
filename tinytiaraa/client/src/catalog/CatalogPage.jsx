import React from 'react'
import DashboardHeader from '../ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '../ShopDashboardPage/DashboardSideBar'

function CatalogPage() {
  return (
<div>
      <DashboardHeader />
      <div className="w-full flex items-center justify-between">
        <div className="w-[100px] md:w-[330px] max-w-[800px] min-w-[100px]">
            <DashboardSideBar active={2} />
        </div>

        <div>
            
            
        </div>

      </div>
    </div>
  )
}

export default CatalogPage
