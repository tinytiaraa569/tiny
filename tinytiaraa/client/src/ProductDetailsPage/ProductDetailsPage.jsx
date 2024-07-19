import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productData } from '../static/data'
import ProductDetails from './ProductDetails'
import SuggestedProduct from '../SuggestedProduct/SuggestedProduct'
import { useSelector } from 'react-redux'

function ProductDetailsPage() {
    const { products } = useSelector((state) => state.products)

    const { name } = useParams()
    const [data, setData] = useState(null)
    const productName = name.replace(/-/g, " ")
    useEffect(() => {
        if (products && products.length > 0) {
            const product = products.find((product) => product.name === productName);
            if (product) {
                setData(product);
            } else {
                console.log(`Product with name '${productName}' not found`);
            }
        } else {
            console.log('Products array is not available yet');
        }
    }, [productName, products]);
    return (
        <div>
            {data && <ProductDetails data={data} />}
            {data && <SuggestedProduct data={data} />}
        </div>
    )
}

export default ProductDetailsPage
