import React from 'react'
import { useCart } from '../context/CartContext'
import { FaRegTrashAlt, FaShieldAlt, FaTruck } from 'react-icons/fa';
import { LuNotebookText } from 'react-icons/lu';
import { MdDeliveryDining } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { BsLightning, BsHeadphones } from 'react-icons/bs';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import emptyCart from "../assets/empty-cart.png"

const Cart = ({location, getLocation}) => {
  const { cartItem , updateQuantity, deleteItem} = useCart()
  const {user} = useUser()
  const navigate = useNavigate()
  

  const totalPrice = cartItem.reduce((total, item) => total + item.price, 0)
  return (
    <div className='mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0'>
      {
        cartItem.length > 0 ? <div>
          <div className='flex items-center gap-3 mb-6'>
            <BsLightning className='text-blue-500 text-3xl'/>
            <h1 className='font-bold text-2xl'>TechCart - My Cart ({cartItem.length})</h1>
          </div>
          
          {/* Electronics Features Banner */}
          <div className='bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg mb-6'>
            <div className='flex flex-wrap items-center justify-around gap-4'>
              <div className='flex items-center gap-2'>
                <FaShieldAlt className='text-xl'/>
                <span className='text-sm'>2 Year Warranty</span>
              </div>
              <div className='flex items-center gap-2'>
                <FaTruck className='text-xl'/>
                <span className='text-sm'>Free Tech Support</span>
              </div>
              <div className='flex items-center gap-2'>
                <BsHeadphones className='text-xl'/>
                <span className='text-sm'>24/7 Customer Care</span>
              </div>
              <div className='flex items-center gap-2'>
                <BsLightning className='text-xl'/>
                <span className='text-sm'>Fast Delivery</span>
              </div>
            </div>
          </div>
          <div>
            <div className='mt-10'>
              {cartItem.map((item, index) => {
                return <div key={index} className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'>
                  <div className='flex items-center gap-4'>
                    <img src={item.image} alt={item.title} className='w-20 h-20 rounded-md object-cover' />
                    <div>
                      <h1 className='md:w-[300px] line-clamp-2 font-semibold'>{item.title}</h1>
                      <p className='text-sm text-gray-600 mb-1'>Brand: {item.brand}</p>
                      <p className='text-blue-600 font-bold text-lg'>${item.price}</p>
                      {item.category && <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'>{item.category}</span>}
                    </div>
                  </div>
                  <div className='bg-blue-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl'>
                    <button onClick={()=>updateQuantity(cartItem, item.id, "decrease")} className='cursor-pointer hover:bg-blue-600 px-2 rounded'>-</button>
                    <span className='px-2'>{item.quantity}</span>
                    <button onClick={()=>updateQuantity(cartItem, item.id, "increase")} className='cursor-pointer hover:bg-blue-600 px-2 rounded'>+</button>
                  </div>
                  <span onClick={()=>deleteItem(item.id)} className='hover:bg-red-100 transition-all rounded-full p-3 hover:shadow-lg'>
                    <FaRegTrashAlt className='text-red-500 text-xl cursor-pointer hover:text-red-600' />
                  </span>
                </div>
              })}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-20'>
              <div className='bg-gray-100 rounded-md p-7 mt-4 space-y-2'>
                <h1 className='text-gray-800 font-bold text-xl'>Delivery Info</h1>
                <div className='flex flex-col space-y-1'>
                  <label htmlFor="">Full Name</label>
                  <input type="text" placeholder='Enter your name' className='p-2 rounded-md' value={user?.fullName}/>
                </div>
                <div className='flex flex-col space-y-1'>
                  <label htmlFor="">Address</label>
                  <input type="text" placeholder='Enter your address' className='p-2 rounded-md' value={location?.county}/>
                </div>
                <div className='flex w-full gap-5'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">State</label>
                    <input type="text" placeholder='Enter your state' className='p-2 rounded-md w-full' value={location?.state}/>
                  </div>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">PostCode</label>
                    <input type="text" placeholder='Enter your postcode' className='p-2 rounded-md w-full' value={location?.postcode}/>
                  </div>
                </div>
                <div className='flex w-full gap-5'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">Country</label>
                    <input type="text" placeholder='Enter your country' className='p-2 rounded-md w-full' value={location?.country}/>
                  </div>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">Phone No</label>
                    <input type="text" placeholder='Enter your Number' className='p-2 rounded-md w-full' />
                  </div>
                </div>
                <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-3 cursor-pointer transition-colors'>Submit</button>
                <div className='flex items-center justify-center w-full text-gray-700'>
                  ---------OR-----------
                </div>
                <div className='flex justify-center'>
                  <button onClick={getLocation} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors'>Detect Location</button>
                </div>
              </div>
              <div className='bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max'>
                <h1 className='text-gray-800 font-bold text-xl'>Bill details</h1>
                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-1 items-center text-gray-700'><span><LuNotebookText /></span>Items total</h1>
                  <p>${totalPrice}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-1 items-center text-gray-700'><span><MdDeliveryDining /></span>Delivery Charge</h1>
                  <p className='text-red-500 font-semibold'><span className='text-gray-600 line-through'>$25</span> FREE</p>
                </div>
                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-1 items-center text-gray-700'><span><GiShoppingBag /></span>Handling Charge</h1>
                  <p className='text-red-500 font-semibold'>$5</p>
                </div>
                <hr  className='text-gray-200 mt-2'/>
                <div className='flex justify-between items-center'>
                  <h1 className='font-semibold text-lg'>Grand total</h1>
                  <p className='font-semibold text-lg'>${totalPrice + 5}</p>
                </div>
                <div>
                  <h1 className='font-semibold text-gray-700 mb-3 mt-7'>Apply Promo Code</h1>
                  <div className='flex gap-3'>
                    <input type="text" placeholder='Enter code' className='p-2 rounded-md w-full'/>
                    <button className='bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md'>Apply</button>
                  </div>
                </div>
                <button className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-md w-full cursor-pointer mt-3 font-semibold transition-all'>Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </div> : <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
          <div className='text-center'>
            <BsLightning className='text-blue-500 text-6xl mx-auto mb-4'/>
            <h1 className='text-blue-500/80 font-bold text-4xl mb-2'>Your TechCart is Empty!</h1>
            <p className='text-gray-600 mb-6'>Discover amazing electronics and gadgets</p>
          </div>
          <img src={emptyCart} alt="" className='w-[300px]'/>
          <button onClick={()=>navigate('/products')} className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-md cursor-pointer font-semibold transition-all'>Shop Electronics</button>
        </div>
      }
    </div>
  )
}

export default Cart
