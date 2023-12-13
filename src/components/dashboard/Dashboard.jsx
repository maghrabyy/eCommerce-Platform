import { Sidebar } from "./Sidebar";
import { Dashcontent } from "./Dashcontent";
import { useState } from "react";

export const Dashboard = ()=>{
  const [navPageTitle,setNavPageTitle] = useState("Sales");
  const [showToggledSidebar,setShowToggledSidebar] = useState(false);
  const selectedPage = page =>{
    setNavPageTitle(page)
  }
    return (
        <div className='dashboard px-2 xl:px-8 py-4 grid grid-cols-10 gap-2 h-screen overflow-hidden'>
          <div onClick={()=>setShowToggledSidebar(!showToggledSidebar)} className={`${showToggledSidebar? null : 'hidden'} overlay w-screen h-screen top-0 right-0 bg-black opacity-75 z-40 fixed cursor-pointer`}></div>
          <Sidebar sidebarSelectedPage={selectedPage} showToggledSidebar={showToggledSidebar} setShowToggledSidebar={setShowToggledSidebar}/>
          <Dashcontent pageTitle={navPageTitle} setShowToggledSidebar={setShowToggledSidebar}/>
      </div>
    );
}