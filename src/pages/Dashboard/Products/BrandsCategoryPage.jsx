import { Panel } from "../../../components/util/Panel"
import { DashboardContent } from "../../../components/dashboard/Dashcontent"
import { faShirt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useOutlet, Outlet, useParams, useLocation } from "react-router-dom";
import { ProductsList } from '../../../components/dashboard/Products/ProductsPageComps/ProductsList';
import ProductsContext from "../../../context/ProductsContext";
import { useContext, useState } from "react";
import SearchInptContext from "../../../context/SearchInputContext";
import { ProductsHeader } from "../../../components/dashboard/Products/ProductsPageComps/ProductsHeader";
import NavigationsRoutesContext from "../../../context/NavigationRoutesContext";

export const BrandsCategoryPage = ()=>{
    const { brandsRoutes,categoriesRoutes } = useContext(NavigationsRoutesContext);
    const productBrands = [
        {path:brandsRoutes.pullNBear,title:"Pull & Bear"},
        {path:brandsRoutes.bershka,title:"Bershka"},
        {path:brandsRoutes.americanEagle,title:"American Eagle"},
        {path:brandsRoutes.zara,title:"Zara"},
        {path:brandsRoutes.defacto,title:"Defacto"},
        {path:brandsRoutes.hollister,title:"Hollister"}
    ]
    const productCategories = [
        {path:categoriesRoutes.all,title:"All"},
        {path:categoriesRoutes.hoodiesNSweatshirt,title:"Hoodies and Sweatshirts"},
        {path:categoriesRoutes.coatsNJackets,title:"Coats and Jackets"},
        {path:categoriesRoutes.denims,title:"Denims"},
        {path:categoriesRoutes.trousers,title:"Trousers"}
   ]
   const isProdsCatRoute = () =>{
        for (const category of productCategories) {
            if(location === '/products/categories/' + category.path)
                return true
        }
   }
    const isProdsBrandRoute = () =>{
        for (const brand of productBrands) {
            if(location === '/products/brands/' + brand.path)
                return true
        }
   }
   const location = useLocation().pathname;
   const navigate = useNavigate();
   const outlet = useOutlet();
   const {prod} = useParams();
   const [searchInpt] = useContext(SearchInptContext)
   const { productsList } = useContext(ProductsContext); 
   const [allProdsItems,setAllProdsItems] = useState([...productsList]);
   const isProdsListRoute = location === '/products' || isProdsCatRoute() || isProdsBrandRoute();
   const searchResultFilter = allProdsItems.filter(prod=> 
        prod.prodBrand.text.toUpperCase().includes(searchInpt.toUpperCase()) ||
        prod.prodTitle.toUpperCase().includes(searchInpt.toUpperCase()) ||
        prod.prodDesc.toUpperCase().includes(searchInpt.toUpperCase()));
   return  <DashboardContent title={'Clothes'} icon={faShirt} showSearchInput={isProdsListRoute}>
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
                <ProductsHeader  prodsList={allProdsItems} setProdsList={setAllProdsItems} searchResultFilter={searchResultFilter} showProdsNav={false} initialprodsList={productsList} />
                <ProductsList prodsList={allProdsItems} searchResultFilter={searchResultFilter} />
        </div>}
   </DashboardContent>
}