import { DashboardContent } from "../../../components/dashboard/Dashcontent"
import { Panel } from "../../../components/util/Panel"
import { faShirt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

export const CategoriesPage = ()=>{
    const navigate = useNavigate();
    const productCategories = [
        {path:'all',title:"All"},
        {path:'hoodiesNSweatshirt',title:"Hoodies and Sweatshirts"},
        {path:'coatsNJackets',title:"Coats and Jackets"},
        {path:'denims',title:"Denims"},
        {path:'trousers',title:"Trousers"}
      ]
      const renderedProductCategories = productCategories.map(prodCat =>
        <Panel onClick={()=>navigate(prodCat.path)}>
            <div className="font-semibold text-5xl px-6">{prodCat.title}</div>
        </Panel>
        );
    return <DashboardContent className={'flex flex-col gap-4 px-4'} title={'Categories'} icon={faShirt}>
        {renderedProductCategories}
    </DashboardContent>
}