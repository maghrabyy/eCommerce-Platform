import { useState } from "react";

export const Panel = ({children,onClick})=>{
    const [mouseHovered,setMouseHovered] = useState(false);
    return <div onMouseOver={()=>setMouseHovered(true)}
     onMouseLeave={()=>setMouseHovered(false)} 
     onClick={onClick} 
     className={`relative dashboard-item flex flex-col items-center text-center border-2 border-slate-200 rounded-lg shadow-lg py-4 ${mouseHovered? 'text-white' : 'text-slate-900'} duration-150 ease-in hover:scale-105 cursor-pointer select-none overflow-hidden`}>
       <div className="z-10 px-2">
            {children}
       </div>
        <div className={`bg-animation absolute bg-gradient-to-r from-slate-600 to-slate-900 w-full h-full top-0 ${mouseHovered? 'translate-x-0' : 'translate-x-[-110%]'} duration-300 ease-in`}></div>
    </div>
}