import { getAllOrdersOfUser } from '@/redux/actions/order'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function TrackOrder() {
    const { orders, isLoading } = useSelector((state) => state.order)
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const { id } = useParams()

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id))
    }, [dispatch])

    const data = orders && orders.find((item) => item._id === id)

    return (
        <div className='w-full flex h-[80vh] justify-center items-center'>
            {
                data && data?.status === "Processing" ? (

                    <h1 className=' text-[20px]'>Your Order is Processing</h1>
                ) : (
                    data?.status === "Shipping" ?

                        (
                            <h1 className=' text-[20px]'>Your Order has been shipped</h1>
                        ) :
                        (
                            data?.status === "On the way" ?
                                (
                                    <h1 className=' text-[20px]'>Your Order is On th way </h1>
                                ) :
                                (
                                    data?.status === "Received" ?
                                        (
                                            <h1 className=' text-[20px]'>Your Order is Out For Delivery </h1>

                                        )
                                        : (

                                            data?.status === "Delivered" ?
                                                (
                                                    <h1 className=' text-[20px]'>Your Order is Delivered</h1>

                                                )
                                                :
                                                (
                                                    data?.status === "Processing Refund" ?
                                                        (
                                                            <h1 className=' text-[20px]'>Your Refund is Processing</h1>

                                                        )
                                                        : (
                                                            data?.status === "refund Success" ?
                                                                (
                                                                    <h1 className=' text-[20px]'>Your refund has been deposited in your Payment </h1>
                                                                )
                                                                : (
                                                                    null
                                                                )
                                                        )

                                                )

                                        )

                                )

                        )
                )


            }
        </div>
    )
}

export default TrackOrder
