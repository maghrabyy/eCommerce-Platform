import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faClose } from '@fortawesome/free-solid-svg-icons';
import { ExpandableMenu } from '../util/ExpandableMenu';
import { useContext } from 'react';
import { routes } from '../../data/navigationPaths';
import AuthContext from '../../context/AuthContext';
import SidebarTogglerContext from '../../context/SidebarTogglerContext';
import { PageLink } from './PageLink'; 
import { useNavigate } from "react-router-dom";
import SectionsContext from '../../context/SectionsContext';
import BusinessContext from '../../context/BusinessContext';

export const Sidebar = () =>{
    const {logoutUser} = useContext(AuthContext);
    const { businessInfo } = useContext(BusinessContext);
    const { categorySection,brandsSection } = useContext(SectionsContext);
    const {showToggledSidebar, hideSidebar} = useContext(SidebarTogglerContext);
    const navigate = useNavigate();
    const navigateToHomepage = ()=>{
        navigate(routes.homePage.path);
        hideSidebar();
    }
    const logoutHandler = ()=>{
        logoutUser();
        navigateToHomepage();
    }
    return (
        <div className={`dashboard-sidebar xl:static py-2 fixed top-0 z-50 w-72 xl:w-auto h-full shadow-md ${showToggledSidebar?'translate-x-0':'translate-x-[-120%] xl:translate-x-0'} duration-300 ease-in bg-white col-span-2 px-2 overflow-y-auto overflow-x-hidden select-none`}>
            <div className='sidebar-content flex flex-col justify-between h-full'>
                <div>
                    <div className='sidebar-header pb-4 px-1 mt-4 border-b border-gray-300 flex items-center justify-between'>
                        <div onClick={navigateToHomepage} className='dashboard-logo flex items-center gap-2 cursor-pointer hover:opacity-80 text-2xl font-bold text-slate-800'>
                            <img src={businessInfo.businessLogo} className="rounded-full hover:scale-105 duration-300 pb-1" width={34} alt="style squad logo" />
                            <div>{businessInfo.businessName}</div>
                        </div>
                        <div onClick={hideSidebar} className="sidebar toggler text-gray-700 text-2xl cursor-pointer xl:hidden block hover:text-slate-600">
                            <FontAwesomeIcon icon={faClose} />
                        </div>
                    </div>
                    <ul className='sidebar-action flex flex-col gap-2 py-4'>
                        <PageLink pageTitle={routes.salesReport.title} pagePath={routes.salesReport.path} icon={routes.salesReport.icon}/>
                        <PageLink pageTitle={routes.orders.title} pagePath={routes.orders.path} icon={routes.orders.icon}/>
                        <PageLink pageTitle={routes.customers.title} pagePath={routes.customers.path} icon={routes.customers.icon}/>
                        <li>
                            <ExpandableMenu title='Products' menuIcon={businessInfo.businessCategory.value.pageIcon} menuList={[{subMenu: true}]} > 
                                <ExpandableMenu title='Categories'  menuList={[
                                    ...categorySection.map(category=>(
                                        {path:'products/categories/' + category.path ,title: category.title}
                                    )),
                                    ]} /> 
                                <ExpandableMenu title='Brands'  menuList={[
                                    ...brandsSection.map(brand=>(
                                        {path:'products/brands/' + brand.path, title: brand.title}
                                    ))
                                ]} /> 
                            </ExpandableMenu>
                        </li>
                        <PageLink pageTitle={routes.addProduct.title} pagePath={routes.addProduct.path} icon={routes.addProduct.icon}/>
                        <PageLink pageTitle={routes.activityLog.title} pagePath={routes.activityLog.path} icon={routes.activityLog.icon}/>
                    </ul>
                </div>
                <div onClick={logoutHandler} className='sidebar-btn logout'><FontAwesomeIcon className='me-2' icon={faRightFromBracket} /> Logout</div>
            </div>
      </div>
    );
}