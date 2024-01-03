import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faShirt, faCirclePlus, faClipboardList, faRightFromBracket, faClose} from '@fortawesome/free-solid-svg-icons';
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
        navigate(routes.homePage);
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
                        <PageLink pageTitle={'Sales'} pagePath={routes.sales} icon={faChartLine}/>
                        <li>
                            <ExpandableMenu title='Products' menuIcon={faShirt} menuList={[
                                {path:categoriesRoutes.all ,title: 'All'},
                                {path:categoriesRoutes.hoodiesNSweatshirt, title: 'Hoodies and Sweatshirts'},
                                {path:categoriesRoutes.coatsNJackets, title: 'Coats and Jackets'},
                                {path:categoriesRoutes.denims, title: 'Denims'},
                                {path:categoriesRoutes.trousers, title: 'Trousers'},
                                {subMenu: true}
                                ]} > 
                                    <ExpandableMenu title='Brands'  menuList={[
                                        {path:brandsRoutes.pullNBear, title: 'Pull & Bear'},
                                        {path:brandsRoutes.bershka, title: 'Bershka'},
                                        {path:brandsRoutes.americanEagle, title: 'American Eagle'},
                                        {path:brandsRoutes.zara, title: 'Zara'},
                                        {path:brandsRoutes.defacto, title: 'Defacto'},
                                        {path:brandsRoutes.hollister, title: 'Hollister'},
                                    ]} /> 
                            </ExpandableMenu>
                        </li>
                        <li>
                            <ExpandableMenu title='Add Item' menuIcon={faCirclePlus}
                                menuList={[
                                    {path:routes.dataEntry.addProduct, title: 'Add Product'},
                                    {path:routes.dataEntry.addCategory, title: 'Add Category'}
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