import React from 'react'
import './Aboutsection3.css'
import diamond from './images/diamond.svg'
import card from './images/card.svg'
import human from './images/human.svg'
import handshake from './images/handshake.svg'
import aboutimg from './images/about.jpg'





function Aboutsection3() {
  return (
    <div className='aboutsection3'>
        <h1 className='text-[25px] font-[600]'>Why Us ?</h1>
        <div className="aboutsection3flex">
        <div className="aboutscetion3first">
            <div className="aboutsec3card">
            <div className='aboutscetion3firstcon'>
            <div className="aboustsection3icon iconbackgroundclr1">
                <img src={diamond} alt="" />
            </div>
            </div>
            <div className="aboutsection3content">
                <h2>Craftsmanship</h2>
                <p>Craftsmanship lies at the heart of what we do. Each piece of jewellery is meticulously designed and handcrafted with the utmost attention to detail. We combine quality materials with creative artistry to bring forth jewellery that's not only visually stunning but also safe and comfortable for children to wear.</p>
            </div>
            </div>

            <div className="aboutsec3card">
            <div className='aboutscetion3firstcon'>
            <div className="aboustsection3icon iconbackgroundclr2">
                <img src={card} alt="" />
            </div>
            </div>
            <div className="aboutsection3content">
                <h2>Collections</h2>
                <p>Our jewellery collections are carefully curated to cater to a variety of tastes and preferences. From dainty bracelets adorned with whimsical charms to elegant necklaces that shimmer like fairy dust, our diverse range ensures that every child finds a piece that resonates with their unique style.</p>
            </div>
            </div>
        </div>
        <div className="aboutsection3second">
            <img src={aboutimg} className='object-contain rounded' alt="" />
        </div>
        <div className="aboutsection3third">
        <div className="aboutsec3card">
            <div className='aboutscetion3secondcon'>
            <div className="aboustsection3icon iconbackgroundclr3">
                <img src={human} alt="" />
            </div>
            </div>
            <div className="aboutsection3content">
                <h2>Safety First</h2>
                <p>We understand the importance of safety when it comes to children's jewellery. That's why all our pieces are crafted using hypoallergenic materials and undergo stringent quality checks. We prioritize creating jewellery that parents can trust and kids can enjoy without any worries.</p>
            </div>
            </div>

            <div className="aboutsec3card">
            <div className='aboutscetion3secondcon'>
            <div className="aboustsection3icon iconbackgroundclr4">
                <img src={handshake} alt="" />
            </div>
            </div>
            <div className="aboutsection3content">
                <h2>Join the Magic</h2>
                <p>At Tiny Tiaraa, we invite you to join us on a journey filled with magic, creativity, and endless smiles. Whether you're looking for a gift that will light up a child's eyes or a keepsake to treasure forever, our jewellery pieces are designed to make every moment special.</p>
            </div>
            </div>

        </div>
        </div>
      
    </div>
  )
}

export default Aboutsection3
