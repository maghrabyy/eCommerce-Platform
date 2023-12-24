import { createContext, useState} from "react";
import {productsArray} from '../components/dashboard/Products/ProductsPageComps/productsData'

const ProductsContext = createContext({});

export const ProductsProvider = ({children})=>{
    const [productsList,setProductsList] = useState([...productsArray]);
    const [showExpandedItem,setShowExpandedItem] = useState(false);
    const [expandedItemData,setExpandedItemData] = useState({
       prodCat:'',
       prodBrand:'',
       prodTitle:'',
       prodDesc:'',
       prodPrice:0,
       prodCost:0,
       prodColorQtyList:[],
       totalProdQty:0,
       totalProdCost:0
    });
    const onProdItemClickHandler = id =>{
        const prodIndex = productsList.map(prod=>prod.prodId).indexOf(id);
        setExpandedItemData(productsList[prodIndex]);
        setShowExpandedItem(true);
    }
    const dataToShare ={
        productsList,
        setProductsList,
        onProductSelect: onProdItemClickHandler,
        showExpandedItem,
        setShowExpandedItem,
        expandedItemData,
        setExpandedItemData
    }
    return(
        <ProductsContext.Provider value={dataToShare}>
            {children}
        </ProductsContext.Provider>
     );
}

export default ProductsContext;