import React, { useEffect } from 'react'
import { getData } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'

const Category = () => {
    // const {categoryOnlyData} = getData()
    const navigate = useNavigate()
    const {data} = getData()

    const getUniqueCategory = (data, property) =>{
      let newVal = data?.map((curElem) =>{
          return curElem[property]
      })
      newVal = [...new Set(newVal)]
      return newVal
    }


  
    const categoryOnlyData = getUniqueCategory(data, "category")
  
  return (
    <div className='bg-[#101829]'>
       <div className='max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4'>
        {
            categoryOnlyData?.length > 0 ? categoryOnlyData.map((item, index)=>{
                return <div key={`${item}-${index}`}>
                    <button onClick={()=>navigate(`/category/${item}`)} className='uppercase bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 text-white px-4 py-2 rounded-md cursor-pointer transition-all font-semibold'>{item}</button>
                </div>
            }) : (
                <div className='text-white'>Loading categories...</div>
            )
        }
       </div>
    </div>
  )
}

export default Category
