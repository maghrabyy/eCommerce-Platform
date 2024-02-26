import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBuilding, faUser } from '@fortawesome/free-solid-svg-icons';
import { ProductSearch } from './Products/ProductSearch';
import { MdDashboard } from "react-icons/md";
import { useLocation, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import SidebarTogglerContext from '../../context/SidebarTogglerContext';
import { routes } from '../../data/navigationPaths';
import styleSquadLogo from '../../assets/style-squad-logo.jpg';
import { useState } from 'react';
import { Menu } from '../util/Menu';

export const PrimaryNavbar = ({icon,title,showSearchInput})=>{  
    const [ showMenu, setShowMenu ] = useState(false);
    const hoverHandler = ()=>{
        setShowMenu(true);
    }
    const menuCloseHandler = ()=>{
        setShowMenu(false);
    }
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
            <div onMouseEnter={hoverHandler} onMouseLeave={menuCloseHandler} className="business-logo relative">
                <img src={styleSquadLogo} className="rounded-full hover:scale-105 duration-300 pb-1" width={45} alt="style squad logo" />
                <Menu menuList={[
                    {text:'My business', icon:faBuilding,onClick:()=>{navigate(routes.business_details.path)}},
                    {text:'About', icon:faUser,onClick:()=>{}},
                    {isLogout:true}
                ]} showMenu={showMenu} setShowMenu={setShowMenu} />
            </div>
        </div> 
    </div>
    </div>
}