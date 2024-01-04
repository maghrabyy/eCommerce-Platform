import { createContext} from "react";
import {productsArray} from '../components/dashboard/Products/ProductsPageComps/productsData'
const ProductsContext = createContext({});

export const ProductsProvider = ({children})=>{
    const productsList = [...productsArray]
    return(
        <ProductsContext.Provider value={{productsList}}>
            {children}
        </ProductsContext.Provider>
     );
}

export default ProductsContext;