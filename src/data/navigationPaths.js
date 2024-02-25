import { faBuilding, faBasketShopping, faUserGroup, faChartLine,faShirt, faCirclePlus, faClipboardList } from '@fortawesome/free-solid-svg-icons';

    export const categoriesRoutes = {
        all:'all',
        hoodiesNSweatshirt:'hoodiesNSweatshirts',
        coatsNJackets:'coatsNJackets',
        denims:'denims',
        trousers:'trousers',
    }
    export const brandsRoutes = {
        pullNBear:'pullNBear',
        bershka:'bershka',
        americanEagle:'americanEagle',
        zara:'zara',
        defacto:'defacto',
        hollister:'hollister',
    }
    export const routes = {
        homePage:{path:'/', title:'Dashboard'},
        business_details:{path:'business-details', title:'Business Details', icon:faBuilding},
        orders:{path:'orders', title:'Orders', icon:faBasketShopping},
        customers:{path:'customers', title:'Customers', icon:faUserGroup},
        employees:{path:'employees', title:'Employees', icon:''},
        salesReport:{path:'sales-report', title:'Sales Report', icon:faChartLine},
        products:{path:'products', categoriesRoutes,brandsRoutes, title:'Clothes', icon:faShirt},
        addProduct: {path:'addProduct', title:'Add Product', icon:faCirclePlus},
        activityLog: {path:'activityLog', title:'Activity Log', icon:faClipboardList},
    }