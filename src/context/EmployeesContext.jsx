import { createContext, useState } from "react";
import { employeesArray } from "../data/employeesData";
import { useActivityContext } from "./ActivityContext";

const EmployeesContext = createContext();

export const EmployeesProvider = ({children}) =>{
    const {addNewActivity} = useActivityContext();
    const [ employeesData, setEmployeesData ] = useState([...employeesArray]);
    const modifyEmployeesInfo = (empId,info)=>{
        const empArray = [...employeesData];
        const empIndex = empArray.map(emp=>emp.id).indexOf(empId);
        empArray[empIndex] = info;
        setEmployeesData(empArray);
        addNewActivity('employeeModify',`Modified ${empArray[empIndex].name}'s info.`)
    }
    const valueToShare = {
        employeesData,
        modifyEmployeesInfo
    }
    return <EmployeesContext.Provider value={valueToShare}>
        {children}
    </EmployeesContext.Provider>
}

export default EmployeesContext