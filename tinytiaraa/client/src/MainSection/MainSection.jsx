import React from 'react'
import SliderSection from './Slider'
import Categories from './Categories'
import Shippingpage from './Shippingpage'
import WhyPage from './WhyPage'
import MorePage from './MorePage'
import Customise from './Customise'
import Safety from './Safety'
import Slidertext from './Sectionslider/Slidertext'
import CustomizedAccordions from './FreqAsk/Freq'
import Ttclub from './ttclub/Ttclub'
import NewArrivals from './newarrivals/NewArrivals'

function MainSection() {
  return (
    <div>
      <SliderSection />
      <Categories />
      <Shippingpage />
      <WhyPage />
      <MorePage />
      <Customise />
      <NewArrivals />
      <Safety />
      <Slidertext />
      <CustomizedAccordions />
      <Ttclub />
    </div>
  )
}

export default MainSection
