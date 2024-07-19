import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProductShop } from '../redux/actions/product'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { DataGrid } from '@mui/x-data-grid'
import { deleteEvent, getAllEventsShop } from '@/redux/actions/event'
import styles from '@/Styles/styles'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios'
import { server } from '@/server'
import { toast } from 'react-toastify'


function AllCoupoun() {

    const { seller } = useSelector((state) => state.seller)
    const { products } = useSelector((state) => state.products)

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [coupons, setCoupons] = useState([])


    const [name, setName] = useState("")
    const [value, setValue] = useState(null)
    const [percentageDiscount, setPercentageDiscount] = useState(null);
    const [minAmount, setMinAmount] = useState(null)
    const [maxAmount, setMaxAmount] = useState(null)
    const [selectedProducts, setSelectedProducts] = useState(null)





    useEffect(() => {
        setIsLoading(true)
        axios.get(`${server}/coupon/get-coupon/${seller._id}`, {
            withCredentials: true
        }).then((res) => {
            console.log(res)
            setIsLoading(false)
            setCoupons(res.data.couponCodes);
        }).catch((error) => {
            setIsLoading(false)

        })
    }, [dispatch]);








    const handleDelete = async (id) => {
        axios.delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true }).then((res) => {
            toast.success("Coupon code deleted succesfully!")
        })
        window.location.reload();
    };


    useEffect(() => {
        dispatch(getAllProductShop(seller._id));
    }, [dispatch, seller._id]);

    // console.log(products)

    const columns = [
        { field: 'id', headerName: 'Coupon Id', minWidth: 150, flex: 0.7 },

        { field: 'name', headerName: 'Name', minWidth: 180, flex: 1.4 },
        { field: 'price', headerName: 'Price Off', minWidth: 100, flex: 0.6 },


        {
            field: 'Delete',
            headerName: 'Delete',
            flex: 0.8,
            minWidth: 120,
            sortable: false,
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.id)}>
                    <AiOutlineDelete size={20} />
                </button>
            ),
        },
    ];

    const rows = coupons && coupons.map((item) => ({
        id: item._id,
        name: item.name,
        price: item.value !== null && item.value !== undefined ? `Rs ${item.value}` : `${item.percentageDiscount}%`


    }));


    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`${server}/coupon/create-coupon-code`, {
            name,
            minAmount,
            maxAmount,
            selectedProducts,
            value,
            percentageDiscount,
            shop: seller,
        }, { withCredentials: true }).then((res) => {
            toast.success("CouponCode Created Successfully!")
            setOpen(false)
            window.location.reload();
        }).catch((error) => {
            toast.error(error.response.data.message)


        })
    }


    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full mx-8 pt-1 mt-10 bg-white">

                    <div className="w-full flex justify-end mb-3">
                        <div className={`${styles.button} !w-max !h-[40px] px-3 !rounded-[5px] mr-3`} onClick={() => setOpen(true)}>
                            <span className='text-white'>Create Coupoun Code</span>

                        </div>
                    </div>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />

                    {
                        open && (
                            <div className="fixed top-0 left-0 w-full h-screen bg-[#0000006c] z-[1000] flex justify-center items-center">

                                <div className="w-[50%] h-[80vh] bg-white rounded-md shadow ">
                                    <div className="w-full p-4 flex justify-end">
                                        <RxCross2 size={30} className='cursor-pointer' onClick={() => setOpen(false)} />

                                    </div>

                                    <h5 className='text-[30px] font-Poppins text-center'>Create Coupon Code</h5>


                                    {/* create coupon code  */}


                                    <form action="" onSubmit={handleSubmit} className='px-8'>


                                        <div className='font-Poppins mt-4'>
                                            <label htmlFor="" className='pb-2'>Name <span className='text-red-500'>*</span></label>
                                            <input
                                                type="text"
                                                name='name'
                                                placeholder='Enter Your Coupon Code Name'
                                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                                value={name}
                                                onChange={(e) => { setName(e.target.value) }} />
                                        </div>

                                        <div className='font-Poppins mt-4'>
                                            <label htmlFor="" className='pb-2'>Discount Value <span className='text-red-500'>*</span></label>
                                            <input
                                                type="number"
                                                name='value'
                                                placeholder='Enter Discount Value'
                                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                            />
                                        </div>
                                        <div className='font-Poppins mt-4'>
                                            <label htmlFor="" className='pb-2'>Percentage Discount <span className='text-red-500'>*</span></label>
                                            <input
                                                type="number"
                                                name='percentageDiscount'
                                                placeholder='Enter Percentage Discount'
                                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                                value={percentageDiscount}
                                                onChange={(e) => setPercentageDiscount(e.target.value)}
                                            />
                                        </div>

                                        <div className='font-Poppins mt-4'>
                                            <label htmlFor="" className='pb-2'>Min Amount Order <span className='text-red-500'>(optional)</span></label>
                                            <input
                                                type="number"
                                                name='name'
                                                placeholder='Enter Your Coupon Code Min amount'
                                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                                value={minAmount}
                                                onChange={(e) => { setMinAmount(e.target.value) }} />
                                        </div>

                                        <div className='font-Poppins mt-4'>
                                            <label htmlFor="" className='pb-2'>Min Amount Order <span className='text-red-500'>(optional)</span></label>
                                            <input
                                                type="number"
                                                name='name'
                                                placeholder='Enter Your Coupon Code Max amount'
                                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                                value={maxAmount}
                                                onChange={(e) => { setMaxAmount(e.target.value) }} />
                                        </div>


                                        <div className='font-Poppins mt-4'>
                                            <label htmlFor='slcategory' className='pb-2'>selected Product <span className='text-red-500'>(optional)</span></label>
                                            <select
                                                id='slcategory'
                                                className='w-full mt-1 border h-[35px] rounded-[5px]'
                                                value={selectedProducts}
                                                onChange={(e) => setSelectedProducts(e.target.value)}
                                            >
                                                <option value=''>Choose a Selected product</option>
                                                {products && products.map((cat) => (
                                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>


                                        <div className='font-Poppins mt-7'>
                                            <input
                                                type="submit"
                                                name='name'
                                                placeholder='Enter Your Coupon Code Min amount'
                                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                                value="Create"
                                            />
                                        </div>


                                    </form>


                                </div>

                            </div>
                        )
                    }
                </div>
            )}
        </>
    )
}

export default AllCoupoun

