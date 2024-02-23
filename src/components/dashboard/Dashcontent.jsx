import { PrimaryNavbar } from "./Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export const dashcontentRef = { current: null };

export const DashboardContent = ({icon,title,showSearchInput,className,children})=>{
    const navbarHeight = '85px'
    const location = useLocation().pathname;
    const contentRef = useRef();
    useEffect(()=>{
        contentRef.current.scrollTo(0,0);
    },[location])
    return (
        <div ref={dashcontentRef} className={`dashboard-content  bg-white `}>
            <PrimaryNavbar icon={icon} title={title} showSearchInput={showSearchInput} />
            <div ref={contentRef} style={{marginTop:navbarHeight}} className={`p-4 h-[calc(100vh-85px)] overflow-auto ${className}`}>
                { children}
            </div>
        </div>
    );
}