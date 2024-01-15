import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { AddProductForum } from "../../../components/dashboard/Add Items/Add Products/AddProductForm";
import { ProductNotFound } from "../../../components/dashboard/Products/ProductsPageComps/ProductNotFoundError";
import { productsArray } from "../../../data/productsData";

export const ProductEditPage = ()=>{
    const [productItemData,setProductItemData] = useState(null);
    const { prod } = useOutletContext();
    useEffect(()=>{
        const prodIndex = productsArray.map(prod=>prod.prodId).indexOf(prod);
        setProductItemData( productsArray[prodIndex]);
    },[prod]);
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