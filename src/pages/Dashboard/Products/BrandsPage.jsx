import { DashboardContent } from "../../../components/dashboard/Dashcontent"
import { Panel } from "../../../components/util/Panel"
import { faShirt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import pullNBearLogo from '../../../assets/brands/pullnbear.png';
import bershkaLogo from '../../../assets/brands/bershka.svg';
import americanEagleLogo from '../../../assets/brands/americaneagle.png';
import zaraLogo from '../../../assets/brands/zara.png';
import defactoLogo from '../../../assets/brands/defacto.svg';
import hollisterLogo from '../../../assets/brands/hollister.png';


export const BrandsPage = ()=>{
    const navigate = useNavigate();
    const productBrands = [
        {path:'pullNBear',title:"Pull & Bear",img:pullNBearLogo},
        {path:'bershka',title:"Bershka",img:bershkaLogo},
        {path:'americanEagle',title:"American Eagle",img:americanEagleLogo},
        {path:'zara',title:"Zara",img:zaraLogo},
        {path:'defacto',title:"Defacto",img:defactoLogo},
        {path:'hollister',title:"Hollister",img:hollisterLogo}
      ]
      const renderedProductBrands = productBrands.map(prodBrand =>
        <Panel onClick={()=>navigate(prodBrand.path)} topImg={prodBrand.img}  height={'200px'}/>
        );
    return <DashboardContent className={'grid xl:grid-cols-3 gap-4 p-4'} title={'Brands'} icon={faShirt}>
        {renderedProductBrands}
    </DashboardContent>
}