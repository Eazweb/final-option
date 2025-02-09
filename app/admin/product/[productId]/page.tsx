import getProductById from '@/actions/get-product-by-id'
import React from 'react'

const page = async({ params }: { params: { productId: string } }) => {
  const {productId} = params
  const product = await getProductById({productId})
  console.log(product)
  return (
    <div>
      
    </div>
  )
}

export default page
