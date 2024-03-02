import { faCartPlus, faEdit, faFileEdit, faFolderMinus, faFolderPlus, faPenToSquare, faSquarePlus, faTrash, faUserEdit, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";
import { UserAvatar } from "../user profile/UserAvatar";

export const ActivityItem = ({activityText,activityType,activityDate}) =>{
    const {userData} = useContext(AuthContext);
    const userName = `${userData.firstName} ${userData.lastName}`;

    const formattedDate = date =>{
        const currentFullDate = 
        `${(date.getHours()+'').length < 2? ('0' + date.getHours()) : date.getHours()}:`+
        `${(date.getMinutes()+'').length < 2? ('0' + date.getMinutes()) : date.getMinutes()} `+
        `${(date.getDate()+'').length < 2? ('0' + date.getDate()) : date.getDate()}`+
        `/${(date.getMonth()+1+'').length < 2? ('0' + (date.getMonth()+1)) : date.getMonth()+1}`+
        `/${date.getFullYear()}`;
        return currentFullDate;
    }
    const activityIconType = {
        businessModify:faFileEdit,
        newCustomer:faUserPlus,
        customerModify:faUserEdit,
        employeeModify:faUserEdit,
        newOrder:faCartPlus,
        orderModify:faPenToSquare,
        newProduct:faSquarePlus,
        modifyProduct:faEdit,
        deleteProduct:faTrash,
        newSection:faFolderPlus,
        modifySeciton:faEdit,
        deleteSection:faFolderMinus
    }
    return <div className="activity-item px-4 py-2 bg-white rounded-md flex gap-2">
        <UserAvatar smSize/>
        <div className="flex flex-col w-full">
            <div className="user-icon flex justify-between">
                <div className="user text-lg font-bold text-slate-800">{userName}</div>
                <FontAwesomeIcon className="text-slate-700" icon={activityIconType[activityType]}/>
            </div>
            <div className="activity flex sm:flex-row flex-col justify-between sm:items-center font-semibold text-slate-600">
                <div className="activity-text sm:text-base text-xs">{activityText}</div>
                <div className="activity-date text-sm self-end">{formattedDate(activityDate)}</div>
            </div>
        </div>
    </div>
}