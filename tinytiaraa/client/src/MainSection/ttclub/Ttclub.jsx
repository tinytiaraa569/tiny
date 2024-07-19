import React from 'react'
import './ttclub.css'
import ttclubvideo from './ttclubvideo.mp4'

function Ttclub() {
    return (
        <div className='ttclub'>
            <div className="videocon">
            <video autoPlay muted loop src={ttclubvideo}></video>
            </div>
            <div className="ttclubmain">
                <div className='ttclubmainadjust'>

                <h1>Join the TT Club</h1>
                <p>Enter your email address here</p>
                <input type="text" />
                <button>Join Now</button>
                </div>
            </div>
            </div>
    )
}

export default Ttclub
