import { Panel } from "../../../components/util/Panel"
import { DashboardContent } from "../../../components/dashboard/Dashcontent"
import { faShirt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useOutlet } from "react-router-dom";

export const BrandsCategoryPage = ()=>{
    const navigate = useNavigate();
    const outlet = useOutlet();
    return outlet ||  <DashboardContent className={'flex flex-col xl:flex-row justify-center gap-4 px-4'} title={'Products'} icon={faShirt}>
                <Panel onClick={()=>navigate('categories')}>
                    <div className="font-semibold text-5xl px-6" >Categories</div>
            </Panel>
            <Panel onClick={()=>navigate('brands')}>
                    <div className="font-semibold text-5xl px-6" >Brands</div>
            </Panel>
        </DashboardContent>

}