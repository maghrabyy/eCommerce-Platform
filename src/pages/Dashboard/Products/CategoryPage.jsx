import { Panel } from "../../../components/util/Panel"
import { useNavigate, useOutlet } from "react-router-dom";
import hoodiesImg from '../../../assets/hoodies.png';
import jacketsImg from '../../../assets/jackets.png';
import denimsImg from '../../../assets/denims.png';
import trousersImg from '../../../assets/trousers.png';
import clothesImg from '../../../assets/clothes.png';
import { ProductsNavs } from "../../../components/dashboard/Products/ProductsPageComps/ProductNavs";

export const CategoriesPage = ()=>{
    const navigate = useNavigate();
    const outlet = useOutlet();
    const productCategories = [
        {path:'all',title:"All",img:clothesImg},
        {path:'hoodiesNSweatshirt',title:"Hoodies and Sweatshirts",img:hoodiesImg},
        {path:'coatsNJackets',title:"Coats and Jackets",img:jacketsImg},
        {path:'denims',title:"Denims",img:denimsImg},
        {path:'trousers',title:"Trousers",img:trousersImg}
      ]
      const renderedProductCategories = productCategories.map(prodCat =>
        <Panel key={prodCat.path} onClick={()=>navigate(prodCat.path)} bottomImg={prodCat.img}>
            <div className="font-semibold text-2xl px-6">{prodCat.title}</div>
        </Panel>
        );
    return outlet || 
    <div className="categories-page">
        <ProductsNavs  />
        <div className="grid xl:grid-cols-3 gap-4 pt-2 p-4'">
            {renderedProductCategories}
        </div>
    </div>
}