import React, { useEffect, useState } from 'react'
import { productData } from '../static/data'
import styles from '../Styles/styles'
import ProductCard from '../MainSection/Productcard/ProductCard'
import { useSelector } from 'react-redux'

function SuggestedProduct({ data }) {

  const { products} = useSelector((state) => state.products)
  const [productData,setproductData] = useState([])


    useEffect(() => {
        const d = products && products.filter((i) => {
            return i.category === data.category

        })
        setproductData(d)

    }, [])
    return (
        <div className='bg-[#f5f4f4]'>
            {
                data ?
                    <div className={`p-4 ${styles.section}`}>
                        <h2 className={`${styles.heading} text-[22px] font-[500] border-b mb-5 font-Poppins`}>You may also like</h2>


                        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                            {
                                productData && productData.map((i, index) => (
                                    <ProductCard data={i} key={index} />
                                ))
                            }
                        </div>
                    </div>
                    :
                    null
            }

        </div>
    )
}

export default SuggestedProduct
