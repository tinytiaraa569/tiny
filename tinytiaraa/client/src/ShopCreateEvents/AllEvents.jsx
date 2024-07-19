import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProductShop } from '../redux/actions/product'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { DataGrid } from '@mui/x-data-grid'
import { deleteEvent, getAllEventsShop } from '@/redux/actions/event'

function AllEvents() {
    const dispatch = useDispatch()
    const { events, isLoading } = useSelector((state) => state.events)
    const { seller } = useSelector((state) => state.seller)



    const handleDelete = (id) =>{
        // console.log(id)
        dispatch(deleteEvent(id))
        window.location.reload()
    }


    useEffect(() => {
        dispatch(getAllEventsShop(seller._id));
    }, [dispatch, seller._id]);

    // console.log(products)

    const columns = [
        { field: 'id', headerName: 'Product Id', minWidth: 150, flex: 0.7 },
        { field: 'skuid', headerName: 'Sku Id', minWidth: 150, flex: 0.7 },

        { field: 'name', headerName: 'Name', minWidth: 180, flex: 1.4 },
        { field: 'sold', headerName: 'Sold out', type: 'number', minWidth: 130, flex: 0.6 },
        { field: 'price', headerName: 'Price', minWidth: 100, flex: 0.6 },
        { field: 'Stock', headerName: 'Stock', type: 'number', minWidth: 80, flex: 0.5 },
        
        {
            field: 'Preview',
            headerName: 'Preview',
            flex: 0.8,
            minWidth: 100,
            sortable: false,
            renderCell: (params) => (
                <Link to={`/product/${params.id}`}>
                    <button>
                        <AiOutlineEye size={20} />
                    </button>
                </Link>
            ),
        },
        {
            field: 'Delete',
            headerName: 'Delete',
            flex: 0.8,
            minWidth: 120,
            sortable: false,
            renderCell: (params) => (
                <button onClick={()=>handleDelete(params.id)}>
                    <AiOutlineDelete size={20} />
                </button>
            ),
        },
    ];

    const rows = events?.map((item) => ({
        id: item._id,
        skuid:item.skuid,
        name: item.name,
        price: `₹ ${item.discountPrice}`,
        Stock: item.stock,
        sold: 10, // Replace with actual sold count if available
        
    }));



    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full mx-8 pt-1 mt-10 bg-white">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                </div>
            )}
        </>
    )
}

export default AllEvents
