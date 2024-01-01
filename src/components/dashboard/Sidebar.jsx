import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faShirt, faCirclePlus, faClipboardList, faRightFromBracket, faClose} from '@fortawesome/free-solid-svg-icons';
import logo from './../../assets/stylesquad-logo.png';
import { ExpandableMenu } from '../util/ExpandableMenu';
import { useContext } from 'react';
import NavigationContext from '../../context/NavigationContext';
import AuthContext from '../../context/AuthContext';
import SidebarTogglerContext from '../../context/SidebarTogglerContext';
import { PageLink } from './PageLink'; 

export const Sidebar = () =>{
    const { navigate,routes } = useContext(NavigationContext);
    const {logoutUser} = useContext(AuthContext);
    const {showToggledSidebar, hideSidebar} = useContext(SidebarTogglerContext);
    const navigateToHomepage = ()=>{
        navigate(routes.homePage.path);
        hideSidebar();
    }
    const logoutHandler = ()=>{
        logoutUser();
        navigate(routes.login.path);
    }
    return (
        <div className={`dashboard-sidebar xl:static fixed top-0 z-50 xl:z-0 w-72 xl:w-auto h-full ${showToggledSidebar?'translate-x-0':'translate-x-[-120%] xl:translate-x-0'} duration-300 ease-in bg-white col-span-2 px-2 overflow-scroll select-none`}>
            <div className='sidebar-content flex flex-col justify-between h-full'>
                <div>
                    <div className='sidebar-header border-b-2 border-b-gray-500 text-center py-6 flex items-center justify-between'>
                        <img onClick={navigateToHomepage} className='sidebar-logo w-48 cursor-pointer' src={logo} alt="" />
                        <div onClick={hideSidebar} className="sidebar toggler text-gray-700 text-2xl cursor-pointer xl:hidden block hover:text-slate-600">
                            <FontAwesomeIcon icon={faClose} />
                        </div>
                    </div>
                    <ul className='sidebar-action flex flex-col gap-2 py-4'>
                        <PageLink pageTitle={'Sales'} pagePath={routes.sales.path} icon={faChartLine}/>
                        <li>
                            <ExpandableMenu title='Products' menuIcon={faShirt} menuList={[
                                {path:routes.products.categoriesRoutes.all.path ,title: 'All'},
                                {path:routes.products.categoriesRoutes.hoodiesNSweatshirt.path, title: 'Hoodies and Sweatshirts'},
                                {path:routes.products.categoriesRoutes.coatsNJackets.path, title: 'Coats and Jackets'},
                                {path:routes.products.categoriesRoutes.denims.path, title: 'Denims'},
                                {path:routes.products.categoriesRoutes.trousers.path, title: 'Trousers'},
                                {subMenu: true}
                                ]} > 
                                    <ExpandableMenu title='Brands'  menuList={[
                                        {path:routes.products.brandsRoutes.pullNBear.path, title: 'Pull & Bear'},
                                        {path:routes.products.brandsRoutes.bershka.path, title: 'Bershka'},
                                        {path:routes.products.brandsRoutes.americanEagle.path, title: 'American Eagle'},
                                        {path:routes.products.brandsRoutes.zara.path, title: 'Zara'},
                                        {path:routes.products.brandsRoutes.defacto.path, title: 'Defacto'},
                                        {path:routes.products.brandsRoutes.hollister.path, title: 'Hollister'},
                                    ]} /> 
                            </ExpandableMenu>
                        </li>
                        <li>
                            <ExpandableMenu title='Add Item' menuIcon={faCirclePlus}
                                menuList={[
                                    {path:routes.dataEntry.addCategory.path, title: 'Add Category'},
                                    {path:routes.dataEntry.addProduct.path, title: 'Add Product'}
                                ]}
                            />
                        </li>
                        <PageLink pageTitle={'Activity Log'} pagePath={routes.activityLog.path} icon={faClipboardList}/>
                    </ul>
                </div>
                <div onClick={logoutHandler} className='sidebar-logout sidebar-btn'><FontAwesomeIcon className='me-2' icon={faRightFromBracket} /> Logout</div>
            </div>
      </div>
    );
}