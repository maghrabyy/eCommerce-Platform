import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faShirt, faCirclePlus, faClipboardList} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import NavigationContext from '../../../context/NavigationContext';

export const MainDashboard = ()=>{
    const { navigate, routes } = useContext(NavigationContext);
    return <div className="grid xl:grid-cols-2 gap-5 xl:px-14 py-2">
        <DashboardItem onClick={()=>navigate(routes.sales.path)} icon={faChartLine} title={'Sales'}/>
        <DashboardItem onClick={()=>navigate(routes.products.categoriesRoutes.all.path)} icon={faShirt} title={'Products'}/>
        <DashboardItem onClick={()=>navigate(routes.dataEntry.addProduct.path)} icon={faCirclePlus} title={'Data Entry'}/>
        <DashboardItem onClick={()=>navigate(routes.activityLog.path)} icon={faClipboardList} title={'Activity Log'}/>
    </div>
}

const DashboardItem = ({icon,title,onClick})=>{
    const [mouseHovered,setMouseHovered] = useState(false);
    return <div onMouseOver={()=>setMouseHovered(true)}
     onMouseLeave={()=>setMouseHovered(false)} 
     onClick={onClick} 
     className={`relative dashboard-item flex flex-col items-center text-center border-2 border-slate-200 rounded-lg shadow-lg py-4 ${mouseHovered? 'text-white' : 'text-slate-900'} duration-150 ease-in hover:scale-105 cursor-pointer select-none overflow-hidden`}>
        <FontAwesomeIcon className='text-9xl z-10' icon={icon}/>
        <div className="title text-5xl z-10">{title}</div>
        <div className={`bg-animation absolute bg-gradient-to-r from-slate-600 to-slate-900 w-full h-full top-0 ${mouseHovered? 'translate-x-0' : '-translate-x-full'} duration-300 ease-in`}></div>
    </div>
}