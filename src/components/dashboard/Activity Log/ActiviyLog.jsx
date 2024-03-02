import { ActivityList } from "./ActivityList";
import { useActivityContext } from "../../../context/ActivityContext";
import { CustomButton } from "../../util/Button";
import { useState } from "react";

export const ActivityLog = ()=>{
    const {activityList} = useActivityContext();
    const [ itemsToShow,setItemsToShow ] = useState(6)
    return(
        <div className={`bg-gray-200 rounded-sm shadow-md p-2 ${activityList.length > 0? 'h-auto' : 'h-full flex justify-center items-center'}`}>
            <div className="activity-list flex flex-col gap-2">
                <ActivityList maxItems={itemsToShow} />
                {itemsToShow < activityList.length && <CustomButton onClick={()=>setItemsToShow(itemsNum=>itemsNum+3)}>View More</CustomButton>}
            </div>
        </div>
    );
}


