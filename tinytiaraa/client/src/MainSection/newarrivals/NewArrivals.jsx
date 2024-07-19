import React, { useEffect, useState } from 'react'
import { productData } from '../../static/data'
import styles from '../../Styles/styles'
import ProductCard from '../Productcard/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductShop } from '@/redux/actions/product'
import { useParams } from 'react-router-dom'

function NewArrivals() {

  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products)
  const [data, setData] = useState([]);

  useEffect(() => {
    // Assuming products is an array in Redux state
    if (products && products.length > 0) {
      const firstTen = products.slice(0, 10); // Get the first ten products
      setData(firstTen); // Set data state with the first ten products
    }
  }, [products]);
  return (
    <div className='bg-[#f5f4f4] py-5'>
      <div className={`${styles.section} `}>
        <div className={`${styles.heading}`}>
          <h1>New Arrivals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {
            data && data.length !== 0 && (
              <>
                {
                  data && data.map((i, index) => <ProductCard data={i} key={index} />)

                }
              </>
            )
          }
        </div>
      </div>
      <div className="text-center">
        <h4 className='text-[17px] font-[600] font-Poppins cursor-pointer'>View More</h4>
      </div>

    </div>
  )
}

export default NewArrivals
