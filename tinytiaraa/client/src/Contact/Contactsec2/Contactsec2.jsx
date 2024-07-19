import React from 'react'
import "./Contactsec2.css"

function Contactsec2() {
    return (
        <div className='Contactsec2main'>
            <h1>Visit Us</h1>
            <div className="Contactsec2conflex">
                <div className="constcattsec2left">
                    <img src="https://lirp.cdn-website.com/md/pexels/dms3rep/multi/opt/pexels-photo-3893788-1920w.jpeg" alt="" />
                </div>
                <div className="contactsec2right">
                    <div className='contactsec2rightcon'>

                        <h3>Mumbai</h3>
                        <p>Tiny Tiaraa</p>
                        <p>A Brand By Ru-Brama  Retail Pvt Ltd.,</p>
                        <p>Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central Road, Opp. Seepz Main Gate, WICEL, Andheri(East), Mumbai-400093.</p>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7539.227470998889!2d72.86813600017196!3d19.124594023259718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c90071c06cc9%3A0x301cff455d8de28f!2sOffice%20MIDC!5e0!3m2!1sen!2sin!4v1718170611759!5m2!1sen!2sin"
                            width={400}
                            height={260}
                            style={{ border: "1px solid gray" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        <div className='contactbtncenter'>

                        <button>Visit Us</button>
                        </div>

                    </div>
                </div>

            </div>


        </div>
    )
}

export default Contactsec2
