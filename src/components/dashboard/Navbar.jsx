import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBars, faBuilding, faSortDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { ProductSearch } from './Products/ProductSearch';
import { MdDashboard } from "react-icons/md";
import { useLocation, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import SidebarTogglerContext from '../../context/SidebarTogglerContext';
import AuthContext from '../../context/AuthContext';
import { routes } from '../../data/navigationPaths';
import { useState } from 'react';
import { Menu } from '../util/Menu';

export const PrimaryNavbar = ({icon,title,showSearchInput, showNavbarShadow})=>{  
    const [ showMenu, setShowMenu ] = useState(false);
    const hoverHandler = ()=>{
        setShowMenu(true);
    }
    const menuCloseHandler = ()=>{
        setShowMenu(false);
    }
    const navigate = useNavigate();
    const {showSidebar} = useContext(SidebarTogglerContext);
    const {userData} = useContext(AuthContext);
    const isHomeage = useLocation().pathname === routes.homePage.path;
    return <div className={`navbar fixed top-0 w-full xl:w-[calc(100%-225px)] bg-white z-40 ${showNavbarShadow && 'shadow-md xl:shadow-sm'}`}>
    <div className="main-header px-4">
        <div className="flex justify-between items-center pb-3 pt-4">
            <span className="font-bold text-gray-700 text-2xl flex items-center gap-2 select-none">
                <FontAwesomeIcon onClick={showSidebar} className='text-gray-700 me-1 text-2xl cursor-pointer xl:hidden hover:text-slate-600' icon={faBars} />
                {isHomeage? <MdDashboard/> : <FontAwesomeIcon className='me-2' icon={icon} />}
                {title}
            </span>
            <div className='px-6 xl:basis-1/2 hidden xl:block'>{showSearchInput && <ProductSearch />}</div> 
            <div onMouseEnter={hoverHandler} onMouseLeave={menuCloseHandler} className="business-logo relative">
                <div className="avatar-menu flex gap-2 items-center pb-1 select-none cursor-pointer">
                    <div className="avatar-img rounded-full text-white font-semibold bg-slate-700 shadow-slate-800 shadow-sm py-1 px-2 h-8 w-8 flex items-center justify-center">
                        {userData.firstName.substring(0,1)}
                    </div>
                    <FontAwesomeIcon icon={faSortDown} className='text-slate-700'/>
                </div>
                <Menu menuList={[
                    {text:'Profile', icon:faUser,onClick:()=>{navigate(routes.profile.path)}},
                    {text:'My business', icon:faBuilding,onClick:()=>{navigate(routes.business_details.path)}},
                    {text:'About', icon:faAddressCard,onClick:()=>{navigate(routes.about.path)}},
                    {isLogout:true}
                ]} showMenu={showMenu} setShowMenu={setShowMenu} />
            </div>
        </div> 
    </div>
    </div>
}