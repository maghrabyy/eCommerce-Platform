import { createContext, useState } from "react";
import { productsList } from "../data/productsData";
import { useActivityContext } from "./ActivityContext";

const ProductsContext = createContext();

export const ProductsProvider = ({children}) =>{
    const {addNewActivity} = useActivityContext();
    const [ productsData, setProductsData ] = useState([...productsList]);

    const addNewProduct = ()=>{

    }
    const modifyProduct = (prodId,modifiedData)=>{
        const prodsArray = [...productsData];
        const prodIndex = prodsArray.map(prod=>prod.prodId).indexOf(prodId);
        prodsArray[prodIndex] = {...prodsArray[prodIndex],...modifiedData};
        const prodName = `${prodsArray[prodIndex].prodBrand.text} ${prodsArray[prodIndex].prodCat.text}`
        setProductsData(prodsArray);
        addNewActivity('modifyProduct',`Modified ${prodName} [${prodId}]'s info.`);
    }
    const deleteProduct = (prodId,prodName)=>{
        const prodsArray = [...productsData];
        setProductsData(prodsArray.filter(prod=>prod.prodId !== prodId));
        addNewActivity('deleteProduct',`Deleted product ${prodName} [${prodId}].`);
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