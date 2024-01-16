import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine,faBasketShopping,faUserGroup ,faShirt, faCirclePlus, faClipboardList, faRightFromBracket, faClose} from '@fortawesome/free-solid-svg-icons';
import logo from './../../assets/stylesquad-logo.png';
import { ExpandableMenu } from '../util/ExpandableMenu';
import { useContext } from 'react';
import { routes } from '../../data/navigationPaths';
import AuthContext from '../../context/AuthContext';
import SidebarTogglerContext from '../../context/SidebarTogglerContext';
import { PageLink } from './PageLink'; 
import { useNavigate } from "react-router-dom";
import { categories,brands } from '../../data/sectionsData';

export const Sidebar = () =>{
    const {logoutUser} = useContext(AuthContext);
    const {showToggledSidebar, hideSidebar} = useContext(SidebarTogglerContext);
    const navigate = useNavigate();
    const navigateToHomepage = ()=>{
        navigate(routes.homePage);
        hideSidebar();
    }
    const logoutHandler = ()=>{
        logoutUser();
        navigateToHomepage();
    }
    return (
        <div className={`dashboard-sidebar xl:static fixed top-0 z-50 xl:z-0 w-72 xl:w-auto h-full ${showToggledSidebar?'translate-x-0':'translate-x-[-120%] xl:translate-x-0'} duration-300 ease-in bg-white col-span-2 px-2 overflow-scroll select-none`}>
            <div className='sidebar-content flex flex-col justify-between h-full'>
                <div>
                    <div className='sidebar-header border-b-2 border-b-gray-500 text-center py-6 flex items-center justify-between'>
                        <img onClick={navigateToHomepage} className='sidebar-logo w-48 cursor-pointer hover:opacity-80' src={logo} alt="" />
                        <div onClick={hideSidebar} className="sidebar toggler text-gray-700 text-2xl cursor-pointer xl:hidden block hover:text-slate-600">
                            <FontAwesomeIcon icon={faClose} />
                        </div>
                    </div>
                    <ul className='sidebar-action flex flex-col gap-2 py-4'>
                        <PageLink pageTitle={'Sales Report'} pagePath={routes.salesReport} icon={faChartLine}/>
                        <PageLink pageTitle={'Orders'} pagePath={routes.orders} icon={faBasketShopping}/>
                        <PageLink pageTitle={'Customers'} pagePath={routes.customers} icon={faUserGroup}/>
                        <li>
                            <ExpandableMenu title='Products' menuIcon={faShirt} menuList={[{subMenu: true}]} > 
                                <ExpandableMenu title='Categories'  menuList={[
                                    ...categories.map(category=>(
                                        {path:'products/categories/' + category.path ,title: category.title}
                                    )),
                                    ]} /> 
                                <ExpandableMenu title='Brands'  menuList={[
                                    ...brands.map(brand=>(
                                        {path:'products/brands/' + brand.path, title: brand.title}
                                    ))
                                ]} /> 
                            </ExpandableMenu>
                        </li>
                        <PageLink pageTitle={'Add Product'} pagePath={routes.addProduct} icon={faCirclePlus}/>
                        <PageLink pageTitle={'Activity Log'} pagePath={routes.activityLog} icon={faClipboardList}/>
                    </ul>
                </div>
                <div onClick={logoutHandler} className='sidebar-logout sidebar-btn'><FontAwesomeIcon className='me-2' icon={faRightFromBracket} /> Logout</div>
            </div>
      </div>
    );
}