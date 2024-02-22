import laptopScreen from '../assets/laptop-screen.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export const UseLargerScreen = ()=>{
    const [showMsg, setShowMsg] = useState(true);
    return showMsg && <div className="fixed h-full w-full bg-gradient-to-b from-blue-300 to-blue-400 z-50 lg:hidden flex flex-col justify-center items-center">
    <div onClick={()=>setShowMsg(false)} className="exit fixed top-3 right-3 text-4xl text-white hover:text-gray-300 cursor-pointer"><FontAwesomeIcon icon={faClose}/></div>
    <img src={laptopScreen} width={440} alt="laptop screen" />
    <h1 className="text-slate-800 text-3xl font-bold text-center">Use laptop/pc screen for a better experience.</h1>
</div>
}
        