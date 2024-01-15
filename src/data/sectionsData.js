import { categoriesRoutes, brandsRoutes } from "./navigationPaths"

export const categories = [
    {id: 'cat01', title:'All',path:categoriesRoutes.all},
    {id: 'cat02', title:'Hoodies and Sweatshirts',path:categoriesRoutes.hoodiesNSweatshirt},
    {id: 'cat03', title:'Coats and Jackets',path:categoriesRoutes.coatsNJackets},
    {id: 'cat04', title:'Denim',path:categoriesRoutes.denims},
    {id: 'cat05', title:'Trousers',path:categoriesRoutes.trousers},
]

export const brands = [
    {id: 'brand01', title:'Pull & Bear',path:brandsRoutes.pullNBear},
    {id: 'brand02', title:'Bershka',path:brandsRoutes.bershka},
    {id: 'brand03', title:'American Eagle',path:brandsRoutes.americanEagle},
    {id: 'brand04', title:'Zara',path:brandsRoutes.zara},
    {id: 'brand05', title:'Defacto',path:brandsRoutes.defacto},
    {id: 'brand06', title:'Hollister',path:brandsRoutes.hollister},
]