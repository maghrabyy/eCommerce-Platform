import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faAngleDown, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { PageLink } from "../dashboard/PageLink";

export const ExpandableMenu = ({title, menuIcon, menuList,children})=>{
    const [isExpanded,setIsExpanded] = useState(false);
    return(
        <div className="expandedMenu">
            <div onClick={()=>setIsExpanded(!isExpanded)} className='sidebar-btn flex items-center justify-between'>
                <span>{menuIcon? <FontAwesomeIcon className='me-2' icon={menuIcon} />: null} {title}</span> 
                <span className='me-2'><FontAwesomeIcon icon={isExpanded? faAngleDown: faAngleRight} /></span>
            </div>
            {
            isExpanded &&
            <ul className='expanded-menu'>
                {
                menuList.map((item,index)=>
                    item.subMenu? 
                    <div key={index} className="ms-8">{children}</div> :
                     <PageLink key={index} pageTitle={item.title} pagePath={item.path} margin/>)}
            </ul>
      
        }
        </div>
    );
}