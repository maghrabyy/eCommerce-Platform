import { useContext } from "react"
import AuthContext from "../../../context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useOutlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "../../../components/dashboard/user profile/UserAvatar";
import { ActivityList } from "../../../components/dashboard/Activity Log/ActivityList";
import { CustomButton } from "../../../components/util/Button";
import { routes } from "../../../data/navigationPaths";
import { useActivityContext } from "../../../context/ActivityContext";

export const ProfilePage = () =>{
    const outlet = useOutlet();
    const navigate = useNavigate();
    const {userData} = useContext(AuthContext);
    const {activityList} = useActivityContext();
    const displayedActivityItems = 3;
    return <div className="profile-page relative text-slate-700">
        <div onClick={()=>navigate('edit-profile')} className="edit-profile absolute right-0 cursor-pointer hover:text-slate-500 flex gap-2 items-center select-none">
            <FontAwesomeIcon icon={faEdit}/> Edit
        </div>
        <div className="user-header flex gap-2 pt-6">
            <UserAvatar lgSize/>
            <div className="name-role flex flex-col self-center">
                <div className="user-fullName sm:text-3xl text-2xl font-bold">{userData.firstName} {userData.lastName}</div>
                <div className="user-role text-lg font-semibold ms-2">{userData.role}</div>
            </div>
        </div>
        <div className="contact-info p-4 shadow-lg bg-slate-50 rounded-md flex flex-col gap-2 mt-3">
            <div className="user-email flex gap-2 items-center text-base sm:text-xl font-semibold"><FontAwesomeIcon icon={faEnvelope}/> {userData.email}</div>
            <div className="user-phoneNum flex gap-2 items-center text-base sm:text-xl font-semibold"><FontAwesomeIcon icon={faPhone}/> [+20] {userData.phoneNum}</div>
        </div>
        {outlet ||  
        <div className={`bg-gray-200 rounded-sm shadow-md p-2 h-auto mt-4`}>
            <div className="activity-list flex flex-col gap-2">
                <ActivityList maxItems={displayedActivityItems} />
                {activityList.length > displayedActivityItems && <CustomButton onClick={()=>navigate(`/${routes.activityLog.path}`)}>Activity Log</CustomButton>}
            </div>
        </div>}
    </div>
}
