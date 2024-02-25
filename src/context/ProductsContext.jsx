import { createContext, useState } from "react";
import { productsList } from "../data/productsData";

const ProductsContext = createContext();

export const ProductsProvider = ({children}) =>{
    const [ productsData, setProductsData ] = useState([...productsList]);

    const addNewProduct = ()=>{

    }
    const modifyProduct = ()=>{

    }
    const deleteProduct = ()=>{

    }

    const valurToShare = {
        productsData,
        setProductsData,
        addNewProduct,
        modifyProduct,
        deleteProduct
    }
    return <ProductsContext.Provider value={valurToShare}>
        {children}
    </ProductsContext.Provider> 
}

export default ProductsContext;