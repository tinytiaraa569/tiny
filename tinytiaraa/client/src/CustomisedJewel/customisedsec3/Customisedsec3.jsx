import React from 'react'
import './Customisedsec3.css'
import ship from './ship.svg'

function Customisedsec3() {
  return (
    <div className='Customisedsec3'>
        <div className="customisedsecmain">
            <div className="customisedsec3imga">
                <div className='alcenter'>
                <img src={ship} alt="" />
                <h1>Fast, Secure Delivery</h1>
                </div>
            </div>
            <div className="customisedsec3content">
                <div>

                <p>We understand that you're excited to wear your custom creation, so we've streamlined our production process to get your jewellery to you as swiftly as possible. In just 14 business days, your masterpiece will be delivered securely to your doorstep, ready to adorn your life with elegance and meaning.</p>
                <div className='alcenter'>
                <button>Get Started</button>
                </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Customisedsec3
