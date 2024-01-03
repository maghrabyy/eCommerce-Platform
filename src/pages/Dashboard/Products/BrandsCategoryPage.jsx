import { Link } from "react-router-dom"
import { Panel } from "../../../components/util/Panel"
import { DashboardContent } from "../../../components/dashboard/Dashcontent"
import { faShirt } from '@fortawesome/free-solid-svg-icons';

export const BrandsCategoryPage = ()=>{
    return <DashboardContent className={'flex flex-col xl:flex-row justify-center gap-4 px-4'} title={'Products'} icon={faShirt}>
            <Panel>
                <Link className="font-semibold text-5xl px-6" to={'categories'}>Categories</Link>
           </Panel>
           <Panel>
                <Link className="font-semibold text-5xl px-6" to={'brands'}>Brands</Link>
           </Panel>
    </DashboardContent>
}