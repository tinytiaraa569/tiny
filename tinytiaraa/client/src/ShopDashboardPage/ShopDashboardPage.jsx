import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardSideBar from './DashboardSideBar'
import { useSelector } from 'react-redux'
import DashboardHero from './DashboardHero'

function ShopDashboardPage() {
  
  
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-start justify-between">
        <div className="w-[100px] md:w-[330px] max-w-[800px] min-w-[100px]">
            <DashboardSideBar active={1} />
        </div>
        <DashboardHero />

      </div>
    </div>
  )
}

export default ShopDashboardPage
