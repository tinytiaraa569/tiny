import React, { useEffect, useState } from 'react'
import './cartpage.css'
import { MdDeleteForever } from "react-icons/md";
import styles from '../Styles/styles';
import { IoBagHandleOutline } from 'react-icons/io5';
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { backend_url, server } from '@/server';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/redux/actions/cart';
import { toast } from 'react-toastify';
import { RxCross1 } from 'react-icons/rx';
import { BsShieldLock } from "react-icons/bs";

import visaimg from './images/visa.svg'
import mastercardimg from './images/mastercard.svg'
import gpayimg from './images/gpay.svg'
import ameximg from './images/amex.svg'
import paytmimg from './images/paytm-icon.svg'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { LuShoppingBag } from "react-icons/lu";
import axios from 'axios';
import { FaTimesCircle } from 'react-icons/fa';





function Cartpage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // const toatalPrice = data.discountPrice * value
  const { cart } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null)
  const [gstAmount, setGstAmount] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data))

  }

  // const totalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0)

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data))

  }

  const handleClearCoupon = () => {
    setDiscountPrice(null);
    setCouponCodeData(null);
    setCouponCode("");
  };
  const subTotalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0)

  const shipping = "Free Shipping"

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = couponCode;

    try {
      const res = await axios.get(`${server}/coupon/get-coupon-value/${name}`);

      if (res.data.success && res.data.couponCode) {
        const shopId = res.data.couponCode?.shop;
        const couponCodeValue = res.data.couponCode?.value;
        const percentageDiscount = res.data.couponCode?.percentageDiscount;
        const isCouponValid = cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for items in your cart.");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );

          let calculatedDiscount = 0;

          if (percentageDiscount !== null) {
            // Calculate discount based on percentage
            calculatedDiscount = (eligiblePrice * (percentageDiscount / 100)).toFixed(2);
          } else {
            // Use fixed value discount
            calculatedDiscount = couponCodeValue.toFixed(2);
          }

          setDiscountPrice(calculatedDiscount); // Set the discount price
          setCouponCodeData(res.data.couponCode); // Store coupon code data if needed elsewhere
          toast.success("Coupon applied successfully.");
          setCouponCode("");

        }
      } else {
        toast.error("Coupon code does not exist.");
        setCouponCode("");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error("Failed to apply coupon code. Please try again later.");
    }
  };

  const totalPrice = (subTotalPrice - discountPrice).toFixed(2);

  useEffect(() => {
    const gst = (totalPrice * 3) / 100;
    setGstAmount(gst.toFixed(2));
  }, [totalPrice]);

  const handleCheckout = () =>{
    const orderData ={
      cart,
      totalPrice,
      subTotalPrice,
      shipping,
      user,
      discountPrice,


    }

    //updating local storage 
    localStorage.setItem("latestOrder",JSON.stringify(orderData))
    navigate("/checkout-page")
  }





  return (
    // <div>

    // // <div className='w-full h-screen checkoutsection mt-2'>
    // //   <h1 className='text-center font-[500] text-[25px]'>Checkout Page</h1>
    // //   {
    // //     cart && cart.length === 0 ?
    // //       <div>
    // //         <div className='w-full h-screen flex justify-center items-center'>
    // //           <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
    // //             <RxCross1 className='cursor-pointer' />

    // //           </div>
    // //           <h5>Your Cart Is Empty ! </h5>

    // //         </div>

    // //       </div>
    // //       :
    // //       <div className='flex justify-evenly'>
    // //         <div className='leftcheckoutscetion'>
    // //           <div className={`${styles.noramlFlex} justify-center p-4`}>
    // //             <IoBagHandleOutline size={25} />
    // //             <h5 className='pl-2 text-[20px] font-[500]'>{cart.length} Items</h5>
    // //           </div>
    // //           <div>
    // //             {
    // //               cart && cart.map((val, index) => {
    // //                 console.log(val)
    // //                 return (
    // //                   <div className="leftcheckoutcard mb-5" key={index}>

    // //                     <CartSingle data={val} quantityChangeHandler={quantityChangeHandler} removeFromCartHandler={removeFromCartHandler} />


    // //                     <div className='self px-6 py-10 cursor-pointer' style={{ alignSelf: "flex-start" }} onClick={() => removeFromCartHandler(val)}>
    // //                       <MdDeleteForever size={30} color='#e44343' />

    // //                     </div>

    // //                   </div>
    // //                 )
    // //               })
    // //             }
    // //           </div>
    // //           <div className='mt-2'>
    // //             <h2 className='text-[22px] font-[600]'>Total : - ₹ {totalPrice}</h2>

    // //           </div>

    // //         </div>

    // //         <div className='rightcheckoutscetion' >
    // //           <button className={`border p-2 ${styles.cart_button}`}>CheckOut Page</button>

    // //         </div>

    // //       </div>
    // //   }

    // // </div>
    // </div>

    <div className='w-full  bg-[#fafafa;] pb-8'>
      <div class="text-center font-[500] text-[22px] py-5">
        <h2>Secure Shopping Bag</h2>
        <div className={`text-center flex justify-center items-center`}>
          <LuShoppingBag size={18} />
          <h5 className='pl-2 text-[18px] font-[400]'>{cart && cart.length} Items</h5>
        </div>
      </div>
      {

        cart && cart.length === 0 ?
          <div>
            <div className='w-full h-screen flex justify-center items-center'>
              <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                <RxCross1 className='cursor-pointer' />

              </div>
              <h5>Your Cart Is Empty ! </h5>

            </div>

          </div>


          :
          <div className="cartpagesection">

            <div className="leftcartpagemainsec">
              {
                cart && cart.map((val, index) => {
                  console.log(val)
                  return (
                    <div className="leftcheckoutcard mb-5" key={index}>

                      <CartSingle data={val} quantityChangeHandler={quantityChangeHandler} removeFromCartHandler={removeFromCartHandler} />

                    </div>
                  )
                })
              }

              {/* <div className='mt-2'>
                 <h2 className='text-[22px] font-[600]'>Total : - ₹ {totalPrice}</h2>

               </div> */}


              <div className="lastsectioncartpage">
                {/* cart contact section */}

                <div className="contactusec">
                  <h3>Need Help?</h3>
                  <div className="contactus">
                    <div className="phonecontact">
                      <span className="phoneicon" width={24} height={24}>
                        <i className="fa-solid fa-phone" />
                      </span>
                      <span className="phonenumber spantext">Call US :- +91 86570 62511</span>
                    </div>
                    <div className="phonecontact">
                      <span className="emailicon" width={24} height={24}>
                        <i className="fa-solid fa-envelope" />
                      </span>
                      <span className="phonenumber spantext">Email US</span>
                    </div>
                    <div className="phonecontact">
                      <span className="chaticon" width={24} height={24}>
                        <i className="fa-solid fa-message" />
                      </span>
                      <span className="phonenumber spantext">Chat With US </span>
                    </div>
                    <a className="textclr" href="">
                      Shipping and Return Policy
                    </a>{" "}
                    <br />
                    <a className="textclr" href="">
                      FAQs
                    </a>
                  </div>
                </div>
                {/* cart Personalised meassage */}
                <div className="personalised">
                  <div className="gift-msg-wrapper">
                    <span className="msg-heading">Personalized Gift Message</span>
                    <span className="sub-heading">
                      Leave your message &amp; we’ll send it along as handwritten note.
                    </span>
                    <textarea name="" id="" defaultValue={""} />
                  </div>
                  <div className="btn-wrapper">
                    <span className="a2 save-btn">Save</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rightcartpage">
              <div className="coupounsection">
                <h3>Offer code</h3>
                <form onSubmit={handleSubmit}>
                  <div className="coupon">

                    <div id="coupon" className="coupon-input">
                      <input
                        type="text"
                        className="input-text b1 "
                        name="coupon_code"
                        placeholder="Enter Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}

                      />
                    </div>

                    <div className="couponbtn">
                      <button type='submit'>Apply</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="summarysection">
                <h3>Order Summary</h3>
                <div className="sub-total ">
                  <span className="label">Subtotal</span>
                  <span className="value">₹ {subTotalPrice}</span>
                </div>
                <div className="sub-total ">
                  <span className="label">Coupon Discount:</span>
                  <span className="value">
                    {discountPrice > 0 ? (
                      <div className="flex items-center">
                        <h5 className="label !text-[16px]">- ₹{discountPrice}</h5>
                        <span onClick={handleClearCoupon} className="ml-2 cursor-pointer text-red-500"><FaTimesCircle /></span>
                      </div>
                    ) : (
                      <h5 className="text-[18px] font-[600]">-</h5>
                    )}
                  </span>
                </div>
                <div className="sub-total ">
                  <span className="label">
                    Delivery By <span className="deltext">Jul 02 - Jul 03</span>
                  </span>
                  <span className="value">Free</span>
                </div>
                <div className="sub-total ">
                  <span className="label">
                    *Other shipping methods available on checkout
                  </span>
                </div>
                <div className="sub-total bb">
                  <span className="label">Sales Tax</span>
                  <span className="label">Applied at Checkout</span>
                </div>
                <div className="sub-total sub-totalpp">
                  <span className="">Order Total </span>
                  <span className="">₹ {totalPrice}</span>
                </div>
              </div>
              <div className="checkout">
                
                  <div className="secure-checkout cursor-pointer" onClick={handleCheckout}>
                    <BsShieldLock size={25} />
                    <span className="secure-text">Secure Checkout</span>
                    <i className="fa fa-angle-right fs24" />
                  </div>
                
              </div>
              <div className="paymentsection">
                <p>OR</p>

              </div>
              <div className="paymentaccept">
                <h3>We Accept Payment</h3>
                <div className="payemntacceptimagaes">
                  <img
                    src={visaimg}
                    alt=""
                  />
                  <img
                    src={mastercardimg}
                    alt=""
                  />
                  <img
                    src={ameximg}
                    alt=""
                  />
                  <img
                    src={paytmimg}
                    alt=""
                  />
                  <img
                    src={gpayimg}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

      }



    </div>


  )
}


