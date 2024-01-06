import { ExpandedProductItem } from "../../../components/dashboard/Products/ProductsPageComps/ExpandedProductItem"
import { useOutlet, useParams, Outlet } from "react-router-dom"


export const ProductDetails = ({category,brand})=>{
    const { prod } = useParams();
    const outlet = useOutlet();
    return <div>
        {outlet? <Outlet context={{prod}}/>
         : 
         <ExpandedProductItem 
            category={category} 
            brand={brand} 
            prodId={prod} lightBg/>}
    </div>
    
        
}