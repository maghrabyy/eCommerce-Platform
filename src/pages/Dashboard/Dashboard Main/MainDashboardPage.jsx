import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routes } from '../../../data/navigationPaths';
import { useNavigate } from 'react-router-dom';
import { Panel } from '../../../components/util/Panel';

export const MainDashboard = ()=>{
    const navigate = useNavigate();
    return <div className="grid xl:grid-cols-2 gap-5 xl:px-14">
        <DashboardItem onClick={()=>navigate(routes.salesReport.path)} icon={routes.salesReport.icon} title={routes.salesReport.title}/>
        <DashboardItem onClick={()=>navigate(routes.orders.path)} icon={routes.orders.icon} title={routes.orders.title}/>
        <DashboardItem onClick={()=>navigate(routes.products.path)} icon={routes.products.icon} title={'Products'}/>
        <DashboardItem onClick={()=>navigate(routes.customers.path)} icon={routes.customers.icon} title={routes.customers.title}/>
        <DashboardItem onClick={()=>navigate(routes.addProduct.path)} icon={routes.addProduct.icon} title={routes.addProduct.title}/>
        <DashboardItem onClick={()=>navigate(routes.activityLog.path)} icon={routes.activityLog.icon} title={routes.activityLog.title}/>
    </div>
}

const DashboardItem = ({icon,title,onClick})=>{
    return <Panel onClick={onClick} animation>
            <FontAwesomeIcon className='text-9xl' icon={icon}/>
            <div className="title text-5xl">{title}</div>
    </Panel>}
