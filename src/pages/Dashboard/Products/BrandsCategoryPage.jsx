import { Panel } from "../../../components/util/Panel"
import { useNavigate, useOutlet, Outlet, useParams } from "react-router-dom";
import { ProductsList } from '../../../components/dashboard/Products/ProductsPageComps/ProductsList';
import { useContext, useState } from "react";
import SearchInptContext from "../../../context/SearchInputContext";
import { ProductsHeader } from "../../../components/dashboard/Products/ProductsPageComps/ProductsHeader";
import ProductsContext from "../../../context/ProductsContext";

export const BrandsCategoryPage = ()=>{
   const navigate = useNavigate();
   const outlet = useOutlet();
   const {prod} = useParams();
   const [searchInpt] = useContext(SearchInptContext);
   const { productsData } = useContext(ProductsContext);
   const [allProdsItems,setAllProdsItems] = useState([...productsData]);
   const searchResultFilter = allProdsItems.filter(prod=> 
        prod.prodBrand.text.toUpperCase().includes(searchInpt.toUpperCase()) ||
        prod.prodTitle.toUpperCase().includes(searchInpt.toUpperCase()) ||
        prod.prodDesc.toUpperCase().includes(searchInpt.toUpperCase()));
   return outlet? <Outlet context={prod}/>  :
    <div className="products-page flex flex-col gap-2 px-4">
        <div className="prod-by-type flex self-center gap-2">
            <Panel onClick={()=>navigate('categories')}>
                    <div className="font-semibold text-2xl w-32" >Categories</div>
            </Panel>
            <Panel onClick={()=>navigate('brands')}>
                    <div className="font-semibold text-2xl w-32" >Brands</div>
            </Panel>
        </div>
        <ProductsHeader  
            prodsList={allProdsItems} 
            setProdsList={setAllProdsItems} 
            searchResultFilter={searchResultFilter} 
            showProdsNav={false}
            showActionBtns={false}
            initialprodsList={productsData} />
        <ProductsList prodsList={allProdsItems} searchResultFilter={searchResultFilter} />
    </div>
}