const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty)

  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product Stock limit")
    } else {
      setValue(value + 1)
      const updateCartData = { ...data, qty: value + 1 }
      quantityChangeHandler(updateCartData)
    }


  }
  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1)
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 }
    quantityChangeHandler(updateCartData)
  }
  const metalColors = {
    0: "Yellow Gold",
    1: "Rose Gold",
    2: "White Gold",
  };

  return (

    // <div>

    // // <div className='flex px-7 py-3'>
    // //   <div className="leftcheckoutsectionimg">
    // //     <img src={`${backend_url}${data?.images[0]}`} alt="" />
    // //   </div>
    // //   <div className="leftcheckoutcontent mb-0.5">
    // //     <h3 className='text-[1.2rem] '>{data.name}</h3>
    // //     <div className="checkoutskuid ">
    // //       <p className='text-[0.7rem] text-[#ada9ad] '>{data.skuid}</p>
    // //     </div>
    // //     <div className="checkoutoptions ">
    // //       <h3 className='text-[0.8rem]'><span className='font-[500]'>Metal Colour:</span> Rose Gold</h3>
    // //       <h3 className='text-[0.8rem]'><span className='font-[500]'>Chain:</span> With 1gm Chain ( 11 inches)</h3>

    // //     </div>

    // //     <div className="checkoutsectionprice mt-1 mb-0.5">

    // //       <h3 className='text-[0.9rem] '>₹{data.discountPrice} * {value}</h3>
    // //       {/* <h3 className='text-[0.9rem]'>₹{data.discountPrice}</h3>
    // //                       <h3 className='text-[#ada9ad] line-through ml-[5px] text-[0.9rem]'>₹{data.originalPrice}</h3>
    // //                       <h3 className='text-[#EB4F5C] ml-[5px] text-[0.9rem]'>save₹{data.originalPrice - data.discountPrice}</h3> */}

    // //     </div>
    // //     <div>
    // //       <span className='text-[#EB4F5C]'> ₹ {totalPrice}</span>
    // //     </div>



    // //     <div className="quantityincdesc flex">
    // //       {/* {
    // //                         cartData && cartData.map((i, index) => {
    // //                           return (
    // //                             <CartSingle key={index} data={i} />
    // //                           )

    // //                         })
    // //                       } */}
    // //       <div className='flex gap-2 mt-2'>
    // //         <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
    // //           onClick={() => increment(data)}>
    // //           <HiPlus size={18} color="#fff" />
    // //         </div>
    // //         <span>{data.qty}</span>

    // //         <div className={`bg-[#a7abb14f] border border-[#a7abb14f] text-[#000] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
    // //           onClick={() => decrement(data)}>
    // //           <HiOutlineMinus size={18} color="#000" />
    // //         </div>

    // //       </div>


    // //     </div>

    // //   </div>
    // // </div>
    // </div>

    <div className="leftcartpage">
      <div className="leftcardsec1">
        <div className="leftcardimg">
          <a className="image-container" href="">
            <img
              src={`${backend_url}${data?.images[0]}`}
              width={166}
              height={166}
            />
          </a>
        </div>
        <div className="leftcarddetail">
          <div className="leftcarddeatilhead">
            <h2>{data.name}</h2>
            <div className='cursor-pointer mr-4' onClick={() => removeFromCartHandler(data)}>
              <MdDeleteForever size={30} color='#e44343' />
            </div>



          </div>
          <div className="sku-id">
            <span className="notranslate">{data.skuid}</span>
          </div>
          <div className="item-qty">
            <div className="qty-field b1 ">
              <label htmlFor="qty">QTY: </label>
              <span value={data.qty}>{data.qty}</span>
            </div>

          </div>
          <div className="leftcardprice mb-2">
            <span className="oprice">₹{data.originalPrice}</span>
            <span className="disprice pl-1">₹{data.discountPrice}</span>
            <span className='text-[#EB4F5C] ml-[5px] text-[0.9rem] pl-1'>save₹{data.originalPrice - data.discountPrice}</span>
          </div>

          <div className="details">
            <div className="checkoutoptions ">
              <h3 className='text-[0.6rem]'><span className='font-[500]'>Metal Colour:</span>  {metalColors[data.selectedColor]}</h3>
              <h3 className='text-[0.6rem]'><span className='font-[500]'>Chain:</span> {data.showWithChain ? 'With Chain' : 'Without Chain'}</h3>

            </div>

          </div>
          <div className='flex gap-2 mt-2'>

            <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
              onClick={() => increment(data)}>
              <HiPlus size={18} color="#fff" />
            </div>
            <span>{data.qty}</span>

            <div className={`bg-[#a7abb14f] border border-[#a7abb14f] text-[#000] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
              onClick={() => decrement(data)}>
              <HiOutlineMinus size={18} color="#000" />
            </div>

          </div>
          <div className="checkoutsectionprice mt-1 mb-0.5">
            <h3 className='text-[0.8rem] '>₹{data.discountPrice} * {value}</h3>
            <div>
              <span className='text-[#EB4F5C] text-[0.8rem]'>SubTotal :-  ₹ {totalPrice}</span>
            </div>



          </div>

        </div>
      </div>
    </div>

  )

}

export default Cartpage
