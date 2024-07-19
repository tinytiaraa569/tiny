import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { productData } from '../static/data'
import ProductCard from '../MainSection/Productcard/ProductCard'
import styles from '../Styles/styles'
import { useSelector } from 'react-redux'


function ProductsPage() {
    const [searchParams] = useSearchParams()
    const [data, setData] = useState([])
    const { products } = useSelector((state) => state.products)


    const categoryData = searchParams.get("category")

    useEffect(() => {
        if (categoryData === null) {
            const d = products && products.sort((a, b) => a.sold_out - b.sold_out)
            setData(d)
        } else {
            const d = products && products.filter((i) => i.category === categoryData)
            setData(d)
        }
        window.scrollTo(0, 0)

    },[categoryData,products])
      // Update data when products change
      useEffect(() => {
        if (categoryData === null) {
            const d = products && products.sort((a, b) => a.sold_out - b.sold_out);
            setData(d);
        } else {
            const d = products && products.filter((i) => i.category === categoryData);
            setData(d);
        }
    }, [products, categoryData]);


    return (
        <div>
            <div className={`${styles.section}`}>

                


                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    {
                    data && data.map((i, index) => <ProductCard data={i} key={index} />)
                    
                    }
                    
                </div>
                {
                        data && data.length === 0 ? 
                        <h1 className='text-center w-full pb-[100px] text-[20px]'>No product found</h1>
                        :
                        null
                    }
            </div>
        </div>
    )
}

export default ProductsPage
