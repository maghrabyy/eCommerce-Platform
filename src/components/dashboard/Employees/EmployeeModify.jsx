import { useContext, useState, useEffect } from "react";
import AlertContext from "../../../context/AlertContext";
import EmployeesContext from "../../../context/EmployeesContext";
import { Modal } from "../../util/Modal";

export const EmployeeModifyModal = ({empId,showModal,setShowModal}) =>{
    const { displayAlert,emptyFieldAlert } = useContext(AlertContext);
    const { employeesData, modifyEmployeesInfo } = useContext(EmployeesContext);
    const [ employeeName, setEmployeeName ] = useState('');
    const [ employeeRole, setEmployeeRole ] = useState('');
    const [ isManagerialRole,setIsManagerialRole ] = useState(false);
    const [ employeeEmail, setEmployeeEmail ] = useState('');
    const [ employeePhoneNum, setEmployeePhoneNum ] = useState(''); 

    const EmployeeIndex = employeesData.map(emp=>emp.id).indexOf(empId);
    // console.log(empId)
    useEffect(()=>{
        setEmployeeName(employeesData[EmployeeIndex]?.name);
        setEmployeeRole(employeesData[EmployeeIndex]?.role);
        setIsManagerialRole(employeesData[EmployeeIndex]?.managerialRole);
        setEmployeeEmail(employeesData[EmployeeIndex]?.email);
        setEmployeePhoneNum(employeesData[EmployeeIndex]?.phoneNum);
    },[employeesData,EmployeeIndex])

    const isValidePhoneNum = ()=>{
        if(!isNaN(employeePhoneNum) && employeePhoneNum.length === 11 && employeePhoneNum.startsWith("01")){
            return true
        }
        else{
            return false;
        }
    }
    const alreadyRegisteredPhoneNum = ()=>{
        if(employeesData.map(emp=>emp.phoneNum).includes(employeePhoneNum) && 
        employeePhoneNum !== employeesData[EmployeeIndex]?.phoneNum){
            return true;
        }else{
            return false;
        }
    }
    const saveEmployeeInfoHandler = ()=>{
        if(employeeName && employeeRole && employeeEmail && employeePhoneNum){
            if(employeeName !== employeesData[EmployeeIndex]?.name ||
                employeeRole !== employeesData[EmployeeIndex]?.role || 
                isManagerialRole !== employeesData[EmployeeIndex]?.managerialRole ||
                employeeEmail !== employeesData[EmployeeIndex]?.email ||
                employeePhoneNum !== employeesData[EmployeeIndex]?.phoneNum){
                    if(isValidePhoneNum()){
                        if(!alreadyRegisteredPhoneNum()){
                            displayAlert("Employee Info has been modified.","success");
                            employeeModifyModalExit();
                            modifyEmployeesInfo(empId,{
                                ...employeesData[EmployeeIndex],
                                name:employeeName,
                                role:employeeRole,
                                managerialRole:isManagerialRole,
                                email:employeeEmail,
                                phoneNum:employeePhoneNum
                            });
                        }else{
                            displayAlert("There's an employee with the same phone number.",'warning');
                        }
                    }else{
                        displayAlert('Invalid phone number','warning');
                    }
                }else{
                    displayAlert('Nothing changed.','primary');
                    employeeModifyModalExit();
                }
        }else{
            emptyFieldAlert();
        }
    }
    const employeeModifyModalExit = ()=>{
        setShowModal(false);
    }

    return <Modal
        width={'xl:w-4/12'}
        showModal={showModal}
        setShowModal={setShowModal}
        modalTitle='Modify Employee Info'
        modalActions={[
            {title:'Save',onClicked:saveEmployeeInfoHandler},
            {title:'Cancel',onClicked:employeeModifyModalExit}
        ]}
        onModalExit={employeeModifyModalExit}>
            <div className="flex flex-col gap-1">
                <p className="inpt-label-dark">Employee Name</p>
                <input type="text" value={employeeName} placeholder="Employee Name" onChange={e=>setEmployeeName(e.target.value)} className="inpt text-slate-800 font-semibold w-full" />
                <p className="inpt-label-dark">Employee Role</p>
                <input type="text" value={employeeRole} placeholder="Employee Role" onChange={e=>setEmployeeRole(e.target.value)} className="inpt text-slate-800 font-semibold w-full" />
                <div className="role-type flex gap-2 items-center ms-2">
                    <input type="checkbox" checked={isManagerialRole} onChange={e=>setIsManagerialRole(e.target.checked)} />
                    <label className="inpt-label-dark">Is managerial role?</label>
                </div>
                <p className="inpt-label-dark">Email</p>
                <input type="text" value={employeeEmail} placeholder="Employee Email" onChange={e=>setEmployeeEmail(e.target.value)} className="inpt text-slate-800 font-semibold w-full" />
                <p className="inpt-label-dark">Phone Number</p>
                <input type="tel" value={employeePhoneNum} placeholder="Employee Phone Number" onChange={e=>setEmployeePhoneNum(e.target.value)} className="inpt text-slate-800 font-semibold w-full" />
            </div>
        </Modal>
}