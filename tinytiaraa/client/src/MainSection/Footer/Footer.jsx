import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
        });
    };
    return (
        <div className="footermain">
            
        <div className='footer'>
            <div className="footerone">
                <img src="https://lirp.cdn-website.com/48f148a6/dms3rep/multi/opt/Tiny+Tiaraa_C5-217w.png" alt="" />
            </div>
            <div className="footertwo">
                <h4 className='footerheading'>LOCATE US</h4>
                <p>Tiny Tiaraa</p>
                <p>A Brand By Ru-Brama  Retail Pvt Ltd.</p>
                <p>Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central Road, Opp. Seepz Main Gate, WICEL, Andheri(East), Mumbai-400093.</p>
                <p className='footerp'>Contact Us: +91 86570 62511</p>
                <p>Email: care@tinytiaraa.com</p>
                <h4 className='footerconnect'>CONNECT</h4>
                <div className="footericons">
                    <div className='footericonmain'>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-youtube"></i>
                        <i className="fa-brands fa-whatsapp"></i>
                    </div>
                    <div className='footericonmain'>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-solid fa-phone"></i>
                        <i className="fa-solid fa-envelope"></i>
                    </div>
                </div>
            </div>
            <div className="footerthree">
                <h4 className='footerheading'>INFORMATION</h4>
                <div className='footermenu'>
                    <ul>
                        <li><Link onClick={scrollToTop} to="/about">About</Link></li>
                        <li><Link onClick={scrollToTop} to="/contacts">ContactUs</Link></li>
                        <li><Link onClick={scrollToTop} to="/terms-and-conditions">TERMS & CONDITIONS</Link></li>
                        <li><Link onClick={scrollToTop} to="/privacy-policy">PRIVACY POLICY</Link></li>
                        <li><Link onClick={scrollToTop} to="/warranty-extension">WARRANTY EXTENSION</Link></li>
                        <li><Link onClick={scrollToTop}to="/exchange-policy">EXCHANGE POLICY</Link></li>
                        <li><Link onClick={scrollToTop} to="/return-policy">RETURN POLICY</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footerfour">
            <h4 className='footerheading'>POLICY</h4>
            <ul>
                <li><Link onClick={scrollToTop} to="/affiliate-program-commission-policy">AFFILIATE PROGRAM COMMISSION POLICY </Link></li>
                <li><Link onClick={scrollToTop} to="/gold-jewellery-insurance-policy">GOLD JEWELLERY INSURANCE POLICY</Link></li>
                <li><Link onClick={scrollToTop} to="/children-safety-jewellery-policy">CHILDREN SAFETY JEWELLERY POLICY</Link></li>
                <li><Link onClick={scrollToTop} to="/customised-jewellery-policy">CUSTOMISED JEWELLERY POLICY</Link></li>
                <li><Link onClick={scrollToTop} to="/gold-coin-promotion-with-personalised-horoscope-engraving-policy">GOLD COIN PROMOTION WITH PERSONALISED HOROSCOPE ENGRAVING POLICY</Link></li>
                <li><Link onClick={scrollToTop} to="/gold-and-diamond-jewellery-certification-policy">GOLD AND DIAMOND JEWELLERY CERTIFICATION POLICY</Link></li>
            </ul>
            </div>

        </div>
        <div className="copyright">
            <p>All Rights Reserved | Tiny Tiaraa © 2024</p>
        </div>
        </div>

    )
}

export default Footer
