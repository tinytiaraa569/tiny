import { getAllOrdersOfShop } from '@/redux/actions/order'
import styles from '@/Styles/styles'
import React, { useEffect, useState } from 'react'
import { BsFillBagFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CiViewList } from "react-icons/ci";
import { backend_url, server } from '@/server'
import axios from 'axios'
import { toast } from 'react-toastify'

function OrderDetails() {
    const { orders, isLoading } = useSelector((state) => state.order)
    const { seller } = useSelector((state) => state.seller)

    console.log(orders, "see ")

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [status, setStatus] = useState("")
    const { id } = useParams()

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id))
    }, [dispatch])

    const data = orders && orders.find((item) => item._id === id)


    const orderUpdateHandler = async (e) => {
        e.preventDefault()

        await axios.put(`${server}/order/update-order-status/${id}`, {
            status
        }, { withCredentials: true }).then((res) => {
            toast.success("Order Updated")
            navigate("/dashboard-orders")

        }).catch((error) => {
            console.log(error)
            toast.error(error.response.data.message)

        })


    }

    const refundOrderUpdateHandler = async (e) => {
        e.preventDefault()

        await axios.put(`${server}/order/order-refund-success/${id}`, {
            status
        }, { withCredentials: true }).then((res) => {
            toast.success("Order Updated")
            dispatch(getAllOrdersOfShop(seller._id))


        }).catch((error) => {
            console.log(error)
            toast.error(error.response.data.message)

        })


    }

    return (
        <div className={`py-4 min-h-screen ${styles.section}`}>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center'>
                    <BsFillBagFill size={30} color='crimson' />
                    <h1 className='pl-2 text-[25px]'>Order Details</h1>

                </div>
                <Link to="/dashboard-orders">
                    <div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}>
                        <CiViewList className='mr-2' />
                        Order List
                    </div>

                </Link>

            </div>

            <div className='w-full flex items-center justify-between pt-6'>
                <h5 className='text-[#000b]'>Order Id : - #<span>{data?._id?.slice(0, 8)}</span></h5>

                <h5 className='text-[#000b]'>Placed on :- <span>{data?.createdAt?.slice(0, 10)}</span> </h5>
            </div>
            {/* order items */}
            {
                data && data?.cart.map((item, index) => {
                    return (
                        <div key={index} className='w-full flex items-start mt-5 mb-5'>
                            <img src={`${backend_url}/${item.images[0]}`} alt="" className='w-[280px] h-[280px]' />


                            <div className="w-full">
                                <h5 className='pl-3 text-[20px]'>{item.name}</h5>
                                <h5 className='pl-3 text-[14px]  text-[#0000008c]'>{item.skuid} </h5>
                                <h5 className='pl-3 text-[14px] mt-2 text-[#0000008c]'><span className='font-[600]'>Category :</span> {item.category}</h5>
                                <h5 className='pl-3 text-[14px] text-[#0000008c]'><span className='font-[600]'>subcategory :</span> {item.subcategory}</h5>
                                <h5 className='pl-3 text-[14px] mt-2 text-[#0000008c]'><span className='font-[600]'>Quantity :</span> {item.qty}</h5>


                                <div className='mt-2'>
                                    <h5 className='pl-3 text-[14px] text-[#0000008c]'><span className='font-[600]'>Chain :</span> YES / NO</h5>
                                    <h5 className='pl-3 text-[14px] text-[#0000008c]'><span className='font-[600]'>Metal Color :</span> Color Name</h5>
                                    <h5 className='pl-3 text-[14px] text-[#0000008c]'><span className='font-[600]'>Enamel :</span> Color Name</h5>



                                </div>
                                <div className='mt-3'>
                                    <h5 className='pl-3 text-[14px] text-[#0000008c]'><span className='font-[600]'>Weight </span></h5>
                                    <h5 className='pl-3 text-[14px] text-[#0000008c]'><span className='font-[600]'>Gold :</span>{item.goldWeight ? item.goldWeight.weight : "not Updated"}</h5>
                                    <h5 className='pl-3 text-[14px] text-[#0000008c]'><span className='font-[600]'>Diamond :</span>{item.diamondWeight ? item.diamondWeight.weight : "Not upfded"}</h5>



                                </div>




                                <h5 className='pl-3 text-[16px] mt-2 text-[#0000008c]'>₹{item.discountPrice} x {item.qty}</h5>

                            </div>
                        </div>
                    )
                })
            }
            <div className='border-t w-full text-right mb-5'>
                <h5 className='pt-3 text-[18px]'>Total Price : <strong>₹{data?.totalPrice}</strong> </h5>

            </div>
            <div className="w-full flex justify-between items-center">
                <div className='w-[60%] '>
                    <h4 className='pt-3 text-[20px] font-[600]'>Shipping Address</h4>
                    <h4 className='pt-3 text-[18px] text-[#000b]'>{data?.shippingAddress.address1}</h4>
                    <h4 className='pt-1 text-[18px] text-[#000b]'>{data?.shippingAddress.address2}</h4>
                    <h4 className='pt-1 text-[18px] text-[#000b]'>{data?.shippingAddress.city}</h4>
                    <h4 className='pt-1 text-[18px] text-[#000b]'>{data?.shippingAddress.country}</h4>
                    <h4 className='pt-1 text-[18px] font-[500] text-[#000b]'>{data?.shippingAddress?.phoneNumber}</h4>
                </div>

                <div className="w-[30%]">
                    <h4 className='pt-3 text-[20px]'>Payment Information</h4>
                    <h4>Status : {
                        data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"

                    }
                    </h4>
                    <h4>Type : {
                        data?.paymentInfo?.type
                    }
                    </h4>
                </div>

            </div>

            <div className='w-full mt-5'>
                <h4 className='pt-3 text-[20px] font-[600]'>Order Status :</h4>
                {
                    data?.status !== "Processing Refund" && data?.status !== "refund Success" && (
                        <select name="" id="" value={status} onChange={(e) => { setStatus(e.target.value) }} className='w-[200px] border h-[35px] mt-2 rounded-[5px] pl-2'>
                            {
                                [
                                    "Confirmed",
                                    "Processing",
                                    "Shipping",
                                    "Received",
                                    "On the way",
                                    "Delivered"
                                ].slice(
                                    [
                                        "Confirmed",
                                        "Processing",
                                        "Shipping",
                                        "Received",
                                        "On the way",
                                        "Delivered"
                                    ].indexOf(data?.status)
                                ).map((option, index) => (
                                    <option value={option} key={index}>{option}</option>
                                ))
                            }
                        </select>
                    )
                }
                {
                    data?.status === "Processing Refund" || data?.status === "refund Success" ?
                        (
                            <select name="" id="" value={status} onChange={(e) => { setStatus(e.target.value) }} className='w-[200px] border h-[35px] mt-2 rounded-[5px] pl-2'>
                                {
                                    [
                                        "Processing Refund",
                                        "refund Success",

                                    ].slice(
                                        [
                                            "Processing Refund",
                                            "refund Success"
                                        ].indexOf(data?.status)
                                    ).map((option, index) => (
                                        <option value={option} key={index}>{option}</option>
                                    ))
                                }

                            </select>
                        ) :
                        null
                }

                <div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
                    onClick={data?.status !== "Processing Refund" ? orderUpdateHandler : refundOrderUpdateHandler}>
                    Update Status

                </div>
            </div>


        </div>
    )
}

export default OrderDetails
