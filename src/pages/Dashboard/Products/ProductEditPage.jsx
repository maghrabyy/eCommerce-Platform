import { useOutletContext } from "react-router-dom";
import { AddProductForum } from "../../../components/dashboard/Add Items/Add Products/AddProductForm";
import { ProductNotFound } from "../../../components/dashboard/Products/ProductsPageComps/ProductNotFoundError";
import { productsArray } from "../../../data/productsData";

export const ProductEditPage = ()=>{
    const { prod } = useOutletContext();
    const prodIndex = productsArray.map(prod=>prod.prodId).indexOf(prod);
    const prodData = productsArray[prodIndex];
    return prodData ?
         <div className='expanded-product-edit'>
             <AddProductForum
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