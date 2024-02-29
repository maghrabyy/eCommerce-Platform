import { useContext, useState } from "react"
import AuthContext from "../../../context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../../components/util/Button";
import AlertContext from "../../../context/AlertContext";

export const ProfilePage = () =>{
    const navigate = useNavigate();
    const {userData} = useContext(AuthContext);
    return <div className="profile-page relative text-slate-700">
        <div onClick={()=>navigate('edit-profile')} className="edit-profile absolute right-0 cursor-pointer hover:text-slate-500 flex gap-2 items-center select-none">
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
        <div className="contact-info p-4 shadow-lg bg-slate-50 rounded-md flex flex-col gap-2 mt-3">
            <div className="user-email flex gap-2 items-center text-base sm:text-xl font-semibold"><FontAwesomeIcon icon={faEnvelope}/> {userData.email}</div>
            <div className="user-phoneNum flex gap-2 items-center text-base sm:text-xl font-semibold"><FontAwesomeIcon icon={faPhone}/> [+20] {userData.phoneNum}</div>
        </div>
        <Outlet />
    </div>
}

export const EditUserProfile = ()=>{
    const navigate = useNavigate();
    const { displayAlert,emptyFieldAlert } = useContext(AlertContext);
    const {userData,modifyUsersInfo} = useContext(AuthContext);
    const [ fName, setFName ] = useState(userData.firstName);
    const [ lName, setLName ] = useState(userData.lastName);
    const [ userRole, setUserRole ] = useState(userData.role);
    const [ userEmail, setUserEmail ] = useState(userData.email);
    const [ userPhoneNum, setUserPhoneNum ] = useState(userData.phoneNum);

    const isValidePhoneNum = ()=>{
        if(!isNaN(userPhoneNum) && userPhoneNum.length === 11 && userPhoneNum.startsWith("01")){
            return true
        }
        else{
            return false;
        }
    }

    const saveProfileHandler = () =>{
        if(fName && lName && userRole && userEmail && userPhoneNum){
            if(fName !== userData.firstName || lName  !== userData.lastName ||
                userRole !== userData.role || userEmail !== userData.email ||
                userPhoneNum !== userData.phoneNum){
                    if(isValidePhoneNum()){
                        displayAlert("Your profile has been modified.","success");
                        navigate('..');
                        modifyUsersInfo({
                            firstName:fName,
                            lastName:lName,
                            role:userRole,
                            email:userEmail,
                            phoneNum:userPhoneNum,
                        });
                    }else{
                        displayAlert('Invalid phone number','warning');
                    }
                }else{
                    displayAlert('Nothing changed.','primary');
                    navigate('..');
                }
        }else{
            emptyFieldAlert();
        }
    }

    return <div className="flex flex-col pt-4 px-2">
        <div className="user-fullName flex sm:flex-row flex-col gap-2">
            <div className="first-name flex flex-col flex-grow">
                <label className="inpt-label">First Name</label>
                <input type="text" className="inpt" value={fName} onChange={e=>setFName(e.target.value)}/>
            </div>
            <div className="last-name flex flex-col flex-grow">
                <label className="inpt-label">Last Name</label>
                <input type="text" className="inpt" value={lName} onChange={e=>setLName(e.target.value)}/>
            </div>
        </div>
        <label className="inpt-label">Role</label>
        <input type="text" className="inpt" value={userRole} onChange={e=>setUserRole(e.target.value)}/>
        <label className="inpt-label">Email</label>
        <input type="text" className="inpt" value={userEmail} onChange={e=>setUserEmail(e.target.value)}/>
        <label className="inpt-label">Phone Number</label>
        <input type="tel" className="inpt" value={userPhoneNum} onChange={e=>setUserPhoneNum(e.target.value)}/>
        <div className="edit-profile-actions flex gap-2 pt-2 ">
            <CustomButton onClick={saveProfileHandler}>Save</CustomButton>
            <CustomButton onClick={()=>navigate('..')}>Cancel</CustomButton>
        </div>
    </div>
}