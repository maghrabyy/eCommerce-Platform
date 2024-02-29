import { createContext, useState, useEffect } from "react";
// import { customersArray } from "../data/customersData";
import { useQuery } from 'react-query';

const CustomersContext = createContext();

export const CustomersProvider = ({children})=>{
    const [ customersData, setCustomersData ] = useState([]);
    const [ initialCustomersData,setInitialCustomersData ] = useState([])
    const { isLoading:isCustomersLoading, isError:isCusomtersError, data: apiData } = useQuery('data', async () => {
        const response = await fetch('https://dummyjson.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
    
      useEffect(() => {
        if (apiData) {
            const cstData = apiData.users.map(user=>{
                        const phonePreffix = ['010','011','012','015']
                        const cstPhoneNum = phonePreffix[Math.floor(Math.random()*phonePreffix.length)] + user.phone.substring(6).replace(/\s/g, '')
                        const randBuildingNum = Math.floor(Math.random()*99);
                        const randCryptoId = crypto.randomUUID();
                        const randCSTId = `CST${randCryptoId.substring(0,randCryptoId.indexOf('-')).toUpperCase()}`;
                        return {
                        cstId:randCSTId,
                        name:`${user.firstName} ${user.lastName}`,
                        phoneNum:cstPhoneNum,
                        cstAddress:{aptNum:'11', floorNum:'2', buildingNum:randBuildingNum ,address:user.address.address,city:user.address.city},
                    }});
                setInitialCustomersData(cstData);
                setCustomersData(cstData)
        }
      }, [apiData]);

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
        initialCustomersData,
        customersData,
        isCustomersLoading,
        isCusomtersError,
        addNewCustomer,
        modifyPhoneNum,
        modifyAddress
    }
    return <CustomersContext.Provider value={valueToShare}>
        {children}
    </CustomersContext.Provider>
}

export default CustomersContext;