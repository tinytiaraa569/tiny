import styles from '@/Styles/styles'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { json, Link, useNavigate } from 'react-router-dom'
import { Country, State } from "country-state-city";
import axios from 'axios';
import { backend_url, server } from '@/server';
import { toast } from 'react-toastify';
import { FaTimesCircle } from 'react-icons/fa';
import { IoIosArrowBack } from "react-icons/io";
import './checkout.css'
import { BsDash } from 'react-icons/bs';

function CheckoutPage() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { cart } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user)
    const [userInfo, setUserInfo] = useState(false)
    const [orderData, setOrderData] = useState([])
    console.log(orderData)

    const navigate = useNavigate()

    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');

    // Effect to update name and email if user changes
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);
    const [phoneNumber, setphoneNumber] = useState('');



    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [couponCode, setCouponCode] = useState("");
    const [couponCodeData, setCouponCodeData] = useState(null)
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
    const [gstAmount, setGstAmount] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(null)
    // console.log(discountPrice, "coupoun discount")



    const subTotalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0)

    const shipping = "Free Shipping"




    const totalPrice = (subTotalPrice - discountPrice).toFixed(2);

    useEffect(() => {
        const gst = (totalPrice * 3) / 100;
        setGstAmount(gst.toFixed(2));
    }, [totalPrice]);


    const handleCheckboxChange = (index) => {
        if (index === selectedAddressIndex) {
            setSelectedAddressIndex(null);
            setAddress1('');
            setAddress2('');
            setZipCode('');
            setCountry('');
            setCity('');
        } else {
            setSelectedAddressIndex(index);
            const address = user.addresses[index];
            setAddress1(address.address1);
            setAddress2(address.address2);
            setZipCode(address.zipCode);
            setCountry(address.country);
            setCity(address.city);
        }
    };

    useEffect(() => {
        const fetchedOrderData = JSON.parse(localStorage.getItem("latestOrder"));
        if (fetchedOrderData) {
            setOrderData(fetchedOrderData);
            setDiscountPrice(fetchedOrderData.discountPrice); 
        }
    }, [])

    const handleback = () => {
        navigate("/cart")
    }


    const paymentSubmit = (e) => {
        e.preventDefault()
        if ( name === "" || email === "" || phoneNumber === "" || address1 === "" || address2 === "" || zipCode === null || country === "" || city === "") {
            toast.error("Please Fill  Your Delivery Address")

        } else {
            const shippingAddress = {
                email, name , phoneNumber, address1, address2, zipCode, country, city
            }
            const orderData = {
                cart, totalPrice, subTotalPrice, shipping, discountPrice, user, shippingAddress ,gstAmount
            }

            localStorage.setItem("latestOrder", JSON.stringify(orderData))
            navigate("/payment")
        }
    }

    return (

        <div className='w-full bg-[#fafafa;] pb-8'>
            <div >

                <div className='w-full flex pt-3 mb-7'>

                    <div className='w-[10%] flex !text-[black] items-center gap-2 pl-2 cursor-pointer' onClick={handleback}>
                        <IoIosArrowBack />
                        <span className='text-[18px]'>Bag</span>
                    </div>
                    <div className='w-[80%]'>
                        <h2 className='text-center text-[20px] font-[600]'>Secure Checkout</h2>
                    </div>
                </div>


                <div className='checkoutsectionmainlast flex gap-10 justify-center w-full h-auto'>
                    <div className='checkoutleft w-[50%] '>
                        <form action="">

                            <div className='w-full'>
                                {/* conatct  */}
                                <div className="contact-information bg-[#ffffff] mb-[16px] shadow-sm">
                                    <div className='flex justify-between items-center mb-[12px]'>
                                        <h2 className='text-[16px] font-[400] text-[#161618] '>Contact Information</h2>
                                        <div>
                                            {user ? (
                                                <div>
                                                    <span className='text-[16px] font-[400] text-[#161618]'></span>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span className='text-[16px] font-[400] text-[#161618] '>SignUp / Login</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='w-[55%] adjustinpser'>
                                        <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block w-[100%] adjustinpser' for="shipping-email">Email Address (for sending the order confirmation)*</label>
                                        {/* <input
                                            id="shipping-email"
                                            type='text'
                                            value={user && user.email}
                                            className='int-emailcheck'
                                            placeholder="Enter Email" /> */}

                                        <input
                                            id="shipping-email"
                                            type={user ? 'text' : 'email'}
                                            value={user ? user.email : email}
                                            readOnly={user ? true : false}
                                            onChange={!user ? (e) => setEmail(e.target.value) : null}
                                            className='int-emailcheck'
                                            placeholder="Enter Email"
                                            required={!user}
                                        />
                                    </div>

                                </div>


                                {/* address section */}
                                <div className="form-information bg-[#ffffff] mb-[16px] p-4 shadow-lg">

                                    <div className='mb-[12px]'>
                                        <h2 className='text-[16px] font-[400] text-[#161618] '>Delivery Address</h2>
                                    </div>

                                    <div className='flex gap-5 items-center mb-4 sercol'>
                                        <div className='w-[45%]  adjustinpser'>
                                            <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-fname">First Name *</label>
                                            {user ? (
                                                <input
                                                    id="shipping-fname"
                                                    type='text'
                                                    value={user?.name}
                                                    readOnly
                                                    className='int-emailcheck'
                                                    placeholder="Enter first name"
                                                />
                                            ) : (
                                                <input
                                                    id="shipping-fname"
                                                    type='text'
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className='int-emailcheck'
                                                    placeholder="Enter first name"
                                                    required
                                                />
                                            )}
                                        </div>
                                        <div className='w-[45%]  adjustinpser'>
                                            <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-lname">Last Name *</label>
                                            {user ? (
                                                <input
                                                    id="shipping-fname"
                                                    type='text'
                                                    value={user?.name}
                                                    readOnly
                                                    className='int-emailcheck'
                                                    placeholder="Enter first name"
                                                />
                                            ) : (
                                                <input
                                                    id="shipping-fname"
                                                    type='text'
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className='int-emailcheck'
                                                    placeholder="Enter first name"
                                                    required
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className='flex gap-5 items-center mb-4 sercol'>
                                        <div className='w-[45%] adjustinpser'>
                                            <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-cnumber">Phone Number (for delivery updates) *</label>
                                            <input 
                                            value={phoneNumber}
                                            id="shipping-cnumber"
                                            onChange={(e)=>{setphoneNumber(e.target.value)}}
                                             type='tel'
                                              className='int-emailcheck'
                                               placeholder="Enter Your Contact Number" />
                                        </div>
                                        <div className='w-[45%] adjustinpser'>
                                            <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-counry">Country *</label>
                                            <select
                                                id='shipping-counry'
                                                className="int-emailcheck rounded-[5px]"
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                            >
                                                <option className="text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block" value="">
                                                    Choose your country
                                                </option>
                                                {Country &&
                                                    Country.getAllCountries().map((item) => (
                                                        <option key={item.isoCode} value={item.isoCode}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                            </select>

                                        </div>
                                    </div>

                                    <div className='flex gap-5 items-center mb-4 sercol'>
                                        <div className='w-[45%] adjustinpser'>
                                            <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-address1">Apartment, Floor  *</label>
                                            <input id="shipping-address1" type='text' value={address1} onChange={(e) => setAddress1(e.target.value)} className='int-emailcheck' placeholder="Enter Your address" />
                                        </div>
                                        <div className='w-[45%] adjustinpser'>
                                            <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-address2">Street ,Town / City *</label>
                                            <input id="shipping-address2" type='text' value={address2} onChange={(e) => setAddress2(e.target.value)} className='int-emailcheck' placeholder="Enter Your Address2" />
                                        </div>
                                    </div>
                                    <div className='flex gap-5 items-center mb-4 sercol'>
                                        <div className='w-[45%] adjustinpser'>
                                            <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-state">State *</label>
                                            <select
                                                className="int-emailcheck"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            >
                                                <option className="text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px]" value="">
                                                    Choose your State
                                                </option>
                                                {State &&
                                                    State.getStatesOfCountry(country).map((item) => (
                                                        <option key={item.isoCode} value={item.isoCode}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className='w-[45%] adjustinpser'>
                                            <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-zipcode">Zip Code *</label>
                                            <input id="shipping-zipcode" type='text' value={zipCode} onChange={(e) => setZipCode(e.target.value)} className='int-emailcheck' placeholder="Enter Your Zipcode" />
                                        </div>
                                    </div>

                                    {/* saved address */}
                                    <div>
                                        <h5 className='text-[13px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px]  cursor-pointer flex items-center gap-2 ' onClick={() => setUserInfo(!userInfo)}>
                                            <BsDash />
                                            choose from saved address
                                        </h5>
                                        {
                                            userInfo &&
                                            <div className='cursor-pointer'>
                                                {
                                                    user && user.addresses.map((item, index) => {
                                                        return (
                                                            <div key={index} className="w-full flex mt-1 text-[13px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] cursor-pointer">
                                                                <input type="checkbox"
                                                                    className='mr-3 cursor-pointer'
                                                                    id={item.addressType}
                                                                    value={item.addressType}
                                                                    onChange={() => handleCheckboxChange(index)}
                                                                    onClick={() => setAddress1(item.address1) ||
                                                                        setAddress2(item.address2) || setZipCode(item.zipCode) || setCountry(item.country) || setCity(item.city)
                                                                    }
                                                                />
                                                                <h2 className='cursor-pointer'><label htmlFor={item.addressType}>{item.addressType}</label></h2>

                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        }

                                    </div>


                                </div>

                                {/* deleverymethod */}
                                <div className="contact-information bg-[#ffffff] mb-[16px] shadow-lg">
                                    <div className=' mb-[12px]'>
                                        <h2 className='text-[16px] font-[400] text-[#161618] '>Select Delivery Method</h2>

                                    </div>

                                    <div className=''>
                                        <div className='flex items-center gap-4'>
                                            <input id="shipping-method" type='radio' required className='int-emailcheck !w-[20px] !h-[20px]' />
                                            <div>

                                                <label className='text-[14px] font-[500] mb-[4px] tracking-[0.55px] block' for="shipping-method">Standard Delivery - FREE</label>
                                                <span className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block'>(Delivery By Jul 19 - Jul 22)</span>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div className='flex justify-end '>
                                    <div className={`button-wrapperdiv`} onClick={paymentSubmit}>
                                        <button className={`button-wrapper`}>Continue To Payment</button>
                                    </div>
                                </div>


                            </div>

                        </form>
                    </div>
                    <div className='checkoutright pb-10 h-[100%] w-[35%] '>

                        <div>
                            <div >
                                <h3 className='text-[16px] font-[400] tracking-[0.55px] text-[#161618] mb-[12px]'> Order Summary</h3>

                                {
                                    orderData?.cart?.map((val, index) => {
                                        return (


                                            <div key={index} className='ordercardsec flex mb-5 shadow-sm'>
                                                <div className="image-section">
                                                    <img src={`${backend_url}${val?.images[0]}`} width="100%" height="100" />
                                                </div>
                                                <div className="detail-section">
                                                    <h3 className='text-[#161618] text-[14px] mb-[5px]'>{val.name}</h3>
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-[#161618] text-[13px] ">QTY : <span>{val.qty}</span>
                                                        </div>
                                                        <div className="">
                                                            <span className="text-[#6f6f79] text-[13px] line-through">₹{val.originalPrice}</span>
                                                            <span className=" text-[13px] pl-2" >₹{val.discountPrice}</span>
                                                        </div>


                                                    </div>
                                                    <div className="">
                                                        <span className="text-[#161618] font-[500] text-[13px]">Chain :</span>
                                                        <span className=" text-[#161618]  text-[13px] pl-2" >Without chain</span>
                                                    </div>
                                                    <div className="">
                                                        <span className="text-[#161618] font-[500] text-[13px]">Metal Color :</span>
                                                        <span className=" text-[#161618]  text-[13px] pl-2" >Rose Gold</span>
                                                    </div>
                                                </div>


                                            </div>

                                        )
                                    })
                                }



                                {/* //order details */}
                                <div className='!w-[90%]'>

                                    <div className="sub-total mt-2 ">
                                        <span className="label">Subtotal</span>
                                        <span className="value">₹ {orderData?.subTotalPrice}</span>
                                    </div>
                                    <div className="sub-total ">
                                        <span className="label">Coupon Discount:</span>
                                        <span className="value">
                                            {orderData?.discountPrice > 0 ? (
                                                <div className="flex items-center">
                                                    <h5 className="label !text-[16px]">- ₹{orderData?.discountPrice}</h5>
                                                </div>
                                            ) : (
                                                <h5 className="text-[18px] font-[600]">-</h5>
                                            )}
                                        </span>
                                    </div>
                                    <div className="sub-total ">
                                        <span className="label">
                                            Delivery By <span className="deltext">(Jul 02 - Jul 03)</span>
                                        </span>
                                        <span className="value">Free</span>
                                    </div>

                                    <div className="sub-total mt-2 bb ">
                                        <span className="label">GST (3%):</span>
                                        <span className="value">₹ {gstAmount}</span>
                                    </div>

                                    <div className="sub-total sub-totalpp">
                                        <span className="">Order Total </span>
                                        <span className="">₹ {orderData?.totalPrice}</span>
                                    </div>





                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>


    )
}

export default CheckoutPage
