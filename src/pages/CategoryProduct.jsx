import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from "../assets/Loading4.webm"
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../components/ProductListView'
import { getData } from '../context/DataContext'

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([])
  const params = useParams()
  const category = params.category
  const navigate = useNavigate()
  const { data } = getData()

  const getFilterData = async ()=>{
    try {
      // Filter from existing data first (includes our electronics data)
      const localFilteredData = data.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
      
      if (localFilteredData.length > 0) {
        setSearchData(localFilteredData)
      } else {
        // Fallback to API call for other categories
        const res = await axios.get(`https://fakestoreapi.com/products/category/${category}`)
        const productsData = res.data.map(product => ({
          ...product,
          brand: product.title.split(' ')[0],
          images: [product.image],
        }));
        setSearchData(productsData)
      }
    } catch (error) {
      console.error('Category API Error:', error);
      setSearchData([])
    }
  }

  useEffect(()=>{
    if (data.length > 0) {
      getFilterData()
    }
    window.scrollTo(0,0)
  },[data, category])
  
  return (
    <div>
      {
        searchData.length > 0 ? (
          <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
             <button onClick={()=>navigate('/')} className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft/> Back</button>
             {
              searchData.map((product, index) =>{
                return <ProductListView key={index} product={product}/>
              })
             }
          </div>
        ):(
          <div className='flex items-center justify-center h-[400px]'>
             <video muted autoPlay loop>
              <source src={Loading} type='video/webm'/>
             </video>
          </div>
        )
      }
    </div>
  )
}

export default CategoryProduct
