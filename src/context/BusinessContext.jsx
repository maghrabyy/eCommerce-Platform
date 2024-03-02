import { createContext, useState } from "react";
import { businessData } from "../data/businessData";
import { useActivityContext } from "./ActivityContext";

const BusinessContext = createContext();

export const BusinessProvider = ({children})=>{
    const {addNewActivity} = useActivityContext();
    const [businessInfo,setBusinessInfo] = useState({...businessData});
    const modifyBusinessInfo = (info)=>{
        setBusinessInfo({...businessInfo,
            businessName:info.businessName,
            businessCategory: info.businessCategory});
        addNewActivity('businessModify','Modified business info.')
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