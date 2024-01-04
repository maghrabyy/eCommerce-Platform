import { createContext, useState} from "react";
import {productsArray} from '../components/dashboard/Products/ProductsPageComps/productsData'
const ProductsContext = createContext({});

export const ProductsProvider = ({children})=>{
    const [productsList,setProductsList] = useState([...productsArray]);
    const dataToShare ={
        productsList,
        setProductsList,
    }
    return(
        <ProductsContext.Provider value={dataToShare}>
            {children}
        </ProductsContext.Provider>
     );
}

export default ProductsContext;