import { Link } from "react-router-dom"
import { DashboardContent } from "../../../components/dashboard/Dashcontent"
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Panel } from "../../../components/util/Panel";

export const DataEntryPage = ()=>{
    return <DashboardContent className={'flex flex-col xl:flex-row justify-center gap-4 px-4'} title={'Data Entry'} icon={faCirclePlus}>
           <Panel>
                <Link className="font-semibold text-4xl px-6" to={'addProd'}>Add Product</Link>
           </Panel>
           <Panel>
                <Link className="font-semibold text-4xl px-6" to={'addCategory'}>Add Category</Link>
           </Panel>
    </DashboardContent>
}