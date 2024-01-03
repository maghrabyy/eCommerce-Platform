import { createContext } from "react";


const NavigationsRoutesContext = createContext();

export const NavigationRoutesProvider = ({children})=>{
    const categoriesRoutes = {
        all:'products/categories/all',
        hoodiesNSweatshirt:'products/categories/hoodiesNSweatshirt',
        coatsNJackets:'products/categories/coatsNJackets',
        denims:'products/categories/denims',
        trousers:'products/categories/trousers',
    }
    const brandsRoutes = {
        pullNBear:'products/brands/pullNBear',
        bershka:'products/brands/bershka',
        americanEagle:'/products/brands/americanEagle',
        zara:'products/brands/zara',
        defacto:'products/brands/defacto',
        hollister:'products/brands/hollister',
    }
    const routes = {
        homePage:'/',
        sales:'sales',
        products:{categoriesRoutes,brandsRoutes},
        dataEntry:{
            addCategory:'dataEntry/addCategory',
            addProduct: 'dataEntry/addProd',
        },
        activityLog: 'activityLog',
    }
    return <NavigationsRoutesContext.Provider value={{routes,brandsRoutes,categoriesRoutes}}>
        {children}
    </NavigationsRoutesContext.Provider>
}

export default NavigationsRoutesContext;