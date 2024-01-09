import { createContext } from "react";


const NavigationsRoutesContext = createContext();

export const NavigationRoutesProvider = ({children})=>{
    const categoriesRoutes = {
        all:'all',
        hoodiesNSweatshirt:'hoodiesNSweatshirt',
        coatsNJackets:'coatsNJackets',
        denims:'denims',
        trousers:'trousers',
    }
    const brandsRoutes = {
        pullNBear:'pullNBear',
        bershka:'bershka',
        americanEagle:'americanEagle',
        zara:'zara',
        defacto:'defacto',
        hollister:'hollister',
    }
    const routes = {
        homePage:'/',
        orders:'orders',
        products:{categoriesRoutes,brandsRoutes},
        dataEntry:{
            addCategory:'addCategory',
            addProduct: 'addProd',
        },
        activityLog: 'activityLog',
    }
    return <NavigationsRoutesContext.Provider value={{routes,brandsRoutes,categoriesRoutes}}>
        {children}
    </NavigationsRoutesContext.Provider>
}

export default NavigationsRoutesContext;