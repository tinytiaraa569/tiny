import React, { useEffect, useState } from 'react'
import razopayimg from './images/razorpay-icon.svg'
import { backend_url, server } from '@/server';
import { Country, State } from 'country-state-city';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PaymentPage() {
    const [orderData, setOrderData] = useState([])
    const [orderID, setOrderID] = useState(null)
    const [fullCountryName, setFullCountryName] = useState('');
    const [fullStateName, setFullStateName] = useState('');

    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()



    useEffect(() => {
        if (orderData?.shippingAddress?.country) {
            const country = Country.getCountryByCode(orderData.shippingAddress.country);
            setFullCountryName(country?.name || '');
        } else {
            setFullCountryName('');
        }
    }, [orderData?.shippingAddress?.country]);

    useEffect(() => {
        if (orderData?.shippingAddress?.city && orderData?.shippingAddress?.country) {
            const state = State.getStateByCodeAndCountry(orderData.shippingAddress.city, orderData.shippingAddress.country);
            setFullStateName(state?.name || '');
        } else {
            setFullStateName('');
        }
    }, [orderData?.shippingAddress?.city, orderData?.shippingAddress?.country]);
    // console.log(fullCountryName, fullStateName)



    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem("latestOrder"))
        setOrderData(orderData)
    }, [])

    
    const order = {
        cart: orderData?.cart,
        shippingAddress: orderData?.shippingAddress,
        user: user && user,
        totalPrice: orderData?.totalPrice,
        couponDiscount:orderData?.discountPrice,
        paymentInfo: {},
    }

    console.log(order ,"orderdata")



    // function handlepayment() {
    //     let data = {
    //         amount: 5 * 100,
    //         currency: "INR",
    //         receipt: "qwsaq1",
    //     };

    //     fetch("http://localhost:8000/order", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //     }).then((result) => {
    //         result.json().then((res) => {
    //             setOrderID(res.id)
    //         });
    //     });

    //     var options = {
    //         key: "rzp_test_TKfJulmRsFjGyI", // Enter the Key ID generated from the Dashboard
    //         amount: 50000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //         currency: "INR",
    //         name: "Ru-brama", //your business name
    //         description: "Test Transaction",
    //         image: "https://example.com/your_logo",
    //         order_id: orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //         callback_url: "/success",
    //         prefill: {
    //             //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
    //             name: "Gaurav Kumar", //your customer's name
    //             email: "gaurav.kumar@example.com",
    //             contact: "9000090000", //Provide the customer's phone number for better conversion rates
    //         },
    //         notes: {
    //             address: "Razorpay Corporate Office",
    //         },
    //         theme: {
    //             color: "#3399cc",
    //         },
    //     };
    //     var rzp1 = new Razorpay(options);
    //     rzp1.open();

    //     rzp1.on("payment.success", function (e) {
    //         e.preventDefault();

    //         alert("Order placed successfully! Order ID: " + res.id);

    //         // Dispatch an action to clear the cart upon successful payment
    //     });

    // }

    const handleRazorpayPayment = async () => {
        try {
            // Step 1: Create an order on your backend
            const response = await fetch(`${backend_url}order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: orderData.totalPrice * 100,
                    currency: "INR",
                    receipt: "qwsaq1",
                })
            });
            const data = await response.json();
            setOrderID(data.id);

            // Step 2: Initiate Razorpay payment
            const options = {
                key: "rzp_test_TKfJulmRsFjGyI", // Replace with your Razorpay key
                amount: orderData.totalPrice * 100, // Amount in paisa (INR)
                currency: "INR",
                name: "Tiny Tiaraa", // Your business name
                description: "Test Transaction",
                image: "https://lirp.cdn-website.com/48f148a6/dms3rep/multi/opt/Tiny+Tiaraa_C5-1920w.png",
                order_id: data.id, // Order ID obtained from your server
                handler: function (response) {
                    handlePaymentSuccess(response);
                    console.log(response, "check reponse for gateway")
                },
                prefill: {
                    name: orderData?.shippingAddress?.name,
                    email: orderData?.shippingAddress?.email,
                    contact: orderData?.shippingAddress?.phoneNumber,
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Error in handleRazorpayPayment:", error);
            alert("Error occurred while processing payment.");
        }
    };

    const handlePaymentSuccess = async (paymentDetails) => {
        console.log('Payment successful. Details:', paymentDetails);
        const updatedOrder = {
            ...order,
            paymentInfo: {
                id: paymentDetails.razorpay_payment_id,
                status: 'success',
                type: 'Razorpay',
            },
        };

        try {
            console.log('Sending updated order to server:', updatedOrder);
            const response = await axios.post(`${server}/order/create-order`, updatedOrder, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Server response:', response.data);

            toast.success("Order Successfully Placed");
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("latestOrder", JSON.stringify([]));
            localStorage.setItem("orderDetails", JSON.stringify(updatedOrder));
            navigate("/order/success");
            window.location.reload()

            // Handle actions upon successful payment
            alert(`Payment successful! Payment ID: ${paymentDetails.razorpay_payment_id}`);
        } catch (error) {
           console.log(error)
            toast.error("Failed to place order. Please try again.");
        }
        // You can perform actions like updating database, clearing cart, etc.
    };

    const handlecashondel = async (e) =>{
        e.preventDefault()
        const updatedOrder = {
            ...order,
            paymentInfo: {
                type: 'Cash on Delivery',
            },
        };

        try {
            const response = await axios.post(`${server}/order/create-order`, updatedOrder, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Server response:', response.data);

            toast.success("Order Successfully Placed");
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("latestOrder", JSON.stringify([]));
            localStorage.setItem("orderDetails", JSON.stringify(updatedOrder));
            navigate("/order/success");
            window.location.reload()

            // Handle actions upon successful payment
           
        } catch (error) {
           console.log(error)
            toast.error("Failed to place order. Please try again.");
        }

    }
     return (
        <div className='w-full bg-[#fafafa;] pb-8'>
            <div >

                <div className='w-full flex pt-3 mb-7'>


                    <div className='w-[100%]'>
                        <h2 className='text-center text-[20px] font-[600]'>Payment Page</h2>
                    </div>
                </div>


                <div className='checkoutsectionmainlast flex gap-10 justify-center w-full h-auto'>
                    <div className='checkoutleft w-[50%]'>
                        <div className="contact-information bg-[#ffffff] mb-[16px] shadow-lg">
                            <div className=' mb-[12px]'>
                                <h2 className='text-[16px] font-[600] text-[#161618] '> Delivery Method</h2>

                            </div>

                            <div className=''>
                                <div className='flex items-center gap-4'>
                                    <div>
                                        <label className='text-[14px] font-[500] mb-[4px] tracking-[0.55px] block' for="shipping-method">Standard Delivery - FREE</label>
                                        <span className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block'>(Delivery By Jul 19 - Jul 22)</span>
                                    </div>
                                </div>


                            </div>


                        </div>

                        <div className="contact-information bg-[#ffffff] mb-[16px] shadow-lg">
                            <div className=' mb-[12px]'>
                                <h2 className='text-[16px] font-[600] text-[#161618] '>Delivery & Billing Details</h2>

                            </div>

                            <div className=''>
                                <div className='mb-2'>
                                    <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-method">{orderData?.shippingAddress?.name}</p>
                                    <p className='text-[14px] font-[400] tracking-[0.55px] block' for="shipping-method">{orderData?.shippingAddress?.address1}</p>
                                    <p className='text-[14px] font-[400]  tracking-[0.55px] block' for="shipping-method">{orderData?.shippingAddress?.address2}</p>
                                    <p className='text-[14px] font-[400]  tracking-[0.55px] block' for="shipping-method">{fullStateName}</p>
                                    <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-method">{fullCountryName}</p>

                                </div>
                                <div>
                                    <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-method">{orderData?.shippingAddress?.email}</p>
                                    <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-method">{orderData?.shippingAddress?.phoneNumber}</p>



                                </div>


                            </div>


                        </div>

                        <div className="contact-information bg-[#ffffff] mb-[16px] shadow-lg">
                            <div className=' mb-[12px]'>
                                <h2 className='text-[16px] font-[600] text-[#161618] '>Select Payment Method</h2>
                            </div>

                            <div className=''>
                                <div className='flex items-center gap-8'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            id="razorpay"
                                            type="radio"
                                            name="paymentMethod"
                                            value="razorpay"
                                            checked={selectedPaymentMethod === 'razorpay'}
                                            onChange={handlePaymentMethodChange}
                                            className="int-emailcheck !w-[15px] !h-[15px]"
                                            required
                                        />
                                        <div>
                                            <label htmlFor="razorpay">
                                                <img src={razopayimg} alt="" className='!w-[100px] !h-[60px]' />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex items-center gap-8'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            id="cod"
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={selectedPaymentMethod === 'cod'}
                                            onChange={handlePaymentMethodChange}
                                            className="int-emailcheck !w-[15px] !h-[15px]"
                                            required
                                        />
                                        <div>
                                            <label htmlFor="cod">
                                                <h2>Cash On Delivery</h2>
                                            </label>
                                        </div>
                                    </div>
                                </div>


                            </div>


                        </div>

                        <div className='flex justify-end '>
                            <div className={`button-wrapperdiv`} >
                                {
                                    selectedPaymentMethod === 'razorpay' ?
                                        <button onClick={handleRazorpayPayment}>Pay With Razorpay</button>
                                        :
                                        <button onClick={handlecashondel}>Cash On Delivery</button>
                                }

                            </div>
                        </div>



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
                                        <span className="value">₹ {orderData?.gstAmount}</span>
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

export default PaymentPage
