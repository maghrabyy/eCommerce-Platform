import { useState } from "react";

export const Panel = ({children,onClick,topImg,bottomImg, animation, width,height})=>{
    const [mouseHovered,setMouseHovered] = useState(false);
    return <div onMouseOver={()=>setMouseHovered(true)}
     onMouseLeave={()=>setMouseHovered(false)} 
     onClick={onClick} 
     style={{width,height}}
     className={`relative dashboard-item border-2 flex flex-col justify-center border-slate-200 rounded-lg shadow-lg py-4 ${animation? ( mouseHovered? 'text-white' : 'text-slate-900') : 'text-slate-900'} duration-150 ease-in hover:scale-105 cursor-pointer select-none overflow-hidden`}>
       <div className="z-10 px-2 flex flex-col items-center justify-center text-center gap-2">
            {topImg &&  <img className=" h-18 w-44" src={topImg} alt="" />}
            {children}
            {bottomImg &&  <img className="h-52 w-44" src={bottomImg} alt="" />}
       </div>
        {animation && <div className={`bg-animation absolute bg-gradient-to-r from-slate-600 to-slate-900 w-full h-full top-0 ${mouseHovered? 'translate-x-0' : 'translate-x-[-110%]'} duration-300 ease-in`}></div>}
    </div>
}