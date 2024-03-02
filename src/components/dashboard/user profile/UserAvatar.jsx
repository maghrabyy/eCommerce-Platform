import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

export const UserAvatar = ({img,navSize,smSize,mdSize,lgSize})=>{
    const {userData} = useContext(AuthContext);
    const avatarSize = `${(navSize && 'h-8 w-8') ||
    (smSize && 'text-2xl h-12 w-12') ||
    (mdSize && 'text-5xl h-20 w-20') || 
    (lgSize && 'sm:text-7xl text-5xl sm:h-28 h-20 sm:w-28 w-20')}` 
    return img ? <div>

    </div> :
    <div className={`user-avatar ${avatarSize} select-none rounded-full text-white font-semibold bg-slate-700 shadow-slate-800 shadow-sm py-1 px-2 flex items-center justify-center`}>
        {userData.firstName.substring(0,1)}
    </div>
}