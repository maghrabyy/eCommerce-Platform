import { createContext, useState } from "react";
import { customersArray } from "../data/customersData";

const CustomersContext = createContext();

export const CustomersProvider = ({children})=>{
    const [ customersData, setCustomersData ] = useState([...customersArray]);
    const addNewCustomer = (cstId,cstName,phoneNum,cstAddress)=>{
        setCustomersData(prevArray => [...prevArray,{
            cstId:cstId,
            name:cstName,
            phoneNum,
            cstAddress,
        }])
    }
    const modifyPhoneNum = (cstId,newPhoneNum)=>{
        const cstArray = [...customersData];
        const cstIndex = cstArray.map(cst=>cst.cstId).indexOf(cstId);
        cstArray[cstIndex].phoneNum = newPhoneNum;
        setCustomersData(cstArray);
    }
    const modifyAddress = (cstId,newCstAddress)=>{
        const cstArray = [...customersData];
        const cstIndex = cstArray.map(cst=>cst.cstId).indexOf(cstId);
        cstArray[cstIndex].cstAddress = newCstAddress;
        setCustomersData(cstArray);
    }
    const valueToShare = {
        customersData,
        addNewCustomer,
        modifyPhoneNum,
        modifyAddress
    }
    return <CustomersContext.Provider value={valueToShare}>
        {children}
    </CustomersContext.Provider>
}

export default CustomersContext;