import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faShirt, faCirclePlus, faClipboardList} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import NavigationsRoutesContext from '../../../context/NavigationRoutesContext';
import { useNavigate } from 'react-router-dom';
import { Panel } from '../../../components/util/Panel';

export const MainDashboard = ()=>{
    const navigate = useNavigate();
    const {  routes } = useContext(NavigationsRoutesContext);
    return <div className="grid xl:grid-cols-2 gap-5 xl:px-14 py-2">
        <DashboardItem onClick={()=>navigate(routes.sales)} icon={faChartLine} title={'Sales'}/>
        <DashboardItem onClick={()=>navigate('products')} icon={faShirt} title={'Products'}/>
        <DashboardItem onClick={()=>navigate('dataEntry')} icon={faCirclePlus} title={'Data Entry'}/>
        <DashboardItem onClick={()=>navigate(routes.activityLog)} icon={faClipboardList} title={'Activity Log'}/>
    </div>
}

const DashboardItem = ({icon,title,onClick})=>{
    return <Panel onClick={onClick} animation>
            <FontAwesomeIcon className='text-9xl' icon={icon}/>
            <div className="title text-5xl">{title}</div>
    </Panel>}
