import { ExpandedProductItem } from "../../../components/dashboard/Products/ProductsPageComps/ExpandedProductItem"
import { useOutlet, useParams, Outlet } from "react-router-dom"


export const ProductDetails = ({catTitle,brandTitle})=>{
    const { prod } = useParams();
    const outlet = useOutlet();
    return <div>
        {outlet? <Outlet context={{prod}}/>
         : 
         <ExpandedProductItem 
            catTitle={catTitle} 
            brandTitle={brandTitle} 
            prodId={prod} lightBg/>}
    </div>
    
        
}