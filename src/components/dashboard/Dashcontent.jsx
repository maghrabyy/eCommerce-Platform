import { PrimaryNavbar } from "./Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState} from "react";

export const dashcontentRef = { current: null };
export const contentRef = { current: null };

export const DashboardContent = ({icon,title,showSearchInput,className,children})=>{
    const navbarHeight = 64
    const location = useLocation().pathname;
    const [ navbarScrollStyle, setNavbarScrollStyle ] = useState(false);
    useEffect(()=>{
        contentRef.current.scrollTo(0,0);
    },[location])
    const scrollHandler = e =>{
        if(e.target.scrollTop > navbarHeight){
            setNavbarScrollStyle(true)
        }else{
            setNavbarScrollStyle(false);
        }
    }
    return (
        <div ref={dashcontentRef} className={`dashboard-content  bg-white `}>
            <PrimaryNavbar icon={icon} title={title} showSearchInput={showSearchInput} showNavbarShadow={navbarScrollStyle} />
            <div onScroll={scrollHandler} ref={contentRef} style={{marginTop:navbarHeight+'px'}} className={`p-4 h-[calc(100vh-64px)] overflow-auto ${className}`}>
                { children}
            </div>
        </div>
    );
}