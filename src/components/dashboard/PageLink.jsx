import { useContext } from "react";
import SidebarTogglerContext from "../../context/SidebarTogglerContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";


export const PageLink = ({pageTitle,pagePath, icon, margin})=>{
    const { hideSidebar } = useContext(SidebarTogglerContext);
    const classes = `sidebar-btn block ${margin && 'ms-8'}`;
    return <NavLink onClick={hideSidebar} className={classes} to={pagePath} >
        {icon && <FontAwesomeIcon className='me-2' icon={icon} />} {pageTitle}</NavLink>
}