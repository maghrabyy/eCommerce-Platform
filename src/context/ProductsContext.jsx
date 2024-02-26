import { createContext, useState } from "react";
import { productsList } from "../data/productsData";

const ProductsContext = createContext();

export const ProductsProvider = ({children}) =>{
    const [ productsData, setProductsData ] = useState([...productsList]);

    const addNewProduct = ()=>{

    }
    const modifyProduct = (prodId,modifiedData)=>{
        const prodsArray = [...productsData];
        const prodIndex = prodsArray.map(prod=>prod.prodId).indexOf(prodId);
        prodsArray[prodIndex] = {...prodsArray[prodIndex],...modifiedData};
        setProductsData(prodsArray);
        console.log(prodsArray);
    }
    const deleteProduct = (prodId)=>{
        const prodsArray = [...productsData];
        setProductsData(prodsArray.filter(prod=>prod.prodId !== prodId));
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