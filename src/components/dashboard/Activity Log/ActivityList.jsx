import { ActivityItem } from "./ActivityItem";
import { faFile} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useActivityContext } from "../../../context/ActivityContext";

export const ActivityList = ({maxItems})=>{
    const {activityList} = useActivityContext();
    return activityList.length > 0? activityList.slice(0,maxItems).map((activity,index)=>{
        return <ActivityItem key={index} activityText={activity.activityText} activityType={activity.activityType} activityDate={activity.activityDate}/>
    }) :
    <div className="text-slate-800 font-bold md:text-2xl sm:text-xl text-lg text-center flex flex-col gap-2">
        <FontAwesomeIcon className="text-9xl" icon={faFile}/>
        There are no activities to display.
    </div>
}