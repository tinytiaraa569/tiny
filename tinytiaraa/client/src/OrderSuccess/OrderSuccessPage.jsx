import React, { useEffect, useState } from 'react'
import Lottie from "react-lottie";
import animationData from "./success-icon.json";
import { useSelector } from 'react-redux';


function OrderSuccessPage() {
    const [orderDetails, setOrderDetails] = useState(null);
    const { orders, isLoading } = useSelector((state) => state.order)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    useEffect(() => {
        const storedOrder = JSON.parse(localStorage.getItem("orderDetails"));
        setOrderDetails(storedOrder);
    }, []);
    console.log(orderDetails)
    return (
        <div className='w-full h-[80vh]'>
            <div className='flex flex-col justify-center items-center'>

            <Lottie options={defaultOptions} width={300} height={300} />
            <div className='mt-[-30px] text-center'>

            <h1 className='text-[22px] font-[600]'>Thank You for Your Purchase</h1>
            <p>We've received your order will ship in 5-7 business days</p>
            <p>Your Order Number is # {orderDetails?.orderId}</p>
            </div>
            </div>

            <div>

            </div>
        </div>
    )
}

export default OrderSuccessPage
