import { useNavigate,useOutlet } from "react-router-dom"
import { DashboardContent } from "../../../components/dashboard/Dashcontent"
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Panel } from "../../../components/util/Panel";

export const DataEntryPage = ()=>{
     const navigate = useNavigate();
     const outlet = useOutlet();
    return outlet || <DashboardContent className={'flex flex-col xl:flex-row justify-center gap-4 px-4'} title={'Data Entry'} icon={faCirclePlus}>
           <Panel onClick={()=>navigate('addProd')}>
                <div className="font-semibold text-4xl px-6">Add Product</div>
           </Panel>
           <Panel onClick={()=>navigate('addCategory')}>
                <div className="font-semibold text-4xl px-6">Add Category</div>
           </Panel>
    </DashboardContent>
}