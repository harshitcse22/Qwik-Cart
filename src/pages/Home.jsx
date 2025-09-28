import React, { useEffect } from 'react'
import Carousel from '../components/Carousel'
import { getData } from '../context/DataContext'
import MidBanner from '../components/MidBanner'
import Features from '../components/Features'
import Category from '../components/Category'

const Home = () => {
  const { fetchAllProducts } = getData()
  
  useEffect(() => {
    fetchAllProducts()
  }, [])
  
  return (
    <div className='overflow-x-hidden'>
      <Carousel/>
      <Category/>
      <MidBanner/>
      <Features/>
    </div>
  )
}

export default Home
