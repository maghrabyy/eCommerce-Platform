import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { routes } from "../../data/navigationPaths";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export const Menu = ({menuList, showMenu,setShowMenu})=>{
    const { logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const navigateToHomepage = ()=>{
        navigate(routes.homePage.path);
    }
    const logoutHandler = ()=>{
        logoutUser();
        navigateToHomepage();
    }
    return showMenu && <div className="menu absolute right-2 py-2 px-1 w-40 rounded-md bg-[#726f6f] bg-opacity-90 text-white">
        {menuList.map(menuItem => {
            const menuItemClickHandler = ()=>{
                if(menuItem.isLogout){
                    logoutHandler();
                }else{
                    menuItem.onClick();
                    setShowMenu(false);
                }
            }
            return <div key={menuItem.text} onClick={menuItemClickHandler} className={`menu-item p-2 ${menuItem.isLogout? 'hover:bg-red-600' : 'hover:bg-slate-300 hover:text-gray-600'} rounded-sm cursor-pointer  duration-200 select-none`}>
                {menuItem.isLogout? 
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faRightFromBracket}/> 
                        Logout
                    </div>
                :
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={menuItem.icon}/>
                        {menuItem.text}
                    </div>
                }
            </div>
        })}        
    </div>
}