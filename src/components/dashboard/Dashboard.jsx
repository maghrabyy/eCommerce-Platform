import { Sidebar } from "./Sidebar";
import { useContext } from "react";
import { SearchInputProvider } from "../../context/SearchInputContext";
import SidebarTogglerContext from "../../context/SidebarTogglerContext";
import { Outlet, useLocation } from "react-router-dom";
import { DashboardContent } from "./Dashcontent";
import { routes, categoriesRoutes, brandsRoutes } from "../../data/navigationPaths";
import { UseLargerScreen } from '../../components/UseLargerScreen';

export const Dashboard = ()=>{
  function getKeyByValue( value) {
  return Object.keys(routes).find(key => routes[key].path === value);
}
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
  const location = useLocation().pathname;
  const getRoutePath = (path)=>{
    if(path !== routes.homePage.path){
      const locPath = path.slice(1);
      const locationPath = locPath.substring(0,locPath.indexOf('/') === -1? undefined : locPath.indexOf('/'));
      return locationPath;
    }else{
      return  routes.homePage.path;
    }
  }

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
  const isProdsListRoute = location === `/${routes.products.path}` || isProdsCatRoute() || isProdsBrandRoute();
  const { showToggledSidebar, hideSidebar } = useContext(SidebarTogglerContext);
    return (
      <SearchInputProvider>
        {(location === `/${routes.orders.path}` || location === `/${routes.customers.path}`) && <UseLargerScreen/>}
        <div className='dashboard grid grid-cols-12 h-screen '>
          <div onClick={hideSidebar} className={`${showToggledSidebar? 'block xl:hidden' : 'hidden'} overlay w-screen h-screen top-0 right-0 bg-black opacity-75 z-50 fixed`}></div>
          <Sidebar />
          <DashboardContent title={routes[getKeyByValue(getRoutePath(location))]?.title} icon={routes[getKeyByValue(getRoutePath(location))]?.icon} showSearchInput={isProdsListRoute}>
            <Outlet />
          </DashboardContent> 
      </div>
      </SearchInputProvider>
    );
}