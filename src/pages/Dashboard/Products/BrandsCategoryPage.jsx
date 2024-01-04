import { Panel } from "../../../components/util/Panel"
import { DashboardContent } from "../../../components/dashboard/Dashcontent"
import { faShirt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useOutlet, Outlet, useParams } from "react-router-dom";
import { ProductsList } from '../../../components/dashboard/Products/ProductsPageComps/ProductsList';
import ProductsContext from "../../../context/ProductsContext";
import { useContext } from "react";
import SearchInptContext from "../../../context/SearchInputContext";
import { ProductSearch } from "../../../components/dashboard/Products/ProductSearch";

export const BrandsCategoryPage = ()=>{
   const navigate = useNavigate();
   const outlet = useOutlet();
   const {prod} = useParams();
   const [searchInpt, setSearchInpt] = useContext(SearchInptContext)
   const { productsList } = useContext(ProductsContext); 
   const searchResultFilter = productsList.filter(prod=> 
        prod.prodBrand.text.toUpperCase().includes(searchInpt.toUpperCase()) ||
        prod.prodTitle.toUpperCase().includes(searchInpt.toUpperCase()) ||
        prod.prodDesc.toUpperCase().includes(searchInpt.toUpperCase()));
        
   return  <DashboardContent title={'Clothes'} icon={faShirt} showSearchInput>
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
        <div className="pt-2 md:hidden">
                <ProductSearch />
            </div>
        {
                searchInpt.length > 0 &&
                    <div className="clear-searchFilter pt-2">
                        <span>{searchResultFilter.length} products found - </span>
                        <span onClick={()=>setSearchInpt('')} className=" cursor-pointer text-blue-900 hover:text-blue-600">Clear search result.</span>
                    </div>
            }
                <ProductsList prodsList={productsList} searchResultFilter={searchResultFilter} />
        </div>}
   </DashboardContent>
}