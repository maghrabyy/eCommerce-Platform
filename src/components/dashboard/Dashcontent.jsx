import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ProductSearch } from './Products/ProductSearch';
import { MdDashboard } from "react-icons/md";
import {routes} from '../../data/navigationPaths';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import SidebarTogglerContext from '../../context/SidebarTogglerContext';

export const dashcontentRef = { current: null };

export const DashboardContent = ({icon,title,showSearchInput,className,children})=>{
    const {showSidebar} = useContext(SidebarTogglerContext);
    const isHomeage = useLocation().pathname === routes.homePage;
    const navbarHeight = '88px'

    return (
        <div ref={dashcontentRef} className={`dashboard-content  bg-white `}>
            <div className={`navbar fixed top-0 w-full xl:w-[calc(100%-215px)] bg-white z-40`}>
                <div className="main-header pt-4 px-4">
                    <div className="flex justify-between items-center py-5 ">
                        <span className="font-bold text-gray-700 text-2xl flex items-center gap-2">
                            {isHomeage? <MdDashboard/> : <FontAwesomeIcon className='me-2' icon={icon} />}
                            {title}
                        </span>
                        <div className='px-6 xl:basis-1/2 hidden md:block'>{showSearchInput && <ProductSearch />}</div> 
                        <FontAwesomeIcon onClick={showSidebar} className='text-gray-700 text-2xl cursor-pointer xl:hidden hover:text-slate-600' icon={faBars} />
                    </div> 
                </div>
            </div>
            <div style={{marginTop:navbarHeight}} className={`px-4 pt-4 h-[calc(100vh-88px)] overflow-scroll ${className}`}>
                { children}
            </div>
        </div>
    );
}