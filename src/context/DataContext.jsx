import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState()
    const [categories, setCategories] = useState([])
    const ELECTRONICS_CATEGORY_ID = 22; // Usually electronics is category ID 2 in this API

    // fetching electronics category products from api
    const fetchAllProducts = async () => {
        try {
            const res = await axios.get(`https://api.escuelajs.co/api/v1/categories/${ELECTRONICS_CATEGORY_ID}/products`)
            console.log(res);
            // Transform the data to match the existing structure
            const productsData = res.data.map(product => ({
                ...product,
                category: product.category.name,
                image: product.images[0], // Using first image as main image
                images: product.images, // Keep all images array
                brand: product.title.split(' ')[0], // Using first word of title as brand for compatibility
            }));
            setData(productsData)
        } catch (error) {
            console.log(error);
        }
    }

    const getUniqueCategory = (data, property) => {
        if (!data) return ["All"];
        let newVal = data.map((curElem) => {
            return curElem[property]
        })
        newVal = ["All", ...new Set(newVal)]
        return newVal
    }

    const categoryOnlyData = getUniqueCategory(data, "category")
    const brandOnlyData = getUniqueCategory(data, "brand")
    return <DataContext.Provider value={{ data, setData,fetchAllProducts, categoryOnlyData, brandOnlyData }}>
        {children}
    </DataContext.Provider>
}

export const getData = ()=> useContext(DataContext)
