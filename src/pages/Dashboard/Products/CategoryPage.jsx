import { Panel } from "../../../components/util/Panel"
import { useNavigate, useOutlet } from "react-router-dom";
import { ProductsNavs } from "../../../components/dashboard/Products/ProductsPageComps/ProductNavs";
import { AddSectionModal } from "../../../components/dashboard/Add Items/AddSection/AddSectionModal";
import { useContext } from "react";
import SectionsContext from "../../../context/SectionsContext";

export const CategoriesPage = ()=>{
    const navigate = useNavigate();
    const outlet = useOutlet();
    const { categorySection } = useContext(SectionsContext);
      const renderedProductCategories = categorySection.map(prodCat =>
        <Panel key={prodCat.path} onClick={()=>navigate(prodCat.path)} bottomImg={prodCat.img}>
            <div className="font-semibold text-2xl px-6">{prodCat.title}</div>
        </Panel>
        );
    return outlet || 
    <div className="categories-page">
        <AddSectionModal categories />
        <ProductsNavs  />
        <div className="grid xl:grid-cols-3 gap-4 pt-2 p-4'">
            {renderedProductCategories}
        </div>
    </div>
}