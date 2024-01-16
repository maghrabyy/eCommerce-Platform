    export const categoriesRoutes = {
        all:'all',
        hoodiesNSweatshirt:'hoodiesNSweatshirt',
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
        homePage:'/',
        orders:'orders',
        customers:'customers',
        salesReport:'sales-report',
        products:{categoriesRoutes,brandsRoutes},
        addProduct: 'addProduct',
        activityLog: 'activityLog',
    }