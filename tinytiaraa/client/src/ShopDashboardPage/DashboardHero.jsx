import styles from '@/Styles/styles'
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { LuListOrdered } from "react-icons/lu";
import { AiFillProduct } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfShop } from '@/redux/actions/order';
import { getAllProductShop } from '@/redux/actions/product';
import { DataGrid } from '@mui/x-data-grid'


function DashboardHero() {
    const dispatch = useDispatch()
    const { orders } = useSelector((state) => state.order)
    const { seller } = useSelector((state) => state.seller)

    const { products } = useSelector((state) => state.products)
    const [deliveredOrder, setDeliveredOrder] = useState(null)
    const [totalEarning, setTotalEarning] = useState(0)

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id))
        dispatch(getAllProductShop(seller._id))

        const orderData = orders && orders.filter((item) => item.status === "Delivered")
        setDeliveredOrder(orderData)

    }, [dispatch])

    useEffect(() => {
        if (orders) {
            const orderData = orders.filter((item) => item.status === "Delivered")
            setDeliveredOrder(orderData)
        }
    }, [orders])

    useEffect(() => {
        if (deliveredOrder) {
            const total = deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0)
            setTotalEarning(total)
        }
    }, [deliveredOrder])

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.value === "Delivered" ? "greenColor" : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: "action",
            flex: 1,
            minWidth: 150,
            headerName: "",
            sortable: false,
            renderCell: (params) => (
                <Link to={`/order/${params.id}`}>
                    <div className='flex justify-end items-center'>
                        <span className='font-Poppins mr-2'>Order Details</span>
                        <AiOutlineArrowRight size={20} />
                    </div>
                </Link>
            ),
        },
    ];
    const row = [];

    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.cart.length,
            total: "Inr ₹" + item.totalPrice,
            status: item.status
        })

    })



    return (
        <div className='w-full p-8 '>
            <h3 className='text-[22px] pb-2'>Overview</h3>

            <div className="w-full flex justify-between items-center">
                <div className="mb-4 w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-7">
                    <div className="flex items-center">
                        <AiOutlineMoneyCollect size={30} className='mr-2' fill='#00000085' />

                        <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-[#00000085]`}>
                            Total Earning
                        </h3>

                    </div>
                    <h5 className='pt-2 pl-[36px] text-[22px] font-[500]'>
                        ₹ {totalEarning}
                    </h5>
                    <Link to="">
                        <h5 className='pt-4 pl-2 text-[#077f9c]'>View Transactions</h5>
                    </Link>

                </div>

                <div className="mb-4 w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-7">
                    <div className="flex items-center">
                        <LuListOrdered size={30} className='mr-2' fill='#00000085' />

                        <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-[#00000085]`}>
                            All orders
                        </h3>

                    </div>
                    <h5 className='pt-2 pl-[36px] text-[22px] font-[500]'>
                        {orders && orders.length}
                    </h5>
                    <Link to="/dashboard-orders">
                        <h5 className='pt-4 pl-2 text-[#077f9c]'>View Orders</h5>
                    </Link>

                </div>

                <div className="mb-4 w-[30%] min-h-[20vh] bg-whSite shadow rounded px-2 py-7">
                    <div className="flex items-center">
                        <AiFillProduct size={30} className='mr-2' fill='#00000085' />

                        <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-[#00000085]`}>
                            All Products
                        </h3>

                    </div>
                    <h5 className='pt-2 pl-[36px] text-[22px] font-[500]'>
                        {products && products.length}
                    </h5>
                    <Link to="/dashboard-products">
                        <h5 className='pt-4 pl-2 text-[#077f9c]'>View Products</h5>
                    </Link>

                </div>

            </div>

            <h3 className='text-[22px] pb-2'>Latest Orders</h3>
            <div className='w-full min-h-[45vh] bg-white shadow rounded'>
                <DataGrid
                    rows={row}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    autoHeight
                />

            </div>

        </div>
    )
}

export default DashboardHero
