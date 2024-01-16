import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine,faBasketShopping,faUserGroup, faShirt, faCirclePlus, faClipboardList} from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../../data/navigationPaths';
import { useNavigate } from 'react-router-dom';
import { Panel } from '../../../components/util/Panel';

export const MainDashboard = ()=>{
    const navigate = useNavigate();
    return <div className="grid xl:grid-cols-2 gap-5 xl:px-14 py-2">
        <DashboardItem onClick={()=>navigate(routes.salesReport)} icon={faChartLine} title={'Sales Report'}/>
        <DashboardItem onClick={()=>navigate(routes.orders)} icon={faBasketShopping} title={'Orders'}/>
        <DashboardItem onClick={()=>navigate('products')} icon={faShirt} title={'Products'}/>
        <DashboardItem onClick={()=>navigate(routes.customers)} icon={faUserGroup} title={'Customers'}/>
        <DashboardItem onClick={()=>navigate(routes.addProduct)} icon={faCirclePlus} title={'Add Product'}/>
        <DashboardItem onClick={()=>navigate(routes.activityLog)} icon={faClipboardList} title={'Activity Log'}/>
    </div>
}

const DashboardItem = ({icon,title,onClick})=>{
    return <Panel onClick={onClick} animation>
            <FontAwesomeIcon className='text-9xl' icon={icon}/>
            <div className="title text-5xl">{title}</div>
    </Panel>}
