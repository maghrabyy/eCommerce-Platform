import { useContext } from "react";
import NavigationContext from "../../context/NavigationContext";
import SidebarTogglerContext from "../../context/SidebarTogglerContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PageLink = ({pageTitle,pagePath, icon, margin})=>{
    const { currentPath, navigate } = useContext(NavigationContext);
    const { hideSidebar } = useContext(SidebarTogglerContext);
    const handlePageClick = () =>{
        navigate(pagePath); 
        hideSidebar();
    }
    const classes = `sidebar-btn ${currentPath=== pagePath && 'active'} ${margin && 'ms-8'}`;
    return <li onClick={handlePageClick} className={classes}>
        {icon && <FontAwesomeIcon className='me-2' icon={icon} />} {pageTitle}</li>
}