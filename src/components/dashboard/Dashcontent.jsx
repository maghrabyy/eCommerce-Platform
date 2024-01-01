import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ProductSearch } from './Products/ProductSearch';
import { ProductsProvider } from '../../context/ProductsContext';
import { MdDashboard } from "react-icons/md";
import { useContext } from 'react';
import NavigationContext from '../../context/NavigationContext';
import SidebarTogglerContext from '../../context/SidebarTogglerContext';

export const dashcontentRef = { current: null };

export const Dashcontent = ()=>{
    const { currentPath, pathNavigation } = useContext(NavigationContext);
    const {showSidebar} = useContext(SidebarTogglerContext);
    const isClothesSection = ()=>{
        if(currentPath !== "/sales" && currentPath !== "/addItems/addProd" && currentPath !== "/addItems/addCategory" && currentPath !== "/activityLog" && currentPath !== "/home" ){
            return true
        }
        else return false;
    }
    return (
    <ProductsProvider>
        <div ref={dashcontentRef} className="dashboard-content col-span-12 xl:col-span-10 bg-white overflow-scroll">
            <div className='px-4'>
                <div className="main-header py-4">
                    {isClothesSection() && <div className="sidebar-toggler flex justify-between items-center xl:hidden">
                        <FontAwesomeIcon onClick={showSidebar} className='text-gray-700 text-2xl cursor-pointer hover:text-slate-600' icon={faBars} />
                        {isClothesSection() ? <ProductSearch  /> : null}
                    </div>}
                    <div className="flex justify-between border-b-2 py-5 border-b-gray-600">
                        <span className="font-bold text-gray-700 text-2xl flex items-center gap-2">
                            {currentPath === '/home'? <MdDashboard className='text-3xl' />: <FontAwesomeIcon className='me-2' icon={pathNavigation().icon} />} 
                            {isClothesSection()? 'Clothing': pathNavigation().title}</span>
                        {!isClothesSection() && <FontAwesomeIcon onClick={showSidebar} className='text-gray-700 text-2xl cursor-pointer xl:hidden hover:text-slate-600' icon={faBars} />}
                        <div className='basis-1/2 hidden xl:block'>{isClothesSection() ? <ProductSearch /> : null}</div> 
                    </div> 
                </div>
                {pathNavigation().content()}
            </div>
        </div>
    </ProductsProvider>
    );
}