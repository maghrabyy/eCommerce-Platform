import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faAngleDown, faAngleRight} from '@fortawesome/free-solid-svg-icons';

export const ExpandableMenu = ({title, menuIcon, menuList,children})=>{
    const [isExpanded,setIsExpanded] = useState(false);
    return(
        <div>
            <div onClick={()=>setIsExpanded(!isExpanded)} className='sidebar-btn flex items-center justify-between'>
                <span>{menuIcon? <FontAwesomeIcon className='me-2' icon={menuIcon} />: null} {title}</span> 
                <span className='me-2'><FontAwesomeIcon icon={isExpanded? faAngleDown: faAngleRight} /></span>
            </div>
            <ul className={`expanded-menu ${isExpanded? null: 'hidden'}`}>
                {menuList.map((item,index)=> item.subMenu? <div key={index} className="ms-8">{children}</div> : <li key={index} onClick={item.onItemClicked} className='sidebar-btn expandedMenu-item ms-8'>{item.text}</li>)}
            </ul>
        </div>
    );
}