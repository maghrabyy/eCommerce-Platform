import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ProductSearch } from './Products/ProductSearch';
import { ProductsProvider } from '../../context/ProductsContext';
import { MdDashboard } from "react-icons/md";
import NavigationsRoutesContext from '../../context/NavigationRoutesContext';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import SidebarTogglerContext from '../../context/SidebarTogglerContext';

export const dashcontentRef = { current: null };

export const DashboardContent = ({icon,title,showSearchInput,children})=>{
    const {showSidebar} = useContext(SidebarTogglerContext);
    const {routes} = useContext(NavigationsRoutesContext);
    const isHomeage = useLocation().pathname === routes.homePage;
    return (
    <ProductsProvider>
        <div ref={dashcontentRef} className="dashboard-content col-span-12 xl:col-span-10 px-4 bg-white overflow-scroll">
                <div className="main-header py-4">
                    <div className="flex justify-between items-center border-b-2 py-5 border-b-gray-600">
                        <span className="font-bold text-gray-700 text-2xl flex items-center gap-2">
                            {isHomeage? <MdDashboard/> : <FontAwesomeIcon className='me-2' icon={icon} />}
                            {title}
                        </span>
                        <div className='px-6 xl:basis-1/2'>{showSearchInput && <ProductSearch />}</div> 
                        <FontAwesomeIcon onClick={showSidebar} className='text-gray-700 text-2xl cursor-pointer xl:hidden hover:text-slate-600' icon={faBars} />
                    </div> 
                </div>
                {children}
        </div>
    </ProductsProvider>
    );
}