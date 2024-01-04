import { Panel } from "../../../components/util/Panel"
import { useNavigate } from "react-router-dom";
import pullNBearLogo from '../../../assets/brands/pullnbear.png';
import bershkaLogo from '../../../assets/brands/bershka.svg';
import americanEagleLogo from '../../../assets/brands/americaneagle.png';
import zaraLogo from '../../../assets/brands/zara.png';
import defactoLogo from '../../../assets/brands/defacto.svg';
import hollisterLogo from '../../../assets/brands/hollister.png';
import { useOutlet } from "react-router-dom";
import { ProductsNavs } from "../../../components/dashboard/Products/ProductsPageComps/ProductNavs";

export const BrandsPage = ()=>{
    const navigate = useNavigate();
    const outlet = useOutlet();
    const productBrands = [
        {path:'pullNBear',title:"Pull & Bear",img:pullNBearLogo},
        {path:'bershka',title:"Bershka",img:bershkaLogo},
        {path:'americanEagle',title:"American Eagle",img:americanEagleLogo},
        {path:'zara',title:"Zara",img:zaraLogo},
        {path:'defacto',title:"Defacto",img:defactoLogo},
        {path:'hollister',title:"Hollister",img:hollisterLogo}
      ]
      const renderedProductBrands = productBrands.map(prodBrand =>
        <Panel key={prodBrand.path} onClick={()=>navigate(prodBrand.path)} topImg={prodBrand.img}  height={'200px'}/>
        );
    return outlet || 
    <div className="brands-page">
        <ProductsNavs  />
        <div className={'grid xl:grid-cols-3 gap-4 p-4'} >
            {renderedProductBrands}
        </div>
    </div>
}