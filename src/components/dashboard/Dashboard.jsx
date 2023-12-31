import { Sidebar } from "./Sidebar";
import { useContext } from "react";
import { SearchInputProvider } from "../../context/SearchInputContext";
import SidebarTogglerContext from "../../context/SidebarTogglerContext";
import { Outlet } from "react-router-dom";

export const Dashboard = ()=>{
  const { showToggledSidebar, hideSidebar } = useContext(SidebarTogglerContext);
    return (
      <SearchInputProvider>
        <div className='dashboard grid grid-cols-12 h-screen overflow-hidden'>
          <div onClick={hideSidebar} className={`${showToggledSidebar? 'block xl:hidden' : 'hidden'} overlay w-screen h-screen top-0 right-0 bg-black opacity-75 z-40 fixed cursor-pointer`}></div>
          <Sidebar />
          <Outlet />
      </div>
      </SearchInputProvider>
    );
}