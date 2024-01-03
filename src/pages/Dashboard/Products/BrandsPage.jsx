import { DashboardContent } from "../../../components/dashboard/Dashcontent"
import { Panel } from "../../../components/util/Panel"
import { faShirt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

export const BrandsPage = ()=>{
    const navigate = useNavigate();
    const productBrands = [
        {path:'pullNBear',title:"Pull & Bear"},
        {path:'bershka',title:"Bershka"},
        {path:'americanEagle',title:"American Eagle"},
        {path:'zara',title:"Zara"},
        {path:'defacto',title:"Defacto"},
        {path:'hollister',title:"Hollister"}
      ]
      const renderedProductBrands = productBrands.map(prodBrand =>
        <Panel onClick={()=>navigate(prodBrand.path)}>
            <div className="font-semibold text-5xl px-6">{prodBrand.title}</div>
        </Panel>
        );
    return <DashboardContent className={'flex flex-col gap-4 px-4'} title={'Brands'} icon={faShirt}>
        {renderedProductBrands}
    </DashboardContent>
}