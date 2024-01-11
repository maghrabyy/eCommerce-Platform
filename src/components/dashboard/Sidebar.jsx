import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine,faBasketShopping,faUserGroup ,faShirt, faCirclePlus, faClipboardList, faRightFromBracket, faClose} from '@fortawesome/free-solid-svg-icons';
import logo from './../../assets/stylesquad-logo.png';
import { ExpandableMenu } from '../util/ExpandableMenu';
import { useContext } from 'react';
import NavigationRoutesContext from '../../context/NavigationRoutesContext';
import AuthContext from '../../context/AuthContext';
import SidebarTogglerContext from '../../context/SidebarTogglerContext';
import { PageLink } from './PageLink'; 
import { useNavigate } from "react-router-dom";


export const Sidebar = () =>{
    const { routes, categoriesRoutes, brandsRoutes } = useContext(NavigationRoutesContext);
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
                        <PageLink pageTitle={'Orders'} pagePath={routes.orders} icon={faBasketShopping}/>
                        <PageLink pageTitle={'Customers'} pagePath={routes.customers} icon={faUserGroup}/>
                        <PageLink pageTitle={'Monthly Report'} pagePath={routes.monthlyReport} icon={faChartLine}/>
                        <li>
                            <ExpandableMenu title='Products' menuIcon={faShirt} menuList={[
                                {path:'products/categories/' + categoriesRoutes.all ,title: 'All'},
                                {path:'products/categories/' + categoriesRoutes.hoodiesNSweatshirt, title: 'Hoodies and Sweatshirts'},
                                {path:'products/categories/' + categoriesRoutes.coatsNJackets, title: 'Coats and Jackets'},
                                {path:'products/categories/' + categoriesRoutes.denims, title: 'Denims'},
                                {path:'products/categories/' + categoriesRoutes.trousers, title: 'Trousers'},
                                {subMenu: true}
                                ]} > 
                                    <ExpandableMenu title='Brands'  menuList={[
                                        {path:'products/brands/' + brandsRoutes.pullNBear, title: 'Pull & Bear'},
                                        {path:'products/brands/' + brandsRoutes.bershka, title: 'Bershka'},
                                        {path:'products/brands/' + brandsRoutes.americanEagle, title: 'American Eagle'},
                                        {path:'products/brands/' + brandsRoutes.zara, title: 'Zara'},
                                        {path:'products/brands/' + brandsRoutes.defacto, title: 'Defacto'},
                                        {path:'products/brands/' + brandsRoutes.hollister, title: 'Hollister'},
                                    ]} /> 
                            </ExpandableMenu>
                        </li>
                        <li>
                            <ExpandableMenu title='Add Item' menuIcon={faCirclePlus}
                                menuList={[
                                    {path: 'dataEntry/' + routes.dataEntry.addProduct, title: 'Add Product'},
                                    {path: 'dataEntry/' + routes.dataEntry.addCategory, title: 'Add Category'}
                                ]}
                            />
                        </li>
                        <PageLink pageTitle={'Activity Log'} pagePath={routes.activityLog} icon={faClipboardList}/>
                    </ul>
                </div>
                <div onClick={logoutHandler} className='sidebar-logout sidebar-btn'><FontAwesomeIcon className='me-2' icon={faRightFromBracket} /> Logout</div>
            </div>
      </div>
    );
}