import { createContext, useState, useContext } from "react";

const ActivityContext = createContext();

export const useActivityContext = ()=>{
    return useContext(ActivityContext);
}

export const ActivityProvider = ({children}) =>{
    const [activityList, setActivityList ] = useState([]);
    const addNewActivity = (type,text)=>{
        setActivityList([{
            activityType:type,
            activityText:text,
            activityDate:new Date()
        },...activityList])
    }
    const valueToShare = {
        activityList,
        addNewActivity
    }
    return <ActivityContext.Provider value={valueToShare}>
        {children}
    </ActivityContext.Provider>
}

