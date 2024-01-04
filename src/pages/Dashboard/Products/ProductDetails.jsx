import { ExpandedProductItem } from "../../../components/dashboard/Products/ProductsPageComps/ExpandedProductItem"
import { useOutlet } from "react-router-dom"
import { useParams } from "react-router-dom";

export const ProductDetails = ({catTitle,brandTitle})=>{
    const { prod } = useParams();
    const outlet = useOutlet();
    return <div>
        {outlet || <ExpandedProductItem catTitle={catTitle} brandTitle={brandTitle} prodId={prod} lightBg/>}
    </div>
    
        
}