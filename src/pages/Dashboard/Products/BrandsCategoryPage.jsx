import { Panel } from "../../../components/util/Panel"
import { DashboardContent } from "../../../components/dashboard/Dashcontent"
import { faShirt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useOutlet, Outlet, useParams } from "react-router-dom";
import { ProductsList } from '../../../components/dashboard/Products/ProductsPageComps/ProductsList';
import ProductsContext from "../../../context/ProductsContext";
import { useContext } from "react";

export const BrandsCategoryPage = ()=>{
   const navigate = useNavigate();
   const outlet = useOutlet();
   const {prod} = useParams();
   const { productsList } = useContext(ProductsContext); 
   return  <DashboardContent title={'Clothes'} icon={faShirt}>
        {outlet? <Outlet context={prod}/>  :
         <div className="products-page flex flex-col gap-2 px-4">
                <div className="prod-by-type flex self-center gap-2">
                <Panel onClick={()=>navigate('categories')}>
                        <div className="font-semibold text-2xl w-32" >Categories</div>
                </Panel>
                <Panel onClick={()=>navigate('brands')}>
                        <div className="font-semibold text-2xl w-32" >Brands</div>
                </Panel>
        </div>
                <ProductsList prodsList={productsList} />
        </div>}
   </DashboardContent>
}