import { OrdersTable } from "../../../components/dashboard/Orders/OrdersTable";
import { Outlet } from "react-router-dom";
import { DashboardContent } from "../../../components/dashboard/Dashcontent";
import {faBasketShopping} from '@fortawesome/free-solid-svg-icons';
import { UseLargerScreen } from "../../../components/UseLargerScreen";

export const OrdersPage = ()=>{
    return <div className="xl:col-span-10 col-span-12">
        <UseLargerScreen/>
        <DashboardContent title='Orders' icon={faBasketShopping}>
            <OrdersTable />
            <Outlet />
        </DashboardContent> 
    </div>

}