import { createContext, useState, useEffect } from "react";
import {faChartLine, faShirt, faCirclePlus, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { SalesPage } from '../pages/Dashboard/Sales/SalesPage';
import { ProductsPage } from '../pages/Dashboard/Products/ProductsPage';
import { AddCategoryPage } from '../pages/Dashboard/Data Entry/Add Category/AddCategoryPage';
import { AddProductPage } from "../pages/Dashboard/Data Entry/Add Product/AddProductPage";
import { ActivityLogPage } from '../pages/Dashboard/Activity Log/ActivityLogPage';
import { MainDashboard } from "../pages/Dashboard/Dashboard Main/MainDashboardPage";

const NavigationContext = createContext();

export const NavigationProvider = ({children})=>{
    const [currentPath,setCurrentPath] = useState(window.location.pathname);
    useEffect(()=>{
        const popstateHanlder = ()=>{
            setCurrentPath(window.location.pathname);
        }
        window.addEventListener('popstate',popstateHanlder);
        return ()=> window.removeEventListener('popstate',popstateHanlder);
    },[]);
    const navigate = (path)=>{
        window.history.pushState({},'',path);
        setCurrentPath(path);
    }
    const categoriesRoutes = {
        all:{path:'/products/categories/all',title:"All",content:function(){return<ProductsPage catTitle ={this.title}/>},icon:faShirt},
        hoodiesNSweatshirt:{path:'/products/categories/hoodiesNSweatshirt',title:"Hoodies and Sweatshirts",content:function(){return<ProductsPage catTitle ={this.title} />},icon:faShirt},
        coatsNJackets:{path:'/products/categories/coatsNJackets',title:"Coats and Jackets",content:function(){return<ProductsPage catTitle ={this.title}/>},icon:faShirt},
        denims:{path:'/products/categories/denims',title:"Denims",content:function(){return<ProductsPage catTitle ={this.title} />},icon:faShirt},
        trousers:{path:'/products/categories/trousers',title:"Trousers",content:function(){return<ProductsPage catTitle ={this.title}/>},icon:faShirt}
    }
    const brandsRoutes = {
        pullNBear:{path:'/products/brands/pullNBear',title:"Pull & Bear",content:function(){return<ProductsPage brandTitle ={this.title}/>},icon:faShirt},
        bershka:{path:'/products/brands/bershka',title:"Bershka",content:function(){return<ProductsPage brandTitle ={this.title} />},icon:faShirt},
        americanEagle:{path:'/products/brands/americanEagle',title:"American Eagle",content:function(){return<ProductsPage brandTitle ={this.title} />},icon:faShirt},
        zara:{path:'/products/brands/zara',title:"Zara",content:function(){return<ProductsPage brandTitle ={this.title} />},icon:faShirt},
        defacto:{path:'/products/brands/defacto',title:"Defacto",content:function(){return<ProductsPage brandTitle ={this.title} />},icon:faShirt},
        hollister:{path:'/products/brands/hollister',title:"Hollister",content:function(){return<ProductsPage brandTitle ={this.title} />},icon:faShirt}
    }
    const routes = {
        login:{path:'/login'},
        homePage:{path:'/home',title:'Dashboard',content:function(){return<MainDashboard/>}},
        sales:{path:'/sales',title:"Sales",content:function(){return<SalesPage/>},icon:faChartLine},
        products:{categoriesRoutes,brandsRoutes},
        dataEntry:{
            addCategory:{path:'/addItems/addCategory',title:"Add Category",content:function(){return<AddCategoryPage/>},icon:faCirclePlus},
            addProduct: {path:'/addItems/addProd',title:"Add Product",content:function(){return<AddProductPage/>},icon:faCirclePlus},
        },
        activityLog: {path:'/activityLog',title:"Activity Log",content:function(){return<ActivityLogPage/>},icon:faClipboardList}
    }
    const pathNavigation = () =>{
       if(currentPath === routes.homePage.path)
            return routes.homePage;
        else if(currentPath === routes.sales.path)
            return routes.sales;
        else if(currentPath === routes.products.categoriesRoutes.all.path)
            return routes.products.categoriesRoutes.all;
        else if(currentPath === routes.products.categoriesRoutes.hoodiesNSweatshirt.path)
            return routes.products.categoriesRoutes.hoodiesNSweatshirt;
        else if(currentPath === routes.products.categoriesRoutes.coatsNJackets.path)
            return routes.products.categoriesRoutes.coatsNJackets;
        else if(currentPath === routes.products.categoriesRoutes.denims.path)
            return routes.products.categoriesRoutes.denims;
        else if(currentPath === routes.products.categoriesRoutes.trousers.path)
            return routes.products.categoriesRoutes.trousers;
        else if(currentPath === routes.products.brandsRoutes.pullNBear.path)
            return routes.products.brandsRoutes.pullNBear;     
        else if(currentPath === routes.products.brandsRoutes.bershka.path)
            return routes.products.brandsRoutes.bershka;     
        else if(currentPath === routes.products.brandsRoutes.americanEagle.path)
            return routes.products.brandsRoutes.americanEagle;     
        else if(currentPath === routes.products.brandsRoutes.zara.path)
            return routes.products.brandsRoutes.zara;     
        else if(currentPath === routes.products.brandsRoutes.defacto.path)
            return routes.products.brandsRoutes.defacto;     
        else if(currentPath === routes.products.brandsRoutes.hollister.path)
            return routes.products.brandsRoutes.hollister;     
        else if(currentPath === routes.dataEntry.addCategory.path)
            return routes.dataEntry.addCategory;
        else if(currentPath === routes.dataEntry.addProduct.path)
            return routes.dataEntry.addProduct;
        else if(currentPath === routes.activityLog.path)
            return routes.activityLog;
    }
    return <NavigationContext.Provider value={{currentPath,navigate,routes,pathNavigation}}>
        {children}
    </NavigationContext.Provider>
}

export default NavigationContext;