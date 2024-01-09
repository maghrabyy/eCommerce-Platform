import { useState, useContext, useEffect } from "react";
import ProductsContext from "../../../context/ProductsContext";
import { useOutletContext } from "react-router-dom";
import { AddProductForum } from "../../../components/dashboard/Add Items/Add Products/AddProductForm";
import { ProductNotFound } from "../../../components/dashboard/Products/ProductsPageComps/ProductNotFoundError";

export const ProductEditPage = ()=>{
    const {productsList} = useContext(ProductsContext);
    const [productItemData,setProductItemData] = useState(null);
    const { prod } = useOutletContext();
    useEffect(()=>{
        const prodIndex = productsList.map(prod=>prod.prodId).indexOf(prod);
        setProductItemData( productsList[prodIndex]);
    },[prod,productsList]);
    return productItemData ?
         <div className='expanded-product-edit'>
             <AddProductForum
                prodTitleState={productItemData.prodTitle}
                prodDescState={productItemData.prodDesc}
                prodPriceState={productItemData.prodPrice}
                prodCostState={productItemData.prodCost}
                prodCatState={productItemData.prodCat}
                prodBrandState={productItemData.prodBrand}
                prodColorSizeQListState={[...productItemData.prodColorQtyList]}
                isEditing/>
        </div>
        :
        <ProductNotFound/>
}