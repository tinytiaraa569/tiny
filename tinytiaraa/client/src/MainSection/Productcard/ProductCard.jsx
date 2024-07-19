import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../Styles/styles'
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import './productcard.css'
import ProductDetailsCard from '../../ProductDetailsCard/ProductDetailsCard'
import { backend_url } from '@/server'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '@/redux/actions/wishlist'

import { EmailIcon, FacebookIcon, WhatsappIcon, } from "react-share";
import { EmailShareButton, FacebookShareButton, WhatsappShareButton, } from "react-share";
import { FaInstagram } from 'react-icons/fa'





function ProductCard({ data }) {

  const { wishlist } = useSelector((state) => state.wishlist)

  const [click, setClick] = useState(false)
  const [open, setOpen] = useState(false)
  const [showShareIcons, setShowShareIcons] = useState(false);
  const dispatch = useDispatch()

  const d = data.name
  const product_name = d.replace(/\s+/g, "-")

  useEffect(() => {

    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true)

    } else {
      setClick(false)
    }

  }, [wishlist])

  const removeFromWishlistHandler = (data) => {
    setClick(!click)
    dispatch(removeFromWishlist(data))


  }
  const addToWishlistHandler = (data) => {
    setClick(!click)
    dispatch(addToWishlist(data))


  }

  const toggleShareIcons = () => {
    setShowShareIcons(!showShareIcons);
  };

  const closeShareIcons = () => {
    setShowShareIcons(false);
  };

  const handleMouseLeave = () => {
    setShowShareIcons(false); // Reset showShareIcons when mouse leaves the parentproductcard
  };

  // const shareOnFacebook = () => {
  //   const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productLink)}`;
  //   window.open(url, '_blank');
  // };

  // const shareOnWhatsApp = () => {
  //   const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(productLink)}`;
  //   window.open(url, '_blank');
  // };

  const shareOnInstagram = (product) => {
    // const caption = `Check out this amazing product: ${product.name}!`;

    // console.log(caption)
    const url = `https://www.instagram.com/?url=https://www.tinytiaraa.com/product/Quality-Craftmanship-with-Q-Gold-Alphabet-Kids-Pendant`;
    window.open(url, '_blank');
  };

  return (
    <>


      <div className="parentproductcard w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer overflow-hidden " onMouseLeave={handleMouseLeave}>
        <div className="flex justify-end "></div>

        <div className='w-full h-[170px] overflow-hidden'>
          <Link to={`/product/${product_name}`}>

            <img src={`${backend_url}${data.images && data.images[1]}`} alt="" className='parentproductimg w-full h-[170px] object-contain scale-125 ' />

          </Link>
        </div>
        <Link href="">
          <h4 className='pb-1 font-[500] text-center'>{data.name.length > 70 ? data.name.slice(0, 70) + "..." : data.name}</h4>
        </Link>
        <p className={`${styles.skuid}`}>{data.skuid}</p>

        <div className="py-2 mt-2 flex items-center justify-between">
          <div className="flex ">
            <h5 className={`${styles.productDiscountPrice}`}>
              ₹
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice}
            </h5>
            <h4 className={`${styles.price} line-through`}>
              {data.originalPrice ? " ₹" + data.originalPrice : null}
            </h4>
          </div>
          {/* <span className="font-[400] text-[14px] text-[#151816] font-Poppins">{data?.sold_out} Sold</span> */}
        </div>
        <div>
          <div className='flex justify-center'>
            <button className={`${styles.cart_button} ${styles.cart_button_text}`}>Buy Now</button>

          </div>
        </div>

        <div>

        </div>
        <div className='childcard' >
          {
            click ?
              <AiFillHeart
                size={22}
                className='cursor-pointer absolute right-2 top-5'
                color={click ? "red" : "#333"}
                onClick={() => removeFromWishlistHandler(data)}
                title='Remove from wishlist'
              />
              :
              <AiOutlineHeart
                size={22}
                className='cursor-pointer absolute right-2 top-5'
                color={click ? "red" : "#333"}
                onClick={() => addToWishlistHandler(data)}
                title='Add to wishlist'


              />
          }

          <AiOutlineEye
            size={22}
            className='cursor-pointer absolute right-2 top-14'
            color='#333'
            title='Quick View'
            onClick={() => setOpen(!open)}
          />

          <AiOutlineShareAlt
            size={23}
            className='cursor-pointer absolute right-2 top-24'
            color='#444'
            title='Share'
            onClick={toggleShareIcons}


          />
          <div className=''>

            {showShareIcons && (
              <div className="share-icons absolute top-28 right-0 mt-4 flex gap-[4px] p-2  rounded-md z-10">
                <FacebookShareButton url={"https://www.tinytiaraa.com/product/Quality-Craftmanship-with-Q-Gold-Alphabet-Kids-Pendant"} onClick={closeShareIcons} >
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>

                <WhatsappShareButton url={`http://localhost:5173/product/${product_name}`} onClick={closeShareIcons} >
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>

                <EmailShareButton url={"https://www.tinytiaraa.com/product/Quality-Craftmanship-with-Q-Gold-Alphabet-Kids-Pendant"} onClick={closeShareIcons} >
                  <EmailIcon size={32} round={true} />
                </EmailShareButton>

                <div onClick={()=>{shareOnInstagram(data)}}>
                <i className="fa-brands fa-square-instagram instasty"  style={{ cursor: 'pointer' }}></i>
                  
                </div>

              </div>
            )}
          </div>

          {
            open ?
              (
                <ProductDetailsCard setOpen={setOpen} data={data} />
              )
              :
              null
          }

        </div>





      </div>

    </>
  )
}

export default ProductCard
