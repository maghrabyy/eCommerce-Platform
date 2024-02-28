import { useContext } from "react"
import AuthContext from "../../../context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";

export const ProfilePage = () =>{
    const {userData} = useContext(AuthContext);
    return <div className="profile-page relative text-slate-700">
        <div className="edit-profile absolute right-0 cursor-pointer hover:text-slate-500 flex gap-2 items-center">
            <FontAwesomeIcon icon={faEdit}/> Edit
        </div>
        <div className="user-header flex gap-2 pt-6">
            <div className="user-avatar rounded-full sm:text-7xl text-5xl text-white font-semibold bg-slate-700 shadow-slate-800 shadow-sm py-1 px-2 sm:h-28 h-20 sm:w-28 w-20  flex items-center justify-center select-none">
                {userData.firstName.substring(0,1)}
            </div>
            <div className="name-role flex flex-col self-center">
                <div className="user-fullName sm:text-3xl text-2xl font-bold">{userData.firstName} {userData.lastName}</div>
                <div className="user-role text-lg font-semibold ms-2">{userData.role}</div>
            </div>
        </div>
        <div className="contact-info py-2 px-4 bg-slate-300 rounded-md flex flex-col gap-2 mt-3">
            <div className="user-email flex gap-2 items-center text-base sm:text-xl font-semibold"><FontAwesomeIcon icon={faEnvelope}/> {userData.email}</div>
            <div className="user-phoneNum flex gap-2 items-center text-base sm:text-xl font-semibold"><FontAwesomeIcon icon={faPhone}/> [+20] {userData.phoneNum}</div>
        </div>
        <Outlet />
    </div>
}