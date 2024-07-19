import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import styles from '../Styles/styles';
import { IoBagHandleOutline } from 'react-icons/io5';
import { BsCartPlus } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '@/redux/actions/wishlist';
import { backend_url } from '@/server';
import { addToCart } from '@/redux/actions/cart';


function Wishlist({ setOpenWishlist }) {

  const { wishlist } = useSelector((state) => state.wishlist)
  const dispatch = useDispatch()

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data))

  }
  const addToCartHandler = (data) =>{
    const newData =  {...data ,qty:1}

    dispatch(addToCart(newData))
    setOpenWishlist(false)
  }



  return (
    <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">

        {
          wishlist && wishlist.length === 0 ?
            <div>
              <div className='w-full h-screen flex justify-center items-center'>
              <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1 size={25} className="cursor-pointer" onClick={() => { setOpenWishlist(false) }} />


              </div>
              <h5>Your Wishlist Is Empty ! </h5>

            </div>


            </div>
            :
            <div >
              <div className='flex w-full justify-end pt-5 pr-5'>
                <RxCross1 size={25} className="cursor-pointer" onClick={() => { setOpenWishlist(false) }} />

              </div>

              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className='pl-2 text-[20px] font-[500]'>{wishlist && wishlist.length} Items</h5>
              </div>

              <div className='w-full border-t'>
                {
                  wishlist && wishlist.map((i, index) => {
                    return (

                      <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />
                    )

                  })
                }

              </div>

            </div>

        }

      </div>
    </div>
  )
}

const CartSingle = ({ data ,removeFromWishlistHandler ,addToCartHandler}) => {

  


  return (
    <div className='border-b p-4'>

      <div className='w-full flex  items-center'>
        <RxCross1 className='cursor-pointer' onClick={()=>removeFromWishlistHandler(data)}/>
        <img src={`${backend_url}${data?.images[0]}`} alt="" className='w-[130px]  h-[140px] ml-2 self-center object-contain' />


        <div className="w-[70%] pl-[5px] pr-[5px]0 font-Poppins">
          <h1 className='text-[15px]' >{data.name}</h1>
          <p className={`text-[#727386]  text-[12px] font-Poppins`}>{data.skuid}</p>
          <div className="flex ">
            <h5 className={`${styles.productDiscountPrice} text-[15px]`}>
              ₹
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice}
            </h5>
            <h4 className={`${styles.price} line-through text-[15px]`}>
              {data.originalPrice ? " ₹" + data.originalPrice : null}
            </h4>
          </div>


        </div>

        <div className='' onClick={()=> addToCartHandler(data)}>
          <BsCartPlus size={20} className="cursor-pointer" />
        </div>


      </div>
    </div>
  )

}

export default Wishlist
