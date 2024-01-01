import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faShirt, faCirclePlus, faClipboardList, faRightFromBracket, faClose} from '@fortawesome/free-solid-svg-icons';
import logo from './../../assets/stylesquad-logo.png';
import { ExpandableMenu } from '../util/ExpandableMenu';
import { useContext } from 'react';
import NavigationContext from '../../context/NavigationContext';
import AuthContext from '../../context/AuthContext';

export const Sidebar = ({showToggledSidebar ,setShowToggledSidebar}) =>{
    const { currentPath, navigate } = useContext(NavigationContext);
    const {logoutUser} = useContext(AuthContext);
    const handlePageClick = pagePath =>{
        navigate(pagePath); 
        setShowToggledSidebar(false)
    }
    const logoutHandler = ()=>{
        logoutUser();
        navigate('/')
    }
    return (
        <div className={`dashboard-sidebar xl:static fixed top-0 z-50 xl:z-0 w-72 xl:w-auto h-full ${showToggledSidebar?'translate-x-0':'translate-x-[-120%] xl:translate-x-0'} duration-300 ease-in bg-white col-span-2 px-2 overflow-scroll select-none`}>
            <div className='sidebar-content flex flex-col justify-between h-full'>
                <div>
                    <div className='sidebar-header border-b-2 border-b-gray-500 text-center py-6 flex items-center justify-between'>
                        <img onClick={()=>handlePageClick("/home")} className='sidebar-logo w-48 cursor-pointer' src={logo} alt="" />
                        <div onClick={()=>setShowToggledSidebar(false)} className="sidebar toggler text-gray-700 text-2xl cursor-pointer xl:hidden block hover:text-slate-600">
                            <FontAwesomeIcon icon={faClose} />
                        </div>
                    </div>
                    <ul className='sidebar-action flex flex-col gap-2 py-4'>
                        <li onClick={()=>handlePageClick("/sales")} className={`sidebar-btn ${currentPath=== '/sales' && 'active'}`}><FontAwesomeIcon className='me-2' icon={faChartLine} /> Sales</li>
                        <li>
                            <ExpandableMenu title='Products' menuIcon={faShirt} menuList={[
                                {path:'/all',onItemClicked:()=>handlePageClick('/all'), text: 'All'},
                                {path:'/hoodiesNSweatshirt', onItemClicked:()=>handlePageClick("/hoodiesNSweatshirt"), text: 'Hoodies and Sweatshirts'},
                                {path:'/coatsNJackets', onItemClicked:()=>handlePageClick("/coatsNJackets"), text: 'Coats and Jackets'},
                                {path:'/denim', onItemClicked:()=>handlePageClick("/denim"), text: 'Denims'},
                                {path:'/trousers', onItemClicked:()=>handlePageClick("/trousers"), text: 'Trousers'},
                                {subMenu: true}
                                ]} > 
                                    <ExpandableMenu title='Brands'  menuList={[
                                        {path:'/pullNBear', onItemClicked:()=>handlePageClick("/pullNBear"), text: 'Pull & Bear'},
                                        {path:'/bershka', onItemClicked:()=>handlePageClick("/bershka"), text: 'Bershka'},
                                        {path:'/americanEagle', onItemClicked:()=>handlePageClick("/americanEagle"), text: 'American Eagle'},
                                        {path:'/zara', onItemClicked:()=>handlePageClick("/zara"), text: 'Zara'},
                                        {path:'/defacto', onItemClicked:()=>handlePageClick("/defacto"), text: 'Defacto'},
                                        {path:'/hollister', onItemClicked:()=>handlePageClick("/hollister"), text: 'Hollister'},
                                    ]} /> 
                            </ExpandableMenu>
                        </li>
                        <li>
                            <ExpandableMenu title='Add Item' menuIcon={faCirclePlus}
                                menuList={[
                                    {path:'/addCategory', onItemClicked:()=>handlePageClick("/addCategory"), text: 'Add Category'},
                                    {path:'/addProd', onItemClicked:()=>handlePageClick("/addProd"), text: 'Add Product'}
                                ]}
                            />
                        </li>
                        <li onClick={()=>handlePageClick("/activityLog")} className={`sidebar-btn ${currentPath=== '/activityLog' && 'active'}`}><FontAwesomeIcon className='me-2' icon={faClipboardList} /> Activity Log</li>
                    </ul>
                </div>
                <div onClick={logoutHandler} className='sidebar-logout sidebar-btn'><FontAwesomeIcon className='me-2' icon={faRightFromBracket} /> Logout</div>
            </div>
      </div>
    );
}