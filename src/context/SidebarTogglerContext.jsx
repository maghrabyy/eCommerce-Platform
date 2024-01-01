import { createContext, useState } from "react";

const SidebarTogglerContext = createContext();

export const SidebarTogglerProvider = ({children})=>{
    const [showToggledSidebar,setShowToggledSidebar] = useState(false);
    const hideSidebar = ()=> setShowToggledSidebar(false);
    const showSidebar = ()=> setShowToggledSidebar(true);
    const toggleSidebar = ()=>setShowToggledSidebar(!showToggledSidebar);
    return <SidebarTogglerContext.Provider value={{showToggledSidebar,toggleSidebar,showSidebar,hideSidebar}}>
        {children}
    </SidebarTogglerContext.Provider>
}

export default SidebarTogglerContext;