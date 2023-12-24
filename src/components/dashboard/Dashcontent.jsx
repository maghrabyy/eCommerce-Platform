import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChartLine, faShirt, faCirclePlus, faClipboardList, faBars } from '@fortawesome/free-solid-svg-icons';
import { Sales } from './Sales/Sales';
import { ProductsPage } from '../../pages/Dashboard/Products/ProductsPage';
import { ProductSearch } from './Products/ProductSearch';
import { AddCategoryPage } from '../../pages/Dashboard/Data Entry/Add Category/AddCategoryPage'
import { AddProductPage } from '../../pages/Dashboard/Data Entry/Add Product/AddProductPage';
import { ActiviyLog } from './Activity Log/ActiviyLog';
import { ProductsProvider } from '../../context/ProductsContext';

export const Dashcontent = ({pageTitle, setShowToggledSidebar})=>{
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
        sales:{title:"Sales",content:function(){return<Sales/>},icon:faChartLine},
        products:{categories,brands},
        addItems:addCatProd,
        activityLog: {title:"Activity Log",content:function(){return<ActiviyLog/>},icon:faClipboardList}
    }
    const navigateToPageFromTitle = pageTitle =>{
        if(pageTitle === "Sales")
            return navigatedItem.sales;
        else if(pageTitle === "All")
            return navigatedItem.products.categories.all;
        else if(pageTitle === "HoodiesNSweatshirt")
            return navigatedItem.products.categories.hoodiesNSweatshirt;
        else if(pageTitle === "CoatsNJackets")
            return navigatedItem.products.categories.coatsNJackets;
        else if(pageTitle === "Denim")
            return navigatedItem.products.categories.denims;
        else if(pageTitle === "Trousers")
            return navigatedItem.products.categories.trousers;
        else if(pageTitle === "PullNBear")
            return navigatedItem.products.brands.pullNBear;     
        else if(pageTitle === "Bershka")
            return navigatedItem.products.brands.Bershka;     
        else if(pageTitle === "AmericanEagle")
            return navigatedItem.products.brands.americanEagle;     
        else if(pageTitle === "Zara")
            return navigatedItem.products.brands.zara;     
        else if(pageTitle === "Defacto")
            return navigatedItem.products.brands.defacto;     
        else if(pageTitle === "Hollister")
            return navigatedItem.products.brands.hollister;     
        else if(pageTitle === "AddCategory")
            return navigatedItem.addItems.addCategory;
        else if(pageTitle === "AddProd")
            return navigatedItem.addItems.addProduct;
        else if(pageTitle === "ActivityLog")
            return navigatedItem.activityLog;
    }
    const isClothesSection = ()=>{
        if(pageTitle !== "Sales" && pageTitle !== "AddCategory" && pageTitle !== "AddProd" && pageTitle !== "ActivityLog" ){
            return true
        }
        else return false;
    }
    return (
    <ProductsProvider>
        <div className="dashboard-content col-span-10 xl:col-span-8 rounded-md shadow-lg bg-white overflow-scroll">
            <div className='px-4'>
                <div className="main-header py-4">
                    <div className="navbar-toggler flex justify-between items-center xl:hidden">
                        <FontAwesomeIcon onClick={()=>setShowToggledSidebar(true)} className='text-gray-700 text-2xl cursor-pointer' icon={faBars} />
                        {isClothesSection() ? <ProductSearch  /> : null}
                    </div>
                    <div className="flex justify-between border-b-2 py-5 border-b-gray-600">
                        <h1 className="font-bold text-gray-700 text-2xl"><FontAwesomeIcon className='me-2' icon={navigateToPageFromTitle(pageTitle).icon} /> {isClothesSection()? 'Clothing': navigateToPageFromTitle(pageTitle).title}</h1>
                    <div className='basis-1/2 hidden xl:block'>{isClothesSection() ? <ProductSearch /> : null}</div> 
                    </div> 
                </div>
                {navigateToPageFromTitle(pageTitle).content()}
            </div>
        </div>
    </ProductsProvider>
    );
}