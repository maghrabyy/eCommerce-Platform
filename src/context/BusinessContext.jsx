import { createContext, useState } from "react";
import { businessData } from "../data/businessData";

const BusinessContext = createContext();

export const BusinessProvider = ({children})=>{
    const [businessInfo,setBusinessInfo] = useState({...businessData});
    const modifyBusinessInfo = (info)=>{
        setBusinessInfo({...businessInfo,
            businessName:info.businessName,
            businessCategory: info.businessCategory})
    }
    const dateToShare = {
        businessInfo,
        modifyBusinessInfo
    }
    return <BusinessContext.Provider value={dateToShare}>
        {children}
    </BusinessContext.Provider>
}

export default BusinessContext;