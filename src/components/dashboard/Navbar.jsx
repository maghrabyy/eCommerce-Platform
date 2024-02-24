import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ProductSearch } from './Products/ProductSearch';
import { MdDashboard } from "react-icons/md";
import { useLocation, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import SidebarTogglerContext from '../../context/SidebarTogglerContext';
import { routes } from '../../data/navigationPaths';
import styleSquadLogo from '../../assets/style-squad-logo.jpg';

export const PrimaryNavbar = ({icon,title,showSearchInput})=>{
    const navigate = useNavigate();
    const {showSidebar} = useContext(SidebarTogglerContext);
    const isHomeage = useLocation().pathname === routes.homePage.path;
    return <div className={`navbar fixed top-0 w-full xl:ms-1 xl:w-[calc(100%-225px)] bg-white z-40 xl:shadow-none shadow-md`}>
    <div className="main-header px-4">
        <div className="flex justify-between items-center py-5">
            <span className="font-bold text-gray-700 text-2xl flex items-center gap-2">
                <FontAwesomeIcon onClick={showSidebar} className='text-gray-700 me-1 text-2xl cursor-pointer xl:hidden hover:text-slate-600' icon={faBars} />
                {isHomeage? <MdDashboard/> : <FontAwesomeIcon className='me-2' icon={icon} />}
                {title}
            </span>
            <div className='px-6 xl:basis-1/2 hidden xl:block'>{showSearchInput && <ProductSearch />}</div> 
            <div onClick={()=>{navigate(routes.business_details.path)}} className="business-logo cursor-pointer hover:opacity-75 hover:scale-105 duration-300">
                <img src={styleSquadLogo} className="rounded-full" width={45} alt="style squad logo" />
            </div>
        </div> 
    </div>
    </div>
}