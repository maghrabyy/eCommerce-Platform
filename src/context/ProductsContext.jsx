import { createContext, useState} from "react";
import {productsArray} from '../components/dashboard/Products/ProductsPageComps/productsData'
import { useNavigate } from "react-router-dom";
const ProductsContext = createContext({});

export const ProductsProvider = ({children})=>{
    const navigate = useNavigate();
    const [productsList,setProductsList] = useState([...productsArray]);
    const onProdItemClickHandler = id =>{
        navigate(id);
    }
    const dataToShare ={
        productsList,
        setProductsList,
        onProductSelect: onProdItemClickHandler,

    }
    return(
        <ProductsContext.Provider value={dataToShare}>
            {children}
        </ProductsContext.Provider>
     );
}

export default ProductsContext;