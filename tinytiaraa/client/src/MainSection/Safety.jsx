import React from 'react'
import './Safety.css'
import highquality from './images/highquality.svg'
import trydoll from './images/trydoll.png'
import safe from './images/safe.svg'
import allocasion from './images/allocasion.svg'


function Safety() {
  return (
    <div className='safety'>
      <h1>We Provide Safe and Unique Jewellery</h1>
      <div className="safetymain">
        <div className="saftycard">
          <img style={{ width: 200, height: 200 }} src={highquality} alt="" />
          <h3>High-Quality Materials</h3>
          <p>Our jewellery is made from the highest quality gold and diamonds, ensuring that your child's jewellery will last for years to come.</p>
        </div>
        <div className="saftycard">
          <img style={{ width: 200, height: 200 }} src={trydoll} alt="" />
          <div className="saftycardcon">

            <h3>Unique Designs</h3>
            <p>Our jewellery is designed to be both elegant and playful, perfect for kids and infants. Each piece is unique, making it a special gift for your child.</p>
          </div>
        </div>
        <div className="saftycard">
          <img style={{ width: 200, height: 200 }} src={safe} alt="" />
          <div className="saftycardcon">

            <h3>Safe for Kids</h3>
            <p>Our jewellery is designed with safety in mind, with features such as screw-back earrings and adjustable bracelets to ensure a secure fit.</p>
          </div>
        </div>

        <div className="saftycard">
          <img style={{ width: 200, height: 200 }} src={allocasion} alt="" />
          <div className="saftycardcon">

            <h3>Perfect for All Occasions</h3>
            <p>Whether it's a special occasion or just a day out with the family, our jewellery is the perfect addition to any outfit. With a range of designs and styles to choose from, there's something for every child.</p>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Safety
