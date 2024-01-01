import { Sidebar } from "./Sidebar";
import { Dashcontent } from "./Dashcontent";
import { useState } from "react";
import { SearchInputProvider } from "../../context/SearchInputContext";

export const Dashboard = ()=>{
  const [showToggledSidebar,setShowToggledSidebar] = useState(false);
    return (
      <SearchInputProvider>
        <div className='dashboard  grid grid-cols-12 h-screen overflow-hidden'>
          <div onClick={()=>setShowToggledSidebar(!showToggledSidebar)} className={`${showToggledSidebar? 'block xl:hidden' : 'hidden'} overlay w-screen h-screen top-0 right-0 bg-black opacity-75 z-40 fixed cursor-pointer`}></div>
          <Sidebar showToggledSidebar={showToggledSidebar} setShowToggledSidebar={setShowToggledSidebar}/>
          <Dashcontent setShowToggledSidebar={setShowToggledSidebar}/>
      </div>
      </SearchInputProvider>
    );
}