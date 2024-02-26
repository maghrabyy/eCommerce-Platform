import { useOutletContext } from "react-router-dom";
import { AddProductForum } from "../../../components/dashboard/Add Items/Add Products/AddProductForm";
import { ProductNotFound } from "../../../components/dashboard/Products/ProductsPageComps/ProductNotFoundError";
import { useContext } from "react";
import ProductsContext from "../../../context/ProductsContext";

export const ProductEditPage = ()=>{
    const { prod } = useOutletContext();
    const { productsData } = useContext(ProductsContext);
    const prodIndex = productsData.map(prod=>prod.prodId).indexOf(prod);
    const prodData = productsData[prodIndex];
    return prodData ?
         <div className='expanded-product-edit'>
             <AddProductForum
                prodId={prod}
                prodTitleState={prodData.prodTitle}
                prodDescState={prodData.prodDesc}
                prodPriceState={prodData.prodPrice}
                prodCostState={prodData.prodCost}
                prodCatState={prodData.prodCat}
                prodBrandState={prodData.prodBrand}
                prodColorSizeQListState={[...prodData.prodColorQtyList]}
                isEditing/>
        </div>
        :
        <ProductNotFound/>
}