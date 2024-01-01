import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChartLine, faShirt, faCirclePlus, faClipboardList, faBars } from '@fortawesome/free-solid-svg-icons';
import { SalesPage } from '../../pages/Dashboard/Sales/SalesPage';
import { ProductsPage } from '../../pages/Dashboard/Products/ProductsPage';
import { ProductSearch } from './Products/ProductSearch';
import { AddCategoryPage } from '../../pages/Dashboard/Data Entry/Add Category/AddCategoryPage'
import { AddProductPage } from '../../pages/Dashboard/Data Entry/Add Product/AddProductPage';
import { ActivityLogPage } from '../../pages/Dashboard/Activity Log/ActivityLogPage';
import { ProductsProvider } from '../../context/ProductsContext';
import { MainDashboard } from '../../pages/Dashboard/Dashboard Main/MainDashboardPage';
import { MdDashboard } from "react-icons/md";
import { useContext } from 'react';
import NavigationContext from '../../context/NavigationContext';

export const dashcontentRef = { current: null };

export const Dashcontent = ({setShowToggledSidebar})=>{
    const { currentPath } = useContext(NavigationContext);
    const addCatProd = {
        addCategory:{title:"Add Category",content:function(){return<AddCategoryPage/>},icon:faCirclePlus},
        addProduct: {title:"Add Product",content:function(){return<AddProductPage/>},icon:faCirclePlus},
    }
    const categories = {
        all:{title:"All",content:function(){return<ProductsPage catTitle ={this.title}/>},icon:faShirt},
        hoodiesNSweatshirt:{title:"Hoodies and Sweatshirts",content:function(){return<ProductsPage catTitle ={this.title} />},icon:faShirt},
        coatsNJackets:{title:"Coats and Jackets",content:function(){return<ProductsPage catTitle ={this.title}/>},icon:faShirt},
        denims:{title:"Denims",content:function(){return<ProductsPage catTitle ={this.title} />},icon:faShirt},
        trousers:{title:"Trousers",content:function(){return<ProductsPage catTitle ={this.title}/>},icon:faShirt}
    }
    const brands = {
        pullNBear:{title:"Pull & Bear",content:function(){return<ProductsPage brandTitle ={this.title}/>},icon:faShirt},
        Bershka:{title:"Bershka",content:function(){return<ProductsPage brandTitle ={this.title} />},icon:faShirt},
        americanEagle:{title:"American Eagle",content:function(){return<ProductsPage brandTitle ={this.title} />},icon:faShirt},
        zara:{title:"Zara",content:function(){return<ProductsPage brandTitle ={this.title} />},icon:faShirt},
        defacto:{title:"Defacto",content:function(){return<ProductsPage brandTitle ={this.title} />},icon:faShirt},
        hollister:{title:"Hollister",content:function(){return<ProductsPage brandTitle ={this.title} />},icon:faShirt}
    }
    const navigatedItem = {
        main:{title:'Dashboard',content:function(){return<MainDashboard/>}},
        sales:{title:"Sales",content:function(){return<SalesPage/>},icon:faChartLine},
        products:{categories,brands},
        addItems:addCatProd,
        activityLog: {title:"Activity Log",content:function(){return<ActivityLogPage/>},icon:faClipboardList}
    }
    const navigateToPageFromTitle = () =>{
       if(currentPath === "/home")
            return navigatedItem.main;
        else if(currentPath === "/sales")
            return navigatedItem.sales;
        else if(currentPath === "/all")
            return navigatedItem.products.categories.all;
        else if(currentPath === "/hoodiesNSweatshirt")
            return navigatedItem.products.categories.hoodiesNSweatshirt;
        else if(currentPath === "/coatsNJackets")
            return navigatedItem.products.categories.coatsNJackets;
        else if(currentPath === "/denim")
            return navigatedItem.products.categories.denims;
        else if(currentPath === "/trousers")
            return navigatedItem.products.categories.trousers;
        else if(currentPath === "/pullNBear")
            return navigatedItem.products.brands.pullNBear;     
        else if(currentPath === "/bershka")
            return navigatedItem.products.brands.Bershka;     
        else if(currentPath === "/americanEagle")
            return navigatedItem.products.brands.americanEagle;     
        else if(currentPath === "/zara")
            return navigatedItem.products.brands.zara;     
        else if(currentPath === "/defacto")
            return navigatedItem.products.brands.defacto;     
        else if(currentPath === "/hollister")
            return navigatedItem.products.brands.hollister;     
        else if(currentPath === "/addCategory")
            return navigatedItem.addItems.addCategory;
        else if(currentPath === "/addProd")
            return navigatedItem.addItems.addProduct;
        else if(currentPath === "/activityLog")
            return navigatedItem.activityLog;
    }
    const isClothesSection = ()=>{
        if(currentPath !== "/sales" && currentPath !== "/addCategory" && currentPath !== "/addProd" && currentPath !== "/activityLog" && currentPath !== "/home" ){
            return true
        }
        else return false;
    }
    return (
    <ProductsProvider>
        <div ref={dashcontentRef} className="dashboard-content col-span-12 xl:col-span-10 bg-white overflow-scroll">
            <div className='px-4'>
                <div className="main-header py-4">
                    {isClothesSection() && <div className="sidebar-toggler flex justify-between items-center xl:hidden">
                        <FontAwesomeIcon onClick={()=>setShowToggledSidebar(true)} className='text-gray-700 text-2xl cursor-pointer hover:text-slate-600' icon={faBars} />
                        {isClothesSection() ? <ProductSearch  /> : null}
                    </div>}
                    <div className="flex justify-between border-b-2 py-5 border-b-gray-600">
                        <span className="font-bold text-gray-700 text-2xl flex items-center gap-2">
                            {currentPath === '/home'? <MdDashboard className='text-3xl' />: <FontAwesomeIcon className='me-2' icon={navigateToPageFromTitle().icon} />} 
                            {isClothesSection()? 'Clothing': navigateToPageFromTitle().title}</span>
                        {!isClothesSection() && <FontAwesomeIcon onClick={()=>setShowToggledSidebar(true)} className='text-gray-700 text-2xl cursor-pointer xl:hidden hover:text-slate-600' icon={faBars} />}
                        <div className='basis-1/2 hidden xl:block'>{isClothesSection() ? <ProductSearch /> : null}</div> 
                    </div> 
                </div>
                {navigateToPageFromTitle().content()}
            </div>
        </div>
    </ProductsProvider>
    );
}