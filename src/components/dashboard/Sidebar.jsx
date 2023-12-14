import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faShirt, faCirclePlus, faClipboardList, faRightFromBracket, faBars} from '@fortawesome/free-solid-svg-icons';
import logo from './../../assets/stylesquad-logo.png';
import { ExpandableMenu } from '../util/ExpandableMenu';

export const Sidebar = ({sidebarSelectedPage,showToggledSidebar ,setShowToggledSidebar}) =>{
    const handlePageClick = selectedPage =>{
        sidebarSelectedPage(selectedPage); 
        setShowToggledSidebar(false)
    }
    return (
        <div className={`dashboard-sidebar xl:static fixed top-4 z-50 xl:z-0 h-[calc(100%-32px)] xl:h-auto w-72 xl:w-auto ${showToggledSidebar?'translate-x-0':'translate-x-[-120%] xl:translate-x-0'} duration-300 ease-in bg-white col-span-2 rounded-md px-4 shadow-lg overflow-scroll select-none`}>
            <div className='sidebar-content flex flex-col justify-between h-full'>
                <div>
                    <div className='sidebar-header border-b-2 border-b-gray-500 text-center py-6 flex items-center justify-between'>
                        <img className='sidebar-logo w-48' src={logo} alt="" />
                        <div onClick={()=>setShowToggledSidebar(false)} className="sidebar toggler text-gray-700 text-2xl cursor-pointer xl:hidden block">
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                    </div>
                    <ul className='sidebar-action flex flex-col gap-2 py-4'>
                        <li onClick={()=>handlePageClick("Sales")} className='sidebar-btn'><FontAwesomeIcon className='me-2' icon={faChartLine} /> Sales</li>
                            <li>
                                <ExpandableMenu title='Products' menuIcon={faShirt} menuList={[
                                    {onItemClicked:()=>handlePageClick("All"), text: 'All'},
                                    {onItemClicked:()=>handlePageClick("HoodiesNSweatshirt"), text: 'Hoodies and Sweatshirts'},
                                    {onItemClicked:()=>handlePageClick("CoatsNJackets"), text: 'Coats and Jackets'},
                                    {onItemClicked:()=>handlePageClick("Denim"), text: 'Denims'},
                                    {onItemClicked:()=>handlePageClick("Trousers"), text: 'Trousers'},
                                    {subMenu: true}
                                    ]} > 
                                        <ExpandableMenu title='Brands'  menuList={[
                                            {onItemClicked:()=>handlePageClick("PullNBear"), text: 'Pull & Bear'},
                                            {onItemClicked:()=>handlePageClick("Bershka"), text: 'Bershka'},
                                            {onItemClicked:()=>handlePageClick("AmericanEagle"), text: 'American Eagle'},
                                            {onItemClicked:()=>handlePageClick("Zara"), text: 'Zara'},
                                            {onItemClicked:()=>handlePageClick("Defacto"), text: 'Defacto'},
                                            {onItemClicked:()=>handlePageClick("Hollister"), text: 'Hollister'},
                                        ]} /> 
                                </ExpandableMenu>
                            </li>
                            <li>
                                <ExpandableMenu title='Add Item' menuIcon={faCirclePlus}
                                    menuList={[
                                        {onItemClicked:()=>handlePageClick("AddCategory"), text: 'Add Category'},
                                        {onItemClicked:()=>handlePageClick("AddProd"), text: 'Add Product'}
                                    ]}
                                />
                            </li>
                            <li onClick={()=>handlePageClick("ActivityLog")} className='sidebar-btn'><FontAwesomeIcon className='me-2' icon={faClipboardList} /> Activity Log</li>
                    </ul>
                </div>
                <div className='sidebar-logout sidebar-btn'><FontAwesomeIcon className='me-2' icon={faRightFromBracket} /> Logout</div>
            </div>
      </div>
    );
}