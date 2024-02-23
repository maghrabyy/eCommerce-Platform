import { PrimaryNavbar } from "./Navbar";
export const dashcontentRef = { current: null };

export const DashboardContent = ({icon,title,showSearchInput,className,children})=>{
    const navbarHeight = '85px'
    return (
        <div ref={dashcontentRef} className={`dashboard-content  bg-white `}>
            <PrimaryNavbar icon={icon} title={title} showSearchInput={showSearchInput} />
            <div style={{marginTop:navbarHeight}} className={`p-4 h-[calc(100vh-85px)] overflow-auto ${className}`}>
                { children}
            </div>
        </div>
    );
}