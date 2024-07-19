import { getAllOrdersOfShop, getAllOrdersOfUser } from '@/redux/actions/order'
import styles from '@/Styles/styles'
import React, { useEffect, useState } from 'react'
import { BsFillBagFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { CiViewList } from "react-icons/ci";
import { backend_url, server } from '@/server'
import { RxCross1 } from 'react-icons/rx'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import axios from 'axios'
import { toast } from 'react-toastify'
import { TbTruckReturn } from 'react-icons/tb'

function UserOrderDetails() {
    const { orders, isLoading } = useSelector((state) => state.order)
    const { user } = useSelector((state) => state.user)


    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState("")
    



    const { id } = useParams()

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id))
    }, [dispatch])

    const data = orders && orders.find((item) => item._id === id)

    // console.log(data)

    const reviewHandler = async (e) => {
        e.preventDefault()
        await axios.put(`${server}/product/create-new-review`, {
            user,
            rating,
            comment,
            productId: selectedItem?._id,
            orderId: id
        }, { withCredentials: true }).then((res) => {
            toast.success(res.data.message)
            dispatch(getAllOrdersOfUser(user._id))
            setComment("")
            setRating(null)
            setOpen(false)

        }).catch((error) => {
            toast.error(error)


        })

    }





    const refundhandler = async () => {
        await axios.put(`${server}/order/order-refund/${id}`, {
            status: "Processing Refund"
        }).then((res) => {
            toast.success(res.data.message)
            dispatch(getAllOrdersOfUser(user._id))

        }).catch((error) => {
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
                            <img src={`${backend_url}/${item.images[0]}`} alt="" className='w-[80px] h-[80px]' />
                            <div className="w-full">
                                <h5 className='pl-3 text-[20px]'>{item.name}</h5>
                                <h5 className='pl-3 text-[20px] text-[#0000008c]'>₹{item.discountPrice} x {item.qty}</h5>

                            </div>

                            {
                                data?.status === "Delivered" && (
                                    <>
                                        {
                                            item.isReviewed ?
                                                null
                                                :
                                                (
                                                    <div className={`${styles.button} text-[#fff]`} onClick={() => setOpen(true) || setSelectedItem(item)}>
                                                        <h5>Write a review</h5>

                                                    </div>
                                                )
                                        }
                                    </>
                                )
                            }
                        </div>
                    )
                })
            }

            {/* review */}
            {
                open && (
                    <div className='w-full fixed top-0 left-0 h-screen bg-[#00000062] z-50 flex items-center justify-center'>
                        <div className='w-[50%] h-min bg-[#fff] shadow rounded-md p-3 pb-7'>
                            <div className='w-full flex justify-end p-3'>
                                <RxCross1 size={30} onClick={() => setOpen(false)} className='cursor-pointer' />
                            </div>
                            <h2 className='text-[25px] font-[500] text-center'>Give a review</h2>

                            <div className='w-full flex mt-3'>
                                <img src={`${backend_url}/${selectedItem?.images[0]}`} alt="" className='w-[120px] h-[120px]' />
                                <div>
                                    <div className='pl-3 text-[20px]'>
                                        <p>{selectedItem?.name}</p>
                                        <p className='text-[15px] text-[#0000008e]'>{selectedItem?.skuid}</p>
                                    </div>
                                    <h4 className='pl-3 text-[15px]'>₹{selectedItem?.discountPrice} x {selectedItem?.qty}</h4>

                                </div>


                            </div>

                            <div>
                                <h5 className='pl-5 text-[20px] font-[500]'>Give a Rating <span className='text-red-500'>*</span></h5>
                                <div className="flex w-full ml-5 pt-1">
                                    {
                                        [1, 2, 3, 4, 5].map((i) => rating >= i ? (
                                            <AiFillStar key={i} className='mr-1 cursor-pointer' color='rgb(246,186,0)' size={25} onClick={() => setRating(i)} />
                                        ) : (
                                            <AiOutlineStar key={i} className='mr-1 cursor-pointer' color='rgb(246,186,0)' size={25} onClick={() => setRating(i)} />
                                        ))
                                    }

                                </div>

                                <div className='w-full ml-5 mt-2'>
                                    <label htmlFor="" className='block text-[20px] font-[500]'>Write a Comment
                                        <span className='font-[400] text-[16px] text-[#0000006c] ml-2'>(optional)</span>
                                    </label>
                                  
                                    <textarea name="comment" id="" value={comment} onChange={(e) => setComment(e.target.value)} cols={20} rows={5} placeholder='how was your product? write your Review' className='mt-2 !w-[90%]  border p-2 outline-none'></textarea>
                                </div>
                                <div className={`${styles.button} text-white text-[20px] ml-3`} onClick={rating > 1 ? reviewHandler : null}>
                                    Submit
                                </div>
                            </div>


                        </div>
                    </div>
                )
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


                    {
                        data?.status === "Delivered" && (
                            <div className={`${styles.button} text-white`} onClick={refundhandler}>
                                <TbTruckReturn size={30} className='mr-2' />
                                <span className='text-[20px] tracking-[0.55px]'>Return</span>
                            </div>
                        )
                    }
                </div>


            </div>






        </div>
    )
}


export default UserOrderDetails

