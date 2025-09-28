import React from 'react'
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({product}) => {
    const navigate = useNavigate()
    const {addToCart, cartItem} = useCart()

       console.log(cartItem)
    
  return (
    <div className='border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max'>
      <img src={product.image} alt="" className='bg-gray-100 aspect-square' onClick={()=>navigate(`/products/${product.id}`)}/>
      <h1 className='line-clamp-2 p-1 font-semibold text-gray-800'>{product.title}</h1>
      <div className='px-1 mb-2'>
        <p className='text-sm text-gray-600'>Brand: {product.brand}</p>
        {product.category && <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'>{product.category}</span>}
      </div>
      <p className='my-1 text-lg text-blue-600 font-bold px-1'>${product.price}</p>
      <button onClick={()=>addToCart(product)} className='bg-red-500 hover:bg-red-600 px-3 py-2 text-sm rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold transition-all'><IoCartOutline className='w-5 h-5' /> Add to Cart</button>
    </div>
  )
}

export default ProductCard
