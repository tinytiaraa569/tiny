import React from 'react'
import './Contactsec3.css'
import contactimg from './contactus.jpg'

function Contactsec3() {
    return (
        <div className='contactsec3'>
            <h1>Contact Us</h1>
            <div className="contact3secmain">
                <div className="contactsec3left">
                    <div className='contactsec3leftadjust contactsec3leftadjustsec'>
                        <p><span className='bdtext'>Email :-</span> care@tinytiaraa.com</p>
                        <p><span className='bdtext'>Phone :-</span> +91 86570 62511</p>
                    </div>
                    <div className='contactsec3leftadjust'>
                        <p>Tiny Tiaraa</p>
                        <p>A Brand By Ru-Brama  Retail Pvt Ltd.,</p>
                        <p>Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central Road, Opp. Seepz Main Gate, WICEL, Andheri(East), Mumbai-400093.</p>
                    </div>
                    <div className='conatctsec3formflex'>

                        <div className="conatctsec3form contactsec3leftadjust">
                            <div className="labelsec">
                                <label htmlFor="contactname">Name</label>
                                <div className='inputfiledadjust'>
                                    <input id='contactname' type="text" />
                                </div>
                            </div>
                            <div className="labelsec">
                                <label htmlFor="contactemail">Email</label>
                                <div className='inputfiledadjust'>
                                    <input type="email" id='contactemail' />
                                </div>

                            </div>
                            <div className="labelsec">
                                <label htmlFor="contactmessage">Message</label>
                                <div className='inputfiledadjust'>
                                    <textarea name="" id="contactmessage" cols="30" rows="6"></textarea>
                                </div>
                            </div>
                            <div className="sect3submitbtn">
                                <button>Send</button>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="contactsec3right">
                    <img src={contactimg} alt="" />

                </div>

            </div>
           
        </div>
    )
}

export default Contactsec3
