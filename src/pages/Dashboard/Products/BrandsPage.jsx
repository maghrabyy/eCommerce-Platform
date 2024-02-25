import { Panel } from "../../../components/util/Panel"
import { useNavigate } from "react-router-dom";
import { useOutlet } from "react-router-dom";
import { ProductsNavs } from "../../../components/dashboard/Products/ProductsPageComps/ProductNavs";
import { AddSectionModal } from "../../../components/dashboard/Add Items/AddSection/AddSectionModal";
import { useContext } from "react";
import SectionsContext from "../../../context/SectionsContext";

export const BrandsPage = ()=>{
    const navigate = useNavigate();
    const outlet = useOutlet();
    const { brandsSection } = useContext(SectionsContext);
    const renderedProductBrands = brandsSection.map(prodBrand =>
        <Panel key={prodBrand.path} onClick={()=>navigate(prodBrand.path)} topImg={prodBrand.img}  height={'200px'}/>
    );
    return outlet || 
    <div className="brands-page">
        <AddSectionModal brands />
        <ProductsNavs  />
        <div className={'grid xl:grid-cols-3 gap-4 p-4'} >
            {renderedProductBrands}
        </div>
    </div>
}