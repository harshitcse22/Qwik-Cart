import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Electronics-focused sample data
    const electronicsData = [
        {
            id: 101,
            title: "Apple iPhone 15 Pro Max 256GB",
            price: 1199,
            category: "smartphones",
            brand: "Apple",
            image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
            images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400"],
            description: "Latest iPhone with A17 Pro chip and titanium design"
        },
        {
            id: 102,
            title: "Samsung Galaxy S24 Ultra 512GB",
            price: 1299,
            category: "smartphones",
            brand: "Samsung",
            image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
            images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400"],
            description: "Premium Android phone with S Pen and AI features"
        },
        {
            id: 103,
            title: "MacBook Pro 16-inch M3 Max",
            price: 2499,
            category: "laptops",
            brand: "Apple",
            image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
            images: ["https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400"],
            description: "Professional laptop with M3 Max chip for creators"
        },
        {
            id: 104,
            title: "Sony WH-1000XM5 Wireless Headphones",
            price: 399,
            category: "audio",
            brand: "Sony",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
            images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"],
            description: "Premium noise-canceling wireless headphones"
        }
    ];

    // Unified API endpoint for consistency
    const fetchAllProducts = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await axios.get('https://fakestoreapi.com/products')
            const apiProducts = res.data.map(product => ({
                ...product,
                brand: product.title.split(' ')[0],
                images: [product.image],
            }));
            // Combine API products with electronics data
            const allProducts = [...electronicsData, ...apiProducts];
            setData(allProducts)
        } catch (error) {
            console.error('API Error:', error);
            // Fallback to electronics data only if API fails
            setData(electronicsData)
            setError('Using sample electronics data')
        } finally {
            setLoading(false)
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
    return <DataContext.Provider value={{ data, setData, fetchAllProducts, categoryOnlyData, brandOnlyData, loading, error }}>
        {children}
    </DataContext.Provider>
}

export const getData = ()=> useContext(DataContext)
