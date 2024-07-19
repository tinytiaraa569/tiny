import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slidertext.css'

function Slidertext() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        swipeToSlide: true,
    };
    return (
        <div className='slidertext'>
            <div className="slidertextleft">
                <div className="sliderleftadjust">

                    <h1>Kid-Safe and Playful</h1>
                    <p>Our Proudly Designed Children's Jewellery Collection</p>
                    <button>Checkit-Out</button>
                </div>
            </div>
            <div className="slidertextright">
                <Slider {...settings}>
                    <div className='sliderrightimg'>
                        <img src="https://lirp.cdn-website.com/48f148a6/dms3rep/multi/opt/CMC-TPN-1153-T-R-1495w.png" alt="" />
                    </div>
                    <div className='sliderrightimg'>
                        <img src="https://lirp.cdn-website.com/48f148a6/dms3rep/multi/opt/TPN+1143+3D+Y-1495w.png" alt="" />
                    </div>
                    <div className='sliderrightimg'>
                        <img src="https://lirp.cdn-website.com/48f148a6/dms3rep/multi/opt/TPN-1107-B+3D+W+B-1495w.png" alt="" />
                    </div>
                    <div className='sliderrightimg'>
                        <img src="https://lirp.cdn-website.com/48f148a6/dms3rep/multi/opt/TPN-1118+m+3D+R+S-1495w.png" alt="" />
                    </div>
                    <div className='sliderrightimg'>
                        <img src="https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4345281404.png" alt="" />
                    </div>

                </Slider>
            </div>

        </div>
    )
}

export default Slidertext
