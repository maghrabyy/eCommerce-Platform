import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CustomButton } from "../../../components/util/Button";
import AlertContext from "../../../context/AlertContext";
import AuthContext from "../../../context/AuthContext";

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