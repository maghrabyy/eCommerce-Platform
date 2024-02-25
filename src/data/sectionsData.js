import { categoriesRoutes, brandsRoutes } from "./navigationPaths"
import pullNBearLogo from '../assets/brands/pullnbear.png';
import bershkaLogo from '../assets/brands/bershka.svg';
import americanEagleLogo from '../assets/brands/americaneagle.png';
import zaraLogo from '../assets/brands/zara.png';
import defactoLogo from '../assets/brands/defacto.svg';
import hollisterLogo from '../assets/brands/hollister.png';

import hoodiesImg from '../assets/hoodies.png';
import jacketsImg from '../assets/jackets.png';
import denimsImg from '../assets/denims.png';
import trousersImg from '../assets/trousers.png';
import clothesImg from '../assets/clothes.png';

export const categoriesList = [
    {id: 'cat01', title:'All',path:categoriesRoutes.all,img:clothesImg},
    {id: 'cat02', title:'Hoodies and Sweatshirts',path:categoriesRoutes.hoodiesNSweatshirt,img:hoodiesImg},
    {id: 'cat03', title:'Coats and Jackets',path:categoriesRoutes.coatsNJackets,img:jacketsImg},
    {id: 'cat04', title:'Denim',path:categoriesRoutes.denims,img:denimsImg},
    {id: 'cat05', title:'Trousers',path:categoriesRoutes.trousers,img:trousersImg},
]

export const brandsList = [
    {id: 'brand01', title:'Pull & Bear',path:brandsRoutes.pullNBear,img:pullNBearLogo},
    {id: 'brand02', title:'Bershka',path:brandsRoutes.bershka,img:bershkaLogo},
    {id: 'brand03', title:'American Eagle',path:brandsRoutes.americanEagle,img:americanEagleLogo},
    {id: 'brand04', title:'Zara',path:brandsRoutes.zara,img:zaraLogo},
    {id: 'brand05', title:'Defacto',path:brandsRoutes.defacto,img:defactoLogo},
    {id: 'brand06', title:'Hollister',path:brandsRoutes.hollister,img:hollisterLogo},
